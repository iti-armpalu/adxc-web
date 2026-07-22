import { sanityClient } from "./client"
import type { AudiencePageContent, BlogPost, BlogPostPreview, HomeContent, SiteSeoContent } from "./types"

const SEO_PROJECTION = `
      seo {
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle,
        ogDescription,
        ogImage
      }
`

// All posts for listing page — no body field (keeps response lean)
export async function getPosts(): Promise<BlogPostPreview[]> {
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      image
    }`
  )
}

// Single post by slug — includes body for rendering
export async function getPost(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      image,
      body
    }`,
    { slug }
  )
}

// All slugs for generateStaticParams
export async function getPostSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] {
      "slug": slug.current
    }`
  )
}

// Home page — singleton, fixed _id "home" (see studio structure.ts)
export async function getHome(): Promise<HomeContent | null> {
  return sanityClient.fetch(
    `*[_type == "home" && _id == "home"][0] {
      heroHeadline,
      heroSubtext,
      platformHeadline,
      platformSubtext,
      platformSteps[] {
        title,
        description,
        image
      },
      problemSentenceOne,
      problemSentenceTwo,
      problemSentenceThree,
      problemPunchline,
      problemSolution,
      useCasesHeadline,
      useCasesSubtext,
      useCases[] {
        title,
        description,
        bullets
      },
      ${SEO_PROJECTION}
    }`
  )
}

// Audience pages are pinned singletons — _id: "audience-brands", etc.
// (see studio-adxc/structure.ts).
export async function getBrandsPage(): Promise<AudiencePageContent | null> {
  return sanityClient.fetch(
    `*[_type == "audiencePage" && _id == "audience-brands"][0] {
      audience,
      heroLabel,
      heroHeadline,
      heroSubtext,
      howItWorksHeadline,
      howItWorksFeatures[] {
        icon,
        title,
        lead,
        description
      },
      ${SEO_PROJECTION}
    }`
  )
}

export async function getAgenciesPage(): Promise<AudiencePageContent | null> {
  return sanityClient.fetch(
    `*[_type == "audiencePage" && _id == "audience-agencies"][0] {
      audience,
      heroLabel,
      heroHeadline,
      heroSubtext,
      howItWorksHeadline,
      howItWorksFeatures[] {
        icon,
        title,
        lead,
        description
      },
      ${SEO_PROJECTION}
    }`
  )
}

export async function getDataProvidersPage(): Promise<AudiencePageContent | null> {
  return sanityClient.fetch(
    `*[_type == "audiencePage" && _id == "audience-data-providers"][0] {
      audience,
      heroLabel,
      heroHeadline,
      heroSubtext,
      howItWorksHeadline,
      howItWorksFeatures[] {
        icon,
        title,
        lead,
        description
      },
      ${SEO_PROJECTION}
    }`
  )
}

export async function getAIPlatformsPage(): Promise<AudiencePageContent | null> {
  return sanityClient.fetch(
    `*[_type == "audiencePage" && _id == "audience-ai-platforms"][0] {
      audience,
      heroLabel,
      heroHeadline,
      heroSubtext,
      howItWorksHeadline,
      howItWorksSubtext,
      howItWorksFeatures[] {
        icon,
        title,
        lead,
        description
      },
      ${SEO_PROJECTION}
    }`
  )
}

// Site-wide SEO fallback — singleton, fixed _id "siteSeo"
export async function getSiteSeo(): Promise<SiteSeoContent | null> {
  return sanityClient.fetch(
    `*[_type == "siteSeo" && _id == "siteSeo"][0] {
      defaultOgImage
    }`
  )
}