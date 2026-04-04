import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/google";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/dashboard/businesses?error=oauth_denied", request.url));
  }

  try {
    const tokens = await exchangeCodeForTokens(code);

    if (tokens.refresh_token) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      await supabase
        .from("businesses")
        .upsert({ google_refresh_token: tokens.refresh_token }, { onConflict: "google_refresh_token" });
    }
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(new URL("/dashboard/businesses?error=oauth_failed", request.url));
  }

  return NextResponse.redirect(new URL("/dashboard/businesses", request.url));
}
