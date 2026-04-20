import { NextRequest, NextResponse } from "next/server"

// Pages accessible to the public
const ALLOWED_ROUTES = [
  "/",
  "/contact",
  "/early-access",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
]

function isPublicAsset(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpg|jpeg|svg|webp|css|js|ico|txt|map|json)$/.test(pathname)
  )
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow assets and API routes
  if (isPublicAsset(pathname)) return NextResponse.next()

  // Allow only public routes — redirect everything else to home
  const isAllowed = ALLOWED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ["/:path*"] }