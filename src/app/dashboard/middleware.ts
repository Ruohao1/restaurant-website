import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/utils/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/dashboard/:path*",
};

export const updateSession = async (request: NextRequest) => {
  console.log("Middleware: updateSession in dashboard");
  // Create an unmodified response
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError) {
    console.error("Error fetching session", sessionError);
    return [];
  }

  if (!session) {
    console.error("User is not authenticated");
    return NextResponse.redirect("/dashboard/auth");
  }

  const { user } = session;

  if (!user) {
    console.error("User is not authenticated");
    return response;
  }

  if (await isAdmin(user as User)) {
    console.error("Access denied: user does not have admin privileges");
    return [];
  }

  return response;
};
