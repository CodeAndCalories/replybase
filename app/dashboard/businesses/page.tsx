import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BusinessesClient from "./BusinessesClient";

export default async function BusinessesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: business } = await supabase
    .from("businesses")
    .select("id, name, google_location_id, last_synced_at")
    .eq("user_id", user.id)
    .single();

  // Count reviews for this business
  const reviewCount = business
    ? (
        await supabase
          .from("reviews")
          .select("id", { count: "exact", head: true })
          .eq("business_id", business.id)
      ).count ?? 0
    : 0;

  return (
    <BusinessesClient
      business={
        business
          ? {
              name:           business.name,
              locationId:     business.google_location_id,
              lastSyncedAt:   business.last_synced_at,
              reviewCount,
            }
          : null
      }
    />
  );
}
