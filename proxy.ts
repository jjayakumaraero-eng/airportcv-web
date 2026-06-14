import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/cv-checker(.*)",
  "/cv-builder(.*)",
  "/career-coach(.*)",
  "/cover-letter(.*)",
  "/interview-prep(.*)",
  "/premium-report(.*)",

  "/api/analyse(.*)",
  "/api/extract-cv(.*)",
  "/api/cv-builder(.*)",
  "/api/cover-letter(.*)",
  "/api/career-coach(.*)",
  "/api/interview(.*)",
  "/api/interview-score(.*)",
  "/api/cabin-crew(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};