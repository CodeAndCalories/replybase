import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("auto_reply_enabled")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <SettingsClient
      email={user.email!}
      autoReplyEnabled={business?.auto_reply_enabled ?? false}
    />
  );
}
