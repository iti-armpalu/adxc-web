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

// --- SEO ---

export type SeoContent = {
    metaTitle: string
    metaDescription: string
    canonicalUrl?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: SanityImage
}

export type SiteSeoContent = {
    defaultOgImage: SanityImage
}

// --- Home page ---

export type PlatformStep = {
    title: string
    description: string
    image: SanityImage
}

export type UseCase = {
    title: string
    description: string
    bullets: string[]
}

export type HomeContent = {
    heroHeadlineLine1: string
    heroHeadlineLine2?: string
    heroHeadlineLine3?: string
    heroSubtext: string
    platformHeadline: string
    platformSubtext: string
    platformSteps: PlatformStep[]
    problemSentenceOne: string
    problemSentenceTwo: string
    problemSentenceThree: string
    problemPunchline: string
    problemSolution: string
    useCasesHeadline: string
    useCasesSubtext: string
    useCases: UseCase[]
    seo?: SeoContent
}

// --- Audience pages (Brands / Agencies / Data Providers / AI Platforms) ---

export type AudienceFeature = {
    icon: string
    label?: string
    title: string
    lead: string
    description: string
}

export type AudiencePageContent = {
    audience: "brands" | "agencies" | "data-providers" | "ai-platforms"
    heroLabel: string
    heroHeadlineLine1: string
    heroHeadlineLine2?: string
    heroHeadlineLine3?: string
    heroSubtext: string
    howItWorksHeadline: string
    howItWorksSubtext?: string
    howItWorksFeatures: AudienceFeature[]
    seo?: SeoContent
}

// --- Product — Platform ---

export interface PlatformPageContent {
    heroLabel: string
    heroHeadlineLine1: string
    heroHeadlineLine2?: string
    heroHeadlineLine3?: string
    heroSubtext: string
    howItWorksHeadline: string
    howItWorksSubtext: string
    howItWorksSteps: AudienceFeature[]
    seo?: SeoContent
}

// --- Product — Data Sources ---

export interface DataProviderContent {
    name: string
    logo: SanityImage
    tagline: string
    description: string
    capabilities: string[]
}

export interface DataSourcesPageContent {
    heroHeadlineLine1: string
    heroHeadlineLine2?: string
    heroHeadlineLine3?: string
    heroSubtext: string
    providersHeadline: string
    providers: DataProviderContent[]
    seo?: SeoContent
}

export interface TeamMemberContent {
    name: string
    title: string
    photo: SanityImage
    linkedin: string
}

export interface AboutPageContent {
    heroHeadlineLine1: string
    heroHeadlineLine2?: string
    heroHeadlineLine3?: string
    heroSubtext: string[]
    teamHeadline: string
    team: TeamMemberContent[]
    seo?: SeoContent
}