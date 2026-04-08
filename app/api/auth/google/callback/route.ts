import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/google";
import { getAccessToken, getAccounts, getLocations } from "@/lib/google-business";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code   = searchParams.get("code");
  const error  = searchParams.get("error");
  const userId = searchParams.get("state");

  if (error || !code || !userId) {
    return NextResponse.redirect(
      new URL("/dashboard/businesses?error=oauth_denied", request.url)
    );
  }

  try {
    const tokens = await exchangeCodeForTokens(code);

    if (tokens.refresh_token) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // Store the refresh token
      await supabase
        .from("businesses")
        .upsert(
          { user_id: userId, google_refresh_token: tokens.refresh_token },
          { onConflict: "user_id" }
        );

      // Eagerly discover and store the account + location ID so the first
      // sync is instant. Non-fatal if this fails — user can sync manually.
      try {
        const accessToken = await getAccessToken(tokens.refresh_token);
        const accounts    = await getAccounts(accessToken);

        if (accounts.length > 0) {
          const accountId  = accounts[0].name;
          const locations  = await getLocations(accessToken, accountId);

          if (locations.length > 0) {
            const location = locations[0];
            await supabase
              .from("businesses")
              .update({
                name:               location.title ?? null,
                google_account_id:  accountId,
                google_location_id: location.name,
              })
              .eq("user_id", userId);
          }
        }
      } catch (locationErr) {
        console.error(
          "Non-fatal: failed to fetch location data during OAuth callback:",
          locationErr
        );
      }
    }
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(
      new URL("/dashboard/businesses?error=oauth_failed", request.url)
    );
  }

  return NextResponse.redirect(new URL("/dashboard/businesses", request.url));
}
