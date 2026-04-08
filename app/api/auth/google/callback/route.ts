import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/google";
import { getAccessToken, getAccounts, getLocations } from "@/lib/google-business";
import { syncBusinessReviews } from "@/lib/sync-reviews";
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
      const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // Store the refresh token
      await admin
        .from("businesses")
        .upsert(
          { user_id: userId, google_refresh_token: tokens.refresh_token },
          { onConflict: "user_id" }
        );

      // Eagerly discover and store account + location ID
      try {
        const accessToken = await getAccessToken(tokens.refresh_token);
        const accounts    = await getAccounts(accessToken);

        if (accounts.length > 0) {
          const accountId = accounts[0].name;
          const locations = await getLocations(accessToken, accountId);

          if (locations.length > 0) {
            const location = locations[0];
            await admin
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

      // Auto-sync reviews immediately so the dashboard is populated on first visit
      try {
        const { data: business } = await admin
          .from("businesses")
          .select("id, google_refresh_token, google_account_id, google_location_id")
          .eq("user_id", userId)
          .single();

        if (business?.google_refresh_token) {
          const { synced } = await syncBusinessReviews(business, admin);
          console.log(`Auto-sync on connect: ${synced} reviews synced for user ${userId}`);
        }
      } catch (syncErr) {
        console.error(
          "Non-fatal: auto-sync failed after OAuth connect:",
          syncErr
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
