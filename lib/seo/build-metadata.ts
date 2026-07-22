import type { Metadata } from "next"
import { urlFor } from "@/lib/cms/image"
import type { SeoContent, SiteSeoContent } from "@/lib/cms/types"

// Hardcode your production base URL here. If you have a staging/prod
// split via env vars, swap this for process.env.NEXT_PUBLIC_SITE_URL
// with this as the fallback.
const BASE_URL = "https://adxc.ai"

interface BuildMetadataArgs {
    seo?: SeoContent
    siteSeo?: SiteSeoContent | null
    /** The page's actual route, e.g. "/brands", "/" for home. Not stored
     *  in Sanity — this is routing, known wherever page.tsx lives. */
    path: string
}

export function buildMetadata({ seo, siteSeo, path }: BuildMetadataArgs): Metadata {
    // TODO: decide on a fallback title/description if seo is ever
    // undefined (e.g. Studio document exists but seo fields weren't
    // filled in) — for now this just omits metadata rather than
    // crashing, same spirit as the null-content page fallback.
    if (!seo) {
        return {}
    }

    const canonical = seo.canonicalUrl || `${BASE_URL}${path}`
    const ogTitle = seo.ogTitle || seo.metaTitle
    const ogDescription = seo.ogDescription || seo.metaDescription

    // Page-level ogImage wins; falls back to the site-wide default.
    const ogImageSource = seo.ogImage || siteSeo?.defaultOgImage
    const ogImage = ogImageSource
        ? {
            url: urlFor(ogImageSource).width(1200).height(630).url(),
            width: 1200,
            height: 630,
            alt: ogImageSource.alt || ogTitle,
        }
        : undefined

    return {
        title: seo.metaTitle,
        description: seo.metaDescription,
        alternates: {
            canonical,
        },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url: canonical,
            images: ogImage ? [ogImage] : undefined,
        },
    }
}