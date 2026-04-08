import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/settings/auto-reply
 * Body: { enabled: boolean }
 *
 * Toggles auto_reply_enabled on the authenticated user's business record.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { enabled?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.enabled !== "boolean") {
    return NextResponse.json(
      { error: "Missing required field: enabled (boolean)" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("businesses")
    .update({ auto_reply_enabled: body.enabled })
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to update auto_reply_enabled:", error);
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }

  return NextResponse.json({ success: true, enabled: body.enabled });
}
