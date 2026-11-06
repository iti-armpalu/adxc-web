import { permanentRedirect } from "next/navigation"

// /product was an early placeholder; nav, footer and sitemap all point to the
// subpages now. Redirect (308) instead of 404 so old links and crawls land on content.
export default function ProductPage() {
    permanentRedirect("/product/platform")
}
