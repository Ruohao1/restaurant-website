import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (req.method === "POST") {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out", error);
      return NextResponse.json(
        { message: "Error signing out" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Sign out successful" });
  }

  return NextResponse.json({ message: "Invalid method" }, { status: 405 });
};
