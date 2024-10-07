// import acceptLanguage from 'accept-language'
// import { fallbackLng, languages, cookieName } from './app/i18n/settings'

// acceptLanguage.languages(languages)

// export const config = {
//   // matcher: '/:lng*'
//   matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
// }

// export function middleware(req) {
//   console.log("req", req);
//   if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) return NextResponse.next()
//   let lng
//   if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
//   if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
//   if (!lng) lng = fallbackLng

//   // Redirect if lng in path is not supported
//   if (
//     !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
//     !req.nextUrl.pathname.startsWith('/_next')
//   ) {
//     return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url))
//   }

//   if (req.headers.has('referer')) {
//     const refererUrl = new URL(req.headers.get('referer'))
//     const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
//     const response = NextResponse.next()
//     if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
//     return response
//   }

//   return NextResponse.next()
// }
// /src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;

  // Vérifie si la requête vient du sous-domaine admin.domain.com
  if (hostname.startsWith("admin.")) {
    // Redirige vers /dashboard en utilisant les routes du répertoire /src/app/dashboard
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/dashboard${newUrl.pathname}`;
    return NextResponse.rewrite(newUrl);
  }

  // Si ce n'est pas le sous-domaine admin, continuer la navigation normale
  return NextResponse.next();
}

// Configurer le middleware pour appliquer à toutes les routes
export const config = {
  matcher: "/:path*", // Le middleware s'appliquera à toutes les routes
};
