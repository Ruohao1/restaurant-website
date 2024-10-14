import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const isAdmin = async (user: User): Promise<boolean> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profiles, error } = await supabase
    .from("profile")
    .select()
    .eq("id", user.id);

  if (error) {
    console.error("Error fetching profile", error);
    return false;
  }

  const profile = profiles[0];
  return profile.role !== null && profile.role === "admin";
};
