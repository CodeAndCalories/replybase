import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { syncBusinessReviews } from "@/lib/sync-reviews";

/**
 * GET /api/cron/sync-reviews
 *
 * Vercel cron job — runs every hour (see vercel.json).
 * Loops through every business with a google_refresh_token and syncs reviews.
 *
 * Secured with CRON_SECRET env var:
 *   Authorization: Bearer <CRON_SECRET>
 * Vercel sets this header automatically when invoking cron routes.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: businesses, error: fetchError } = await admin
    .from("businesses")
    .select("id, user_id, name, google_refresh_token, google_account_id, google_location_id, auto_reply_enabled")
    .not("google_refresh_token", "is", null);

  if (fetchError) {
    console.error("Cron: failed to fetch businesses:", fetchError);
    return NextResponse.json({ error: "Failed to fetch businesses" }, { status: 500 });
  }

  if (!businesses?.length) {
    return NextResponse.json({ message: "No businesses to sync", businessesProcessed: 0, reviewsSynced: 0 });
  }

  const results = await Promise.allSettled(
    businesses.map((business) => syncBusinessReviews(business, admin))
  );

  let reviewsSynced  = 0;
  let succeeded      = 0;
  let failed         = 0;

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled") {
      reviewsSynced += result.value.synced;
      succeeded++;
    } else {
      failed++;
      console.error(
        `Cron: sync failed for business ${businesses[i].id}:`,
        result.reason
      );
    }
  }

  console.log(
    `Cron sync complete — businesses: ${businesses.length}, succeeded: ${succeeded}, failed: ${failed}, reviews synced: ${reviewsSynced}`
  );

  return NextResponse.json({
    businessesProcessed: businesses.length,
    businessesSucceeded: succeeded,
    businessesFailed:    failed,
    reviewsSynced,
  });
}
