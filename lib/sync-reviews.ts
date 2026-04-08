/**
 * Core review sync logic — shared between:
 *   - POST /api/reviews/sync       (user-triggered)
 *   - GET  /api/cron/sync-reviews  (hourly Vercel cron)
 *   - GET  /api/auth/google/callback (auto-sync on connect)
 *
 * Accepts an already-fetched business record and an admin Supabase client
 * (service role, bypasses RLS). Returns the number of reviews upserted.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import {
  getAccessToken,
  getAccounts,
  getLocations,
  getReviews,
  starRatingToNumber,
} from "@/lib/google-business";

export type SyncableBusiness = {
  id: string;
  google_refresh_token: string;
  google_account_id: string | null;
  google_location_id: string | null;
};

export async function syncBusinessReviews(
  business: SyncableBusiness,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: SupabaseClient<any>
): Promise<{ synced: number }> {
  const accessToken = await getAccessToken(business.google_refresh_token);

  let locationId = business.google_location_id;

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

  let synced = 0;
  for (const review of reviews) {
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
    if (!error) synced++;
    else console.error(`Upsert error for review ${review.reviewId}:`, error);
  }

  await admin
    .from("businesses")
    .update({ last_synced_at: new Date().toISOString() })
    .eq("id", business.id);

  return { synced };
}
