import { NextRequest, NextResponse } from "next/server"
import { verifyEdge } from "@/lib/gate/token-edge"
import { DEPT_COOKIE_NAME } from "@/lib/gate/token"

// Pages accessible to the public
const ALLOWED_ROUTES = [
  "/",
  "/contact",
  "/early-access",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
  "/for/data-providers",
  "/for/ai-platforms",
  "/for/agencies",
  "/for/brands",
  "/product/platform",
  "/product/data-sources"
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
  const host = req.headers.get("host") ?? ""

  // ----------------------------------------------------------------
  // DEPT subdomain — completely isolated from main site logic
  // ----------------------------------------------------------------
  if (
    host === "dept.adxc.ai" ||
    host.startsWith("dept.adxc.ai:") ||
    host === "localhost:3000" // temporary — remove before merging to main
  ) {
    // Always allow assets
    if (isPublicAsset(pathname)) return NextResponse.next()

    const secret = process.env.DEPT_GATE_COOKIE_SECRET
    const cookieValue = req.cookies.get(DEPT_COOKIE_NAME)?.value

    // Check for valid gate cookie
    const valid = secret && cookieValue
      ? await verifyEdge(cookieValue, secret)
      : null

    if (!valid) {
      // Not authenticated — rewrite to gate page
      return NextResponse.rewrite(new URL("/dept/gate", req.url))
    }

    // Authenticated — rewrite root to calculator
    if (pathname === "/" || pathname === "") {
      return NextResponse.rewrite(new URL("/dept/calculator", req.url))
    }

    return NextResponse.next()
  }

  // ----------------------------------------------------------------
  // Main site — existing allowlist logic unchanged
  // ----------------------------------------------------------------

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