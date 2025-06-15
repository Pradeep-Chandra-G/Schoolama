// // import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// // import { routeAccessMap } from "./lib/settings";
// // import { NextResponse } from "next/server";

// // const matchers = Object.keys(routeAccessMap).map((route) => ({
// //   matcher: createRouteMatcher([route]),
// //   allowedRoles: routeAccessMap[route],
// // }));

// // console.log(matchers);

// // export default clerkMiddleware(async (auth, req) => {
// //   // if (isProtectedRoute(req)) auth().protect()

// //   const { sessionClaims } = await auth();
// //   console.log(sessionClaims)

// //   const role = (sessionClaims?.metadata as { role?: string })?.role;


// //   for (const { matcher, allowedRoles } of matchers) {
// //     if (matcher(req) && !allowedRoles.includes(role!)) {
// //       return NextResponse.redirect(new URL(`/${role}`, req.url));
// //     }
// //   }
// // });

// // export const config = {
// //   matcher: [
// //     // Skip Next.js internals and all static files, unless found in search params
// //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// //     // Always run for API routes
// //     "/(api|trpc)(.*)",
// //   ],
// // };


// // import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// // import { NextResponse } from 'next/server';

// // const isPublicRoute = createRouteMatcher([
// //   '/sign-in(.*)', 
// //   '/sign-up(.*)',
// //   '/',
// //   '/api/webhooks(.*)'
// // ]);

// // const isAdminRoute = createRouteMatcher(['/admin(.*)']);
// // const isTeacherRoute = createRouteMatcher(['/teacher(.*)']);
// // const isStudentRoute = createRouteMatcher(['/student(.*)']);
// // const isParentRoute = createRouteMatcher(['/parent(.*)']);

// // export default clerkMiddleware((auth, req) => {
// //   const { userId, sessionClaims } = auth();

// //   // Allow public routes
// //   if (isPublicRoute(req)) {
// //     return NextResponse.next();
// //   }

// //   // Redirect to sign-in if not authenticated
// //   if (!userId) {
// //     return NextResponse.redirect(new URL('/sign-in', req.url));
// //   }

// //   // Get user role from session claims
// //   const role = sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role;

// //   // If no role is set, redirect to a role selection page or sign-up
// //   if (!role) {
// //     return NextResponse.redirect(new URL('/sign-up', req.url));
// //   }

// //   // Role-based route protection
// //   if (isAdminRoute(req) && role !== 'admin') {
// //     return NextResponse.redirect(new URL(`/${role}`, req.url));
// //   }

// //   if (isTeacherRoute(req) && role !== 'teacher') {
// //     return NextResponse.redirect(new URL(`/${role}`, req.url));
// //   }

// //   if (isStudentRoute(req) && role !== 'student') {
// //     return NextResponse.redirect(new URL(`/${role}`, req.url));
// //   }

// //   if (isParentRoute(req) && role !== 'parent') {
// //     return NextResponse.redirect(new URL(`/${role}`, req.url));
// //   }

// //   return NextResponse.next();
// // });

// // export const config = {
// //   matcher: [
// //     // Skip Next.js internals and all static files, unless found in search params
// //     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
// //     // Always run for API routes
// //     '/(api|trpc)(.*)',
// //   ],
// // };


// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { routeAccessMap } from "./lib/settings";
// import { NextResponse } from "next/server";

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//   matcher: createRouteMatcher([route]),
//   allowedRoles: routeAccessMap[route],
// }));

// // Add public routes that don't need authentication
// const isPublicRoute = createRouteMatcher([
//   '/sign-in(.*)', 
//   '/sign-up(.*)',
//   '/',
//   '/api(.*)',
//   '/api/webhook(.*)',
//   '/api/public(.*)'
// ]);

// console.log(matchers);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId, sessionClaims } = await auth();

//   // Allow public routes
//   if (isPublicRoute(req)) {
//     return NextResponse.next();
//   }

//   // Redirect to sign-in if not authenticated
//   if (!userId) {
//     return NextResponse.redirect(new URL('/sign-in', req.url));
//   }

//   console.log("Full sessionClaims:", sessionClaims);

//   // Try different ways to get the role (Clerk stores it in different places)
//   const publicMetadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
//   const privateMetadata = sessionClaims?.metadata as { role?: string } | undefined;
//   const unsafeMetadata = sessionClaims?.unsafeMetadata as { role?: string } | undefined;

//   const role = publicMetadata?.role || privateMetadata?.role || unsafeMetadata?.role;

//   console.log("Extracted role:", role);

//   // If no role is found, redirect to role selection or sign-up
//   if (!role) {
//     console.log("No role found, redirecting to sign-up");
//     return NextResponse.redirect(new URL('/sign-up', req.url));
//   }

//   // Check route access permissions
//   for (const { matcher, allowedRoles } of matchers) {
//     if (matcher(req)) {
//       console.log(`Route matched, allowed roles: ${allowedRoles}, user role: ${role}`);

//       if (!allowedRoles.includes(role)) {
//         console.log(`Access denied, redirecting to /${role}`);
//         return NextResponse.redirect(new URL(`/${role}`, req.url));
//       }

//       // If role is allowed, continue
//       break;
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

// Publicly accessible routes (don't require authentication)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
  '/api/webhook(.*)',
  '/api/public(.*)'
]);

// Map of route permissions based on role
const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  const url = new URL(req.url);

  // Redirect unauthenticated users from `/` to `/sign-in`
  if (url.pathname === '/') {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // Authenticated — get role and redirect
    const publicMetadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    const privateMetadata = sessionClaims?.metadata as { role?: string } | undefined;
    const unsafeMetadata = sessionClaims?.unsafeMetadata as { role?: string } | undefined;

    const role = publicMetadata?.role || privateMetadata?.role || unsafeMetadata?.role;

    // If no role, send to sign-up or setup page
    if (!role) {
      return NextResponse.redirect(new URL('/sign-up', req.url));
    }

    // Redirect to /{role}
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  // Allow public routes to proceed
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to sign-in
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Extract user role from various Clerk metadata sources
  const publicMetadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
  const privateMetadata = sessionClaims?.metadata as { role?: string } | undefined;
  const unsafeMetadata = sessionClaims?.unsafeMetadata as { role?: string } | undefined;

  const role = publicMetadata?.role || privateMetadata?.role || unsafeMetadata?.role;


  // Redirect users without a role to sign-up or role selection
  if (!role) {
    return NextResponse.redirect(new URL('/sign-up', req.url));
  }

  // Enforce role-based access control for defined routes
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
