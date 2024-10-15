import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";
import { cookies } from "next/headers";

import { isAdmin } from "@/middleware/dashboard";

export async function middleware(request: NextRequest) {
  // Exclude static assets from the rewrite (like CSS, JS, images, and favicon)
  const pathname = request.nextUrl.pathname;
  const hostname = request.nextUrl.hostname;

  if (
    pathname.startsWith("/_next") || // Exclude Next.js built assets
    pathname.startsWith("/static") || // Exclude static files in /public/static
    pathname.startsWith("/favicon.ico") || // Exclude favicon
    pathname.match(/\.(css|js|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/) // Exclude file extensions
  ) {
    return NextResponse.next(); // Allow static assets to pass through without rewriting
  }

  // Rewrite only for admin subdomain
  if (hostname.startsWith("admin.")) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/dashboard${newUrl.pathname}`;
    return NextResponse.rewrite(newUrl);
  }

  // Allow access to the auth page
  if (pathname === "/dashboard/auth") {
    return NextResponse.next();
  }

  if (hostname.startsWith("admin.") && pathname.startsWith("/")) {
    // Check if user is authenticated
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User is not authenticated");
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    // Check if user is an admin
    if (!(await isAdmin(user as User))) {
      console.error("User is not authorized");
      // remove admin. from the hostname and redirect to the homepage

      const newUrl = request.nextUrl.clone();
      newUrl.hostname = newUrl.hostname.replace("admin.", "");
      return NextResponse.redirect(new URL(newUrl.href));
    }
  }
  // Allow the request to proceed
  return NextResponse.next();
}

// Configurer le middleware pour appliquer à toutes les routes
export const config = {
  matcher: ["/:path*", "/dashboard/:path*"], // Le middleware s'appliquera à toutes les routes
};
