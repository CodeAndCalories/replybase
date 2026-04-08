import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ReviewsClient from "./ReviewsClient";

export default async function ReviewsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Get the user's connected business
  const { data: business } = await supabase
    .from("businesses")
    .select("id, name, last_synced_at")
    .eq("user_id", user.id)
    .single();

  // Fetch real reviews for this business
  const reviews = business
    ? (
        await supabase
          .from("reviews")
          .select(
            "id, reviewer_name, rating, review_text, review_date, reply_status, reply_text"
          )
          .eq("business_id", business.id)
          .order("review_date", { ascending: false })
      ).data ?? []
    : [];

  return (
    <ReviewsClient
      reviews={reviews}
      businessName={business?.name ?? "Your Business"}
      hasConnectedBusiness={!!business}
      lastSyncedAt={business?.last_synced_at ?? null}
    />
  );
}
