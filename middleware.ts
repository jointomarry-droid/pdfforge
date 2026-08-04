import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect dashboard and admin routes.
 *
 * When AUTH_SECRET is set, this middleware checks for a session cookie
 * and redirects unauthenticated users to the login page.
 *
 * When AUTH_SECRET is not set, the middleware is a no-op and all
 * routes are accessible (useful for development).
 */

const PROTECTED_ROUTES = ["/dashboard", "/admin"];
const AUTH_ROUTES = ["/login", "/signup"];
const SESSION_COOKIE = "pdfforge-session";

function isAuthenticated(request: NextRequest): boolean {
  // Check for session cookie
  const session = request.cookies.get(SESSION_COOKIE);
  if (session?.value) {
    return true;
  }

  // Check for auth secret - if not configured, allow all access
  if (!process.env.AUTH_SECRET) {
    return true;
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // Check if the route is an auth route
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // If the route is protected and user is not authenticated
  if (isProtected && !isAuthenticated(request)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated and trying to access auth routes,
  // redirect to dashboard
  if (isAuthRoute && isAuthenticated(request) && process.env.AUTH_SECRET) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
  ],
};
