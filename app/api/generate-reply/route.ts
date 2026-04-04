import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateReply } from "@/lib/ai-replies";

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

  try {
    const reply = await generateReply({ reviewerName, rating, reviewText, businessName });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Generate reply error:", err);
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}
