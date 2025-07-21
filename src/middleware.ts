// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { routeAccessMap } from "./lib/settings";
// import { NextResponse } from "next/server";

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//   matcher: createRouteMatcher([route]),
//   allowedRoles: routeAccessMap[route],
// }));

// // console.log(matchers);

// export default clerkMiddleware(async (auth, req) => {
//   const { sessionClaims } = await auth();

//   const role =
//     sessionClaims?.role ??
//     (sessionClaims?.publicMetadata as any)?.role ??
//     (sessionClaims?.metadata as any)?.role;

//   for (const { matcher, allowedRoles } of matchers) {
//     // If the request matches and it's not a public route (i.e., roles are specified)
//     if (matcher(req)) {
//       if (allowedRoles.length === 0) {
//         // Public route, no auth needed — skip
//         return NextResponse.next();
//       }

//       if (!role || !allowedRoles.includes(role)) {
//         // If role is missing or not allowed, redirect
//         return NextResponse.redirect(new URL("/sign-in", req.url)); // or any fallback route
//       }
//     }
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
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
  // 🔐 Step 1: Redirect HTTP → HTTPS
  const proto = req.headers.get("x-forwarded-proto");
  if (proto && proto !== "https") {
    const url = new URL(req.url);
    url.protocol = "https:";
    return NextResponse.redirect(url);
  }

  // 👇 Step 2: Your existing Clerk + Role logic
  const { sessionClaims } = await auth();

  const role =
    sessionClaims?.role ??
    (sessionClaims?.publicMetadata as any)?.role ??
    (sessionClaims?.metadata as any)?.role;

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
