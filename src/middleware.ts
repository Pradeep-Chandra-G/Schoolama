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
  const host = req.headers.get("host");

  // 🔒 Force HTTPS
  if (proto && proto !== "https") {
    const url = new URL(req.url);
    url.protocol = "https:";
    return NextResponse.redirect(url);
  }

  // 🌐 Force non-www domain
  if (host && host.startsWith("www.")) {
    const url = new URL(req.url);
    url.hostname = host.replace(/^www\./, "");
    return NextResponse.redirect(url, 308);
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
