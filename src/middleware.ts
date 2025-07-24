// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { routeAccessMap } from "./lib/settings";
// import { NextResponse } from "next/server";

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//   matcher: createRouteMatcher([route]),
//   allowedRoles: routeAccessMap[route],
// }));

// export default clerkMiddleware(async (auth, req) => {
//   // 🔐 Step 1: Redirect HTTP → HTTPS
//   const proto = req.headers.get("x-forwarded-proto");
//   const host = req.headers.get("host");  

//   // 🔒 Force HTTPS
//   if (proto && proto !== "https") {
//     // Don't use req.url as it contains localhost - construct URL from host header
//     const redirectUrl = `https://${host}${req.nextUrl.pathname}${req.nextUrl.search}`;
//     return NextResponse.redirect(redirectUrl);
//   }

//   // 🌐 Force non-www domain
//   if (host && host.startsWith("www.")) {
//     // Use req.nextUrl which is already parsed and should handle this correctly
//     const redirectUrl = new URL(req.nextUrl.pathname + req.nextUrl.search, `https://schoolama.studio`);
//     return NextResponse.redirect(redirectUrl, 308);
//   }

//   // 👇 Step 2: Your existing Clerk + Role logic
//   const { sessionClaims } = await auth();

//   const role =
//     sessionClaims?.role ??
//     (sessionClaims?.publicMetadata as any)?.role ??
//     (sessionClaims?.metadata as any)?.role;

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

  // 🔐 3. Role-based access & redirect logic
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
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
