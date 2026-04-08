import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { getAccessToken, postReply } from "@/lib/google-business";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reviewId, reply } = await request.json();

  if (!reviewId || !reply?.trim()) {
    return NextResponse.json({ error: "Missing reviewId or reply" }, { status: 400 });
  }

  // Fetch review — RLS ensures it belongs to this user's business
  const { data: review } = await supabase
    .from("reviews")
    .select("id, google_review_id, business_id")
    .eq("id", reviewId)
    .single();

  if (!review) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  // Fetch business to get refresh token and location ID
  const { data: business } = await supabase
    .from("businesses")
    .select("google_refresh_token, google_location_id")
    .eq("id", review.business_id)
    .eq("user_id", user.id)
    .single();

  if (!business?.google_refresh_token) {
    return NextResponse.json({ error: "No Google account connected" }, { status: 400 });
  }

  if (!business?.google_location_id) {
    return NextResponse.json(
      { error: "Location not configured. Please sync your business first." },
      { status: 400 }
    );
  }

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const accessToken = await getAccessToken(business.google_refresh_token);

    await postReply(
      accessToken,
      business.google_location_id,
      review.google_review_id,
      reply.trim()
    );

    const { error: updateError } = await admin
      .from("reviews")
      .update({ reply_text: reply.trim(), reply_status: "published" })
      .eq("id", review.id);

    if (updateError) {
      console.error("Failed to update review after posting reply:", updateError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reply posting error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
