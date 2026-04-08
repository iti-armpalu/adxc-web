import type { PortableTextBlock } from "next-sanity"

export type SanityImage = {
    _type: "image"
    asset: { _ref: string; _type: "reference" }
    alt?: string
}

export type BlogPost = {
    _id: string
    title: string
    slug: string
    excerpt?: string
    publishedAt: string
    image?: SanityImage
    body?: PortableTextBlock[]
}

// Listing variant — no body, used on /blog page
export type BlogPostPreview = Omit<BlogPost, "body">