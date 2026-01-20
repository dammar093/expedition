// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { decodeJWT } from "./utils/jwt-decode";

const userProtectedRoutes = ["/profile"];
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  // If token exists
  if (token) {
    const decoded = decodeJWT(token); // returns payload with { role: "admin" | "user" }

    // Admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!decoded || decoded.role !== "admin") {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

    // User routes
    if (userProtectedRoutes.some(route => pathname.startsWith(route))) {
      if (!decoded || decoded.role !== "user") {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

    // Token is valid and role matches → allow
    return NextResponse.next();
  }

  // No token → redirect if accessing protected routes
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    userProtectedRoutes.some(route => pathname.startsWith(route))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Public route → allow
  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
