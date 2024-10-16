import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// import { isAdmin } from "@/middleware/dashboard"; // Assuming this function exists
// import { createServerClient } from "@supabase/ssr";
// import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.nextUrl.hostname;

  console.log("Middleware running");
  console.log("Hostname:", hostname);

  // Create an unmodified response object
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Exclude static assets from being handled by middleware
  if (
    pathname.startsWith("/_next") || // Exclude Next.js built assets
    pathname.startsWith("/static") || // Exclude static files
    pathname.startsWith("/favicon.ico") || // Exclude favicon
    pathname.startsWith("/api") || // Exclude favicon
    pathname.match(/\.(css|js|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/) // Exclude file extensions
  ) {
    return NextResponse.next(); // Allow static assets to pass through
  }

  // Handle the admin subdomain specifically
  if (hostname.startsWith("admin.")) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/dashboard${newUrl.pathname}`; // Root of admin.domain.com serves /dashboard

    // Allow access to the /auth page
    if (pathname === "/auth") {
      return NextResponse.rewrite(newUrl);
    }

    // const cookie = request.headers.get("sesionId");
    // const supabase = createClient(cookie);

    // // Get the authenticated user
    // const {
    //   data: { user },
    //   error: userError,
    // } = await supabase.auth.getUser();

    // if (userError || !user) {
    //   console.error("User is not authenticated");
    //   return NextResponse.redirect(new URL("/auth", newUrl));
    // }

    // // Check if the user is an admin
    // const isUserAdmin = await isAdmin(user as User);
    // if (!isUserAdmin) {
    //   console.error("User is not authorized");
    //   newUrl.hostname = newUrl.hostname.replace("admin.", "");
    //   return NextResponse.redirect(new URL(newUrl));
    // }

    // If authenticated and authorized, allow the request to proceed
    return NextResponse.rewrite(newUrl);
  }

  if (pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Default response
  return response;
}

// Configure the middleware to apply only to relevant routes
export const config = {
  matcher: ["/:path*", "/dashboard/:path*", "/auth"], // Apply middleware only to relevant routes
};
