/**
 * Core review sync logic — shared between:
 *   - POST /api/reviews/sync       (user-triggered)
 *   - GET  /api/cron/sync-reviews  (hourly Vercel cron)
 *   - GET  /api/auth/google/callback (auto-sync on connect)
 *
 * Accepts an already-fetched business record and an admin Supabase client
 * (service role, bypasses RLS). Returns the number of reviews upserted.
 *
 * When auto_reply_enabled = true, any pending review with no reply_text will
 * have a reply generated via Anthropic and posted directly to Google.
 *
 * Email notifications are sent (via Resend) for each newly inserted review —
 * i.e. reviews that didn't exist in the DB before this sync run.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import {
  getAccessToken,
  getAccounts,
  getLocations,
  getReviews,
  postReply,
  starRatingToNumber,
} from "@/lib/google-business";
import { generateReply } from "@/lib/ai-replies";
import { sendNewReviewNotification } from "@/lib/email";

export type SyncableBusiness = {
  id: string;
  user_id: string;
  name: string | null;
  google_refresh_token: string;
  google_account_id: string | null;
  google_location_id: string | null;
  auto_reply_enabled: boolean;
};

export async function syncBusinessReviews(
  business: SyncableBusiness,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: SupabaseClient<any>
): Promise<{ synced: number }> {
  const accessToken = await getAccessToken(business.google_refresh_token);

  let locationId = business.google_location_id;
  let businessName = business.name ?? "this business";

  // Discover account + location if not yet stored
  if (!locationId) {
    const accounts = await getAccounts(accessToken);
    if (!accounts.length) {
      throw new Error("No Google Business accounts found for this refresh token.");
    }
    const accountId = accounts[0].name;
    const locations = await getLocations(accessToken, accountId);
    if (!locations.length) {
      throw new Error("No locations found for this Google Business account.");
    }
    const location = locations[0];
    locationId = location.name;
    businessName = location.title ?? businessName;

    await admin
      .from("businesses")
      .update({
        name:               location.title ?? null,
        google_account_id:  accountId,
        google_location_id: locationId,
      })
      .eq("id", business.id);
  }

  const reviews = await getReviews(accessToken, locationId);

  // ── Snapshot existing review IDs so we can detect genuinely new inserts ──
  const { data: existingRows } = await admin
    .from("reviews")
    .select("google_review_id")
    .eq("business_id", business.id);

  const existingIds = new Set<string>(
    (existingRows ?? []).map((r: { google_review_id: string }) => r.google_review_id)
  );

  // ── Upsert all reviews from Google ────────────────────────────────────────
  let synced = 0;
  const newReviews: Array<{
    reviewerName: string;
    rating: number;
    reviewText: string;
  }> = [];

  for (const review of reviews) {
    const isNew = !existingIds.has(review.reviewId);

    const { error } = await admin.from("reviews").upsert(
      {
        business_id:      business.id,
        google_review_id: review.reviewId,
        reviewer_name:    review.reviewer?.displayName ?? "Anonymous",
        rating:           starRatingToNumber(review.starRating),
        review_text:      review.comment ?? "",
        review_date:      review.createTime,
        reply_status:     review.reviewReply ? "published" : "pending",
        reply_text:       review.reviewReply?.comment ?? null,
      },
      { onConflict: "google_review_id" }
    );

    if (!error) {
      synced++;
      if (isNew) {
        newReviews.push({
          reviewerName: review.reviewer?.displayName ?? "Anonymous",
          rating:       starRatingToNumber(review.starRating),
          reviewText:   review.comment ?? "",
        });
      }
    } else {
      console.error(`Upsert error for review ${review.reviewId}:`, error);
    }
  }

  await admin
    .from("businesses")
    .update({ last_synced_at: new Date().toISOString() })
    .eq("id", business.id);

  // ── Email notifications for new reviews ───────────────────────────────────
  // Fetch the owner's email lazily — only when there are new reviews to report.
  if (newReviews.length > 0) {
    try {
      const { data: { user }, error: userErr } =
        await admin.auth.admin.getUserById(business.user_id);

      if (userErr || !user?.email) {
        console.error(
          `Notifications: could not look up email for user ${business.user_id}:`,
          userErr
        );
      } else {
        // Fire all notification emails in parallel; sendNewReviewNotification
        // is already non-throwing so Promise.allSettled isn't strictly needed,
        // but keeps the pattern consistent.
        await Promise.allSettled(
          newReviews.map((r) =>
            sendNewReviewNotification(
              user.email!,
              businessName,
              r.reviewerName,
              r.rating,
              r.reviewText
            )
          )
        );
        console.log(
          `Notifications: sent ${newReviews.length} email(s) to ${user.email} for business ${business.id}`
        );
      }
    } catch (notifErr) {
      console.error(
        `Notifications: unexpected error for business ${business.id}:`,
        notifErr
      );
    }
  }

  // ── Auto-reply ──────────────────────────────────────────────────────────────
  // Only runs when the business owner has opted in. Targets every review that
  // is still pending with no reply — i.e. genuinely new reviews that haven't
  // been replied to yet. Once a reply is successfully posted the row becomes
  // 'published', so each review is only auto-replied to once.
  if (business.auto_reply_enabled) {
    const { data: pendingReviews, error: fetchErr } = await admin
      .from("reviews")
      .select("id, reviewer_name, rating, review_text, google_review_id")
      .eq("business_id", business.id)
      .eq("reply_status", "pending")
      .is("reply_text", null);

    if (fetchErr) {
      console.error(
        `Auto-reply: failed to fetch pending reviews for business ${business.id}:`,
        fetchErr
      );
    } else if (pendingReviews?.length) {
      console.log(
        `Auto-reply: processing ${pendingReviews.length} pending review(s) for business ${business.id}`
      );

      for (const pending of pendingReviews) {
        try {
          const reply = await generateReply({
            reviewerName: pending.reviewer_name,
            rating:       pending.rating,
            reviewText:   pending.review_text,
            businessName,
          });

          await postReply(accessToken, locationId, pending.google_review_id, reply);

          await admin
            .from("reviews")
            .update({ reply_text: reply, reply_status: "published" })
            .eq("id", pending.id);

          console.log(`Auto-reply: posted reply for review ${pending.google_review_id}`);
        } catch (replyErr) {
          console.error(
            `Auto-reply: failed to reply to review ${pending.google_review_id}:`,
            replyErr
          );
          // Non-fatal — move on, review stays pending and retries next sync
        }
      }
    }
  }

  return { synced };
}
