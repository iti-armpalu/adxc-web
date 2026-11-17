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

export type SiteSettingsContent = {
    footerDescription: string
}

// --- Home page ---

export type PartnerLogoContent = {
    name: string
    logo: SanityImage
    showName?: boolean
}

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
    partnersDataLabel: string
    partnersDataLogos: PartnerLogoContent[]
    partnersMoreText?: string
    partnersAccessLabel: string
    partnersAccessLogos: PartnerLogoContent[]
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
    ctaHeadline: string
    ctaSubtext: string
    ctaButtonLabel: string
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

// Audience pages share one Studio document type but not the same
// sections. The section field groups below are composed per page, so
// pages not yet migrated aren't forced to supply fields they don't have.
type DataProvidersFields = {
    dataProvidersLabel: string
    dataProvidersLogos: PartnerLogoContent[]
    dataProvidersMoreText?: string
}

type ProblemFields = {
    problemLabel?: string
    problemStat: string
    problemStatLabel: string
    problemSubtext: string
    problemNote: string
}

type IntegrationsFields = {
    integrationsHeadline: string
    integrationsSubtext: string
    integrationsLabel: string
    integrationsLogos: PartnerLogoContent[]
    integrationsMoreText?: string
}

type CtaFields = {
    ctaHeadline: string
    ctaSubtext: string
    ctaButtonLabel: string
}

type PartnersFields = {
    partnersLabel: string
    partnersLogos: PartnerLogoContent[]
}

type TopPartnersFields = {
    topPartnersLabel: string
    topPartnersLogos: PartnerLogoContent[]
}

export type StatItemContent = {
    value: string
    label: string
    sourceUrl?: string
}

type StatFields = {
    statValue: string
    statLabel: string
    statSubtext: string
    statNote: string
}

type WhyNowFields = {
    whyNowLabel: string
    whyNowStats: StatItemContent[]
    whyNowHeadline: string
    whyNowNote?: string
}

type DistributionFields = {
    distributionHeadline: string
    distributionSubtext: string
    distributionNote?: string
    distributionLabel: string
    distributionLogos: PartnerLogoContent[]
    distributionStatValue: string
    distributionStatLabel: string
    distributionImage: SanityImage
}

export type StatCardContent = {
    value: string
    label: string
    labelSourceUrl?: string
    subtext: string
    subtextSourceUrl?: string
}

type MidPartnersFields = {
    midPartnersLabel: string
    midPartnersLogos: PartnerLogoContent[]
    midPartnersMoreText?: string
}

export type LinkCardContent = {
    title: string
    description: string
    linkLabel: string
    linkHref: string
}

export type BrandsPageContent = AudiencePageContent &
    DataProvidersFields &
    ProblemFields &
    IntegrationsFields &
    CtaFields &
    PartnersFields

export type AIPlatformsPageContent = AudiencePageContent & {
    capabilitiesHeadline: string
    capabilitiesSubtext: string
    whyNowLabel: string
    whyNowCards: StatCardContent[]
} & MidPartnersFields &
    CtaFields & {
        ctaLabel: string
    }

export type DataProvidersPageContent = AudiencePageContent &
    DataProvidersFields &
    StatFields &
    WhyNowFields &
    DistributionFields &
    CtaFields & {
        ctaLabel: string
    } & PartnersFields

export type AgenciesPageContent = AudiencePageContent &
    TopPartnersFields &
    IntegrationsFields &
    CtaFields & {
        otherWaysHeadline: string
        otherWays: LinkCardContent[]
    }

// --- Product — Platform ---

export interface PlatformPageContent {
    heroLabel: string
    heroHeadlineLine1: string
    heroHeadlineLine2?: string
    heroHeadlineLine3?: string
    heroSubtext: string
    overviewHeadline: string
    overviewSubtext: string
    overviewNote?: string
    howItWorksHeadline: string
    howItWorksSubtext: string
    howItWorksSteps: AudienceFeature[]
    patentHeadline: string
    patentSubtext: string
    audiencesHeadline: string
    providersLabel: string
    providersLogos: PartnerLogoContent[]
    providersMoreText?: string
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