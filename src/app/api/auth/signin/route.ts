// api/auth/signin.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Here you should verify the username with your database
  if (username !== "admin") {
    return NextResponse.json({ message: "Invalid username" }, { status: 400 });
  }

  const supabase = createClient();

  // Using signIn instead of signUp
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: "ruohaolin@gmail.com", // Ensure this email exists in your users table
    password,
  });

  if (signInError) {
    return NextResponse.json({ message: signInError.message }, { status: 400 });
  }

  // Here you should set a cookie with the session token if required
  return NextResponse.json({ message: "Sign up successful" });
}
