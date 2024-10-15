import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdmin } from "@/middleware/dashboard";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;
  const hostname = request.nextUrl.hostname;

  // Exclude static assets from being handled by middleware
  if (
    pathname.startsWith("/_next") || // Exclude Next.js built assets
    pathname.startsWith("/static") || // Exclude static files
    pathname.startsWith("/favicon.ico") || // Exclude favicon
    pathname.match(/\.(css|js|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/) // Exclude file extensions
  ) {
    return NextResponse.next(); // Allow static assets to pass through
  }

  // Handle the admin subdomain specifically
  if (hostname.startsWith("admin.")) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/dashboard${newUrl.pathname}`;

    // Allow access to the /auth page
    if (pathname === "/auth") {
      return NextResponse.next();
    }

    // Check if the user is authenticated using cookies
    const authToken = request.cookies.get("auth_token"); // Replace 'auth_token' with your actual token name

    if (!authToken) {
      console.error("User is not authenticated");
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    // Initialize Supabase client with the auth token from cookies
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

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User is not authenticated");
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    // Check if the user is an admin
    const isUserAdmin = await isAdmin(user as User);
    if (!isUserAdmin) {
      console.error("User is not authorized");
      newUrl.hostname = newUrl.hostname.replace("admin.", "");
      return NextResponse.redirect(new URL(newUrl.href));
    }

    // If authenticated and authorized, allow the request to proceed
    return response;
  }

  return response;
}

// Configure the middleware to apply only to relevant routes
export const config = {
  matcher: ["/dashboard/:path*", "/auth"], // Apply middleware only to /dashboard and /auth
};
