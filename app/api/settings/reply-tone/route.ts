import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VALID_TONES = ["professional", "friendly", "concise", "enthusiastic"] as const;
type Tone = (typeof VALID_TONES)[number];

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { tone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.tone || !VALID_TONES.includes(body.tone as Tone)) {
    return NextResponse.json(
      { error: `tone must be one of: ${VALID_TONES.join(", ")}` },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("businesses")
    .update({ reply_tone: body.tone })
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to update reply_tone:", error);
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }

  return NextResponse.json({ success: true, tone: body.tone });
}
