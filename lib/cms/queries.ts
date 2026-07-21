import { sanityClient } from "./client"
import type { BlogPost, BlogPostPreview, HomeContent } from "./types"

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
      }
    }`
  )
}