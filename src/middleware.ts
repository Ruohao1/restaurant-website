import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handleAdmin } from "./middleware/dashboard";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.nextUrl.hostname;

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
    return await handleAdmin(request);
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
