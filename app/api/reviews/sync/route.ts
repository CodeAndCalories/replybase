import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { syncBusinessReviews } from "@/lib/sync-reviews";

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
    const { synced } = await syncBusinessReviews(business, admin);
    return NextResponse.json({ synced });
  } catch (err) {
    console.error("Sync error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
