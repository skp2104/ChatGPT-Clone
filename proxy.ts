import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  const isPublicRoute =
    pathname === "/sign-in" || pathname.startsWith("/sign-in/");

  if (!isPublicRoute) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for Clerk's frontend API proxy
    "/__clerk/:path*",

    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
