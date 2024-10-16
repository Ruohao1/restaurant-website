import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAdmin } from "./middleware/dashboard";

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
    // dashboard routes as root of the admin subdomain
    const url = request.nextUrl.clone();
    // Only update the pathname if it does not already start with '/dashboard'
    if (!url.pathname.startsWith("/dashboard")) {
      url.pathname = `/dashboard${url.pathname}`;
    }

    url.pathname = `/dashboard${url.pathname}`;

    const response = await checkAdmin(request);
    console.log("Admin middleware response:", response);

    // Redirect to the login page if the user is not authenticated
    if (response.status === 401) {
      return NextResponse.redirect(new URL("/auth", url));
    }

    // Redirect to the homepage if the user is not authorized
    if (response.status === 403) {
      url.hostname = url.hostname.replace("admin.", "");
      return NextResponse.redirect(new URL("/", url));
    }

    // if everything is fine, return the response with the updated URL
    return NextResponse.redirect(url);
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
