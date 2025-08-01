// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { routeAccessMap } from "./lib/settings";
// import { NextResponse } from "next/server";

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//   matcher: createRouteMatcher([route]),
//   allowedRoles: routeAccessMap[route],
// }));

// export default clerkMiddleware(async (auth, req) => {
//   const proto = req.headers.get("x-forwarded-proto");
//   const host = req.headers.get("host");
//   const url = req.nextUrl;

//   // 🔒 1. Force HTTPS
//   if (proto && proto !== "https") {
//     const redirectUrl = `https://${host}${url.pathname}${url.search}`;
//     return NextResponse.redirect(redirectUrl);
//   }

//   // 🌐 2. Force non-www
//   if (host && host.startsWith("www.")) {
//     const redirectUrl = new URL(url.pathname + url.search, `https://schoolama.studio`);
//     return NextResponse.redirect(redirectUrl, 308);
//   }

//   // 🔐 3. Role-based access & redirect logic
//   const { sessionClaims } = await auth();

//   const role =
//     sessionClaims?.role ??
//     (sessionClaims?.publicMetadata as any)?.role ??
//     (sessionClaims?.metadata as any)?.role;

//   // 🚦 Redirect `/dashboard` to `/${role}`
//   if (url.pathname === "/dashboard" && role) {
//     url.pathname = `/${role}`;
//     return NextResponse.redirect(url);
//   }

//   // 🛂 Role-based access control for protected routes
//   for (const { matcher, allowedRoles } of matchers) {
//     if (matcher(req)) {
//       if (allowedRoles.length === 0) {
//         return NextResponse.next();
//       }

//       if (!role || !allowedRoles.includes(role)) {
//         return NextResponse.redirect(new URL("/sign-in", req.url));
//       }
//     }
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

// Define public routes that should be indexed by search engines
const isPublicRoute = createRouteMatcher([
  '/',
  '/home',
  '/about',
  '/contact',
  '/careers',
  '/privacy',
  '/terms',
  '/blog',
  '/blog/(.*)',
  '/help',
  '/docs',
  '/docs/(.*)',
  '/status',
  '/sign-in',
  '/sign-up',
  '/sitemap.xml',
  '/robots.txt'
]);

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const proto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("host");
  const url = req.nextUrl;

  // 🔒 1. Force HTTPS
  if (proto && proto !== "https") {
    const redirectUrl = `https://${host}${url.pathname}${url.search}`;
    return NextResponse.redirect(redirectUrl);
  }

  // 🌐 2. Force non-www
  if (host && host.startsWith("www.")) {
    const redirectUrl = new URL(url.pathname + url.search, `https://schoolama.studio`);
    return NextResponse.redirect(redirectUrl, 308);
  }

  // 🔍 3. Skip Clerk auth processing for public routes to prevent noindex headers
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // 🔐 4. Role-based access & redirect logic
  const { sessionClaims } = await auth();

  const role =
    sessionClaims?.role ??
    (sessionClaims?.publicMetadata as any)?.role ??
    (sessionClaims?.metadata as any)?.role;

  // 🚦 Redirect `/dashboard` to `/${role}`
  if (url.pathname === "/dashboard" && role) {
    url.pathname = `/${role}`;
    return NextResponse.redirect(url);
  }

  // 🛂 Role-based access control for protected routes
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      if (allowedRoles.length === 0) {
        return NextResponse.next();
      }

      if (!role || !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Include all routes except static files and Next.js internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Include API and TRPC routes
    "/(api|trpc)(.*)",
  ],
};