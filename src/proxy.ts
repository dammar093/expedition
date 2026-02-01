
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { DEFAULT_REDIRECT_ADMIN_ROUTE, ADMIN_PROTECTED_ROUTES, DEFAULT_REDIRECT_USER_ROUTE, USER_PROTECTED_ROUTES, DEFAULT_REDIRECT_LOGIN_ROUTE, ADMIN_PROTECTED_API_ROUTES_PREFIX, USER_PROTECTED_API_ROUTES, AUTH_ROUTES } from "@/routes"

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAdminApiRoute = nextUrl.pathname.startsWith(ADMIN_PROTECTED_API_ROUTES_PREFIX);
  const isAdminRoute = nextUrl.pathname.startsWith(ADMIN_PROTECTED_ROUTES);
  const isUserProtecredRoute = USER_PROTECTED_ROUTES.includes(nextUrl.pathname)
  const isUserProtecredApiRoute = USER_PROTECTED_API_ROUTES.includes(nextUrl.pathname)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl))
    }
  }
  if (isAdminRoute) {

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_LOGIN_ROUTE, nextUrl));
    }
  }

  if (isAdminApiRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_LOGIN_ROUTE, nextUrl));
    }
  }
  if (isUserProtecredRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_LOGIN_ROUTE, nextUrl));
    }
  }
  if (isUserProtecredApiRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_LOGIN_ROUTE, nextUrl));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
