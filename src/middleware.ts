import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";
import { cookies } from "next/headers";

import { isAdmin } from "@/middleware/dashboard";

export async function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  // Vérifie si la requête vient du sous-domaine admin.domain.com
  if (hostname.startsWith("admin.")) {
    // Redirige vers /dashboard en utilisant les routes du répertoire /src/app/dashboard
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/dashboard${newUrl.pathname}`;
    return NextResponse.rewrite(newUrl);
  }

  const pathname = request.nextUrl.pathname;

  // Allow access to the auth page
  if (pathname === "/dashboard/auth") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    // Check if user is authenticated
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User is not authenticated");
      return NextResponse.redirect(new URL("/dashboard/auth", request.url));
    }

    // Check if user is an admin
    if (!(await isAdmin(user as User))) {
      console.error("User is not authorized");
      return NextResponse.redirect("/");
    }
  }
  // Allow the request to proceed
  return NextResponse.next();
}

// Configurer le middleware pour appliquer à toutes les routes
export const config = {
  matcher: "/:path*", // Le middleware s'appliquera à toutes les routes
};
