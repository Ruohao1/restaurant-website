import { createClient } from "@/utils/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

// Function to check if a user is an admin
export const isAdmin = async (user: User): Promise<boolean> => {
  const supabase = createClient();

  const { data: profiles, error } = await supabase
    .from("profile")
    .select()
    .eq("id", user.id);

  if (error) {
    console.error("Error fetching profile", error);
    return false; // Returning false if there's an error fetching the profile
  }

  const profile = profiles[0];
  return profile?.role === "admin"; // Check if the user role is 'admin'
};

// Function to check if a request comes from an admin user
export const checkAdmin = async (request: NextRequest) => {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  // Attempt to get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user", userError);
    return NextResponse.json(
      { error: "Unable to fetch user data" },
      { status: 500 }
    );
  }

  if (!user) {
    console.error("User is not authenticated");
    return NextResponse.redirect(new URL("/auth", request.url)); // Unauthorized
  }

  const isAdminUser = await isAdmin(user as User);

  if (!isAdminUser) {
    console.error("User is not authorized");
    request.nextUrl.hostname = request.nextUrl.hostname.replace("admin.", "");
    return NextResponse.redirect(new URL("/", request.nextUrl)); // Forbidden
  }

  return response; // If everything is fine, return the response
};
