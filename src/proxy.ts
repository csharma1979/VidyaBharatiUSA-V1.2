import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Using jose for edge compatibility
const JWT_SECRET = process.env.JWT_SECRET || "development_secret_key_if_missing";
const key = new TextEncoder().encode(JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin and /api/admin/* (except login)
  const isAdminRoute = pathname.startsWith("/admin") && !pathname.startsWith("/admin-login");
  const isProtectedAdminApiRoute = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login");

  // Protect /dashboard and /api/user/* AND /api/donations/user
  const isUserDashboardRoute = pathname.startsWith("/dashboard");
  const isProtectedUserApiRoute = 
    pathname.startsWith("/api/user") || 
    pathname.startsWith("/api/donations/user");

  // Admin Protection Logic
  if (isAdminRoute || isProtectedAdminApiRoute) {
    const token = request.cookies.get("admin_auth_token")?.value;

    if (!token) {
      if (isProtectedAdminApiRoute) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }

    try {
      if (!JWT_SECRET) throw new Error("JWT_SECRET missing");
      const { payload } = await jwtVerify(token, key);
      
      if (payload.role !== "admin") {
         return NextResponse.redirect(new URL("/admin-login", request.url));
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-admin-email', payload.email as string);
      
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch (error) {
      console.error("Admin token verification failed:", error);
      const response = isProtectedAdminApiRoute 
        ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        : NextResponse.redirect(new URL("/admin-login", request.url));
      response.cookies.delete("admin_auth_token");
      return response;
    }
  }

  // User Dashboard Protection Logic
  if (isUserDashboardRoute || isProtectedUserApiRoute) {
    const token = request.cookies.get("user_auth_token")?.value;

    if (!token) {
      if (isProtectedUserApiRoute) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      if (!JWT_SECRET) throw new Error("JWT_SECRET missing");
      const { payload } = await jwtVerify(token, key);
      
      // Allow users and admins to view user dashboard if they have the token
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-email', payload.email as string);
      requestHeaders.set('x-user-id', payload.userId as string);
      
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch (error) {
      console.error("User token verification failed:", error);
      const response = isProtectedUserApiRoute 
        ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        : NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("user_auth_token");
      return response;
    }
  }

  // Redirect authenticated admins/users from login pages
  if (pathname === "/admin-login") {
    const token = request.cookies.get("admin_auth_token")?.value;
    if (token) {
      try {
        if (JWT_SECRET) {
          await jwtVerify(token, key);
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
      } catch (error) {}
    }
  }

  if (pathname === "/login") {
    const token = request.cookies.get("user_auth_token")?.value;
    if (token) {
      try {
        if (JWT_SECRET) {
          await jwtVerify(token, key);
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (error) {}
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", 
    "/dashboard/:path*", 
    "/api/admin/:path*", 
    "/api/user/:path*", 
    "/api/donations/user",
    "/admin-login", 
    "/login"
  ],
};
