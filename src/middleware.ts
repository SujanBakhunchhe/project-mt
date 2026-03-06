import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // Protected routes
  const protectedRoutes = ["/profile", "/checkout", "/order", "/cart"]
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to home if accessing auth pages while logged in
  if (isLoggedIn && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/profile/:path*", "/checkout/:path*", "/order/:path*", "/cart", "/auth/:path*"],
}
