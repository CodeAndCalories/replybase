import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import {
  getAccessToken,
  getAccounts,
  getLocations,
  getReviews,
  starRatingToNumber,
} from "@/lib/google-business";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id, google_refresh_token, google_account_id, google_location_id")
    .eq("user_id", user.id)
    .single();

  if (!business?.google_refresh_token) {
    return NextResponse.json(
      { error: "No connected Google Business Profile found. Please connect one first." },
      { status: 404 }
    );
  }

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const accessToken = await getAccessToken(business.google_refresh_token);

    let locationId: string = business.google_location_id;
    let accountId: string  = business.google_account_id;

    // If location ID not yet stored, discover it now
    if (!locationId) {
      const accounts = await getAccounts(accessToken);
      if (!accounts.length) {
        return NextResponse.json(
          { error: "No Google Business accounts found for this Google account." },
          { status: 404 }
        );
      }
      accountId  = accounts[0].name;
      const locations = await getLocations(accessToken, accountId);
      if (!locations.length) {
        return NextResponse.json(
          { error: "No locations found for this Google Business account." },
          { status: 404 }
        );
      }
      locationId = locations[0].name;
      const locationTitle = locations[0].title ?? null;

      await admin
        .from("businesses")
        .update({
          name:                locationTitle,
          google_account_id:   accountId,
          google_location_id:  locationId,
        })
        .eq("id", business.id);
    }

    const reviews = await getReviews(accessToken, locationId);

    let syncedCount = 0;
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
      if (!error) syncedCount++;
      else console.error("Upsert error for review", review.reviewId, error);
    }

    await admin
      .from("businesses")
      .update({ last_synced_at: new Date().toISOString() })
      .eq("id", business.id);

    return NextResponse.json({ synced: syncedCount });
  } catch (err) {
    console.error("Sync error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
