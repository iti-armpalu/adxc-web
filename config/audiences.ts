import { Audience } from "@/types/content"

export type AudienceConfig = {
    slug: Audience
    label: string
    headline: string
    subheadline: string
    description: string
    benefits: { title: string; description: string }[]
    cta: { label: string; href: string }
}

export const audienceConfig: Record<Audience, AudienceConfig> = {
    brands: {
        slug: "brands",
        label: "For Brands",
        headline: "Your data, working harder.",
        subheadline: "Access the marketing data you need, pay only for what you use.",
        description:
            "ADXC gives brands a single point of access to premium data streams — normalised, enriched, and ready to act on. No contracts, no minimums, no noise.",
        benefits: [
            {
                title: "Pay per use",
                description: "Access any data stream without long-term commitments or upfront costs.",
            },
            {
                title: "Unified access",
                description: "One platform, one integration, every data source you need.",
            },
            {
                title: "Actionable outputs",
                description: "Data arrives structured and enriched — ready for your team to use immediately.",
            },
        ],
        cta: { label: "Request access", href: "/contact" },
    },

    agencies: {
        slug: "agencies",
        label: "For Agencies",
        headline: "One data layer for every client.",
        subheadline: "Stop stitching together data sources. Access everything your clients need in one place.",
        description:
            "ADXC gives agencies a single integration point for all client data needs — clean, normalised, and ready to activate. Spend less time on data plumbing, more time on strategy.",
        benefits: [
            {
                title: "Multi-client ready",
                description: "Manage data access across all your clients from a single platform.",
            },
            {
                title: "No integration overhead",
                description: "One API, every data source — no bespoke connectors per client.",
            },
            {
                title: "Transparent billing",
                description: "Usage-based pricing makes client cost attribution simple and auditable.",
            },
        ],
        cta: { label: "Request access", href: "/contact" },
    },

    "data-providers": {
        slug: "data-providers",
        label: "For Data Providers",
        headline: "Monetise your data without the overhead.",
        subheadline: "Reach buyers who need exactly what you have.",
        description:
            "ADXC handles ingestion, normalisation, and distribution — so you can focus on producing quality data while we handle everything else.",
        benefits: [
            {
                title: "Instant distribution",
                description: "Your data reaches qualified buyers from day one.",
            },
            {
                title: "Zero infrastructure",
                description: "We handle ingestion, transformation, and delivery pipelines.",
            },
            {
                title: "Usage-based revenue",
                description: "Earn every time your data is accessed — transparent, real-time reporting.",
            },
        ],
        cta: { label: "Become a provider", href: "/contact" },
    },

    "ai-platforms": {
        slug: "ai-platforms",
        label: "For AI Platforms",
        headline: "The data layer your models need.",
        subheadline: "Structured, enriched, real-time data streams built for AI consumption.",
        description:
            "ADXC provides AI platforms with clean, structured data feeds — normalised for model consumption and delivered at the cadence your pipelines require.",
        benefits: [
            {
                title: "Model-ready structure",
                description: "Data arrives pre-normalised and enriched — no pre-processing required.",
            },
            {
                title: "Real-time streams",
                description: "Low-latency feeds that keep your models current.",
            },
            {
                title: "Flexible integration",
                description: "API-first delivery that fits your existing infrastructure.",
            },
        ],
        cta: { label: "Talk to us", href: "/contact" },
    },
}

export const validAudiences = Object.keys(audienceConfig) as Audience[]