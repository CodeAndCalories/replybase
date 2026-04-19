import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateReply } from "@/lib/ai-replies";

const MONTHLY_REPLY_LIMIT = 200;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { reviewerName, rating, reviewText, businessName } = body;

  if (!reviewerName || !rating || !reviewText || !businessName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id, reply_tone")
    .eq("user_id", user.id)
    .maybeSingle();

  const tone = business?.reply_tone ?? "professional";

  // Check monthly reply limit
  if (business?.id) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("business_id", business.id)
      .eq("reply_status", "published")
      .gte("created_at", startOfMonth.toISOString());

    if ((count ?? 0) >= MONTHLY_REPLY_LIMIT) {
      return NextResponse.json(
        { error: "Monthly reply limit reached. Your limit resets on the 1st of next month." },
        { status: 429 }
      );
    }
  }

  try {
    const reply = await generateReply({ reviewerName, rating, reviewText, businessName, tone });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Generate reply error:", err);
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}
