/**
 * Google Business Profile API helpers.
 * All functions accept a short-lived access_token obtained via getAccessToken().
 *
 * API base URLs:
 *   Account management : https://mybusinessaccountmanagement.googleapis.com/v1
 *   Business info      : https://mybusinessbusinessinformation.googleapis.com/v1
 *   Reviews (v4)       : https://mybusiness.googleapis.com/v4
 */

// ─── Token exchange ──────────────────────────────────────────────────────────

export async function getAccessToken(refreshToken: string): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id:     process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type:    "refresh_token",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token refresh failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

// ─── Account management ───────────────────────────────────────────────────────

export async function getAccounts(accessToken: string): Promise<GBPAccount[]> {
  const res = await fetch(
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`getAccounts failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return (data.accounts ?? []) as GBPAccount[];
}

// ─── Locations ────────────────────────────────────────────────────────────────

export async function getLocations(
  accessToken: string,
  accountId: string
): Promise<GBPLocation[]> {
  const res = await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations?readMask=name,title`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`getLocations failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return (data.locations ?? []) as GBPLocation[];
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export async function getReviews(
  accessToken: string,
  locationId: string
): Promise<GBPReview[]> {
  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/${locationId}/reviews`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`getReviews failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return (data.reviews ?? []) as GBPReview[];
}

// ─── Post reply ───────────────────────────────────────────────────────────────

export async function postReply(
  accessToken: string,
  locationId: string,
  reviewId: string,
  reply: string
): Promise<void> {
  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/${locationId}/reviews/${reviewId}/reply`,
    {
      method: "PUT",
      headers: {
        Authorization:  `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: reply }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`postReply failed (${res.status}): ${err}`);
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GBPAccount {
  name: string;           // "accounts/123456789"
  accountName: string;
  type: string;
}

export interface GBPLocation {
  name: string;           // "accounts/123456789/locations/987654321"
  title: string;          // "My Coffee Shop"
}

export interface GBPReview {
  reviewId: string;
  reviewer: {
    displayName: string;
    isAnonymous: boolean;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  createTime: string;
  updateTime: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
}

export function starRatingToNumber(starRating: string): number {
  return ({ ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 } as Record<string, number>)[starRating] ?? 0;
}
