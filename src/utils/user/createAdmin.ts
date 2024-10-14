import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const createAdmin = async (
  email: string,
  username: string,
  password: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.error("Error signing up:", signUpError.message);
    return null;
  }

  const {
    data: { user },
    error: signInError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    console.error("Error signing in:", signInError.message);
    return null;
  }

  if (!user) {
    console.error("No user found");
    return null;
  }

  const { error: profileError } = await supabase
    .from("profile")
    .insert([{ id: user.id, username, role: "admin" }])
    .select();

  if (profileError) {
    console.error("Error creating profile:", profileError.message);
    return null;
  }

  return user;
};
