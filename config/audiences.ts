import { Audience } from "@/types/content"

export type AudienceConfig = {
    slug: Audience
    label: string
    headline: string
    subheadline: string
    description: string
    problemStatements?: string[]
    benefits: { title: string; description: string }[]
    partners?: { name: string; logo: string; width: number; height: number }[]
    partnerNote?: string
    socialProofNote?: string
    quote?: { text: string; author: string; role: string }
    cta: { label: string; href: string }
}

export const audienceConfig: Record<Audience, AudienceConfig> = {
    brands: {
        slug: "brands",
        label: "For Brands",
        headline: "Real data. Real answers. For real budgets.",
        subheadline: "Your marketing decisions are only as good as the data behind them. ADXC gives your AI agents access to premium data sources, and you only pay for the answers you use.",
        description:
            "ADXC gives brands a single point of access to premium data streams — normalised, enriched, and ready to act on. No contracts, no minimums, no noise.",
        problemStatements: [
            "You've been quoted $50K for a data subscription you'd use twice a year.",
            "You've built a brief as best you can using gut instinct and the data your LLM can gather (the killer stat is, on checking, a hallucination).",
            "You've presented a strategy and hoped nobody asked where the numbers came from.",
            "Sound familiar?",
        ],
        benefits: [
            {
                title: "Ask the questions your marketing depends on",
                description: "Audience research, competitive intelligence, market sizing — real answers to the questions that shape your strategy, your briefs, and your campaigns.",
            },
            {
                title: "Only pay for the answers you use",
                description: "No subscriptions or annual contracts. Spend $20 when you need an answer, not $200k in case you might.",
            },
            {
                title: "Answers you can stand behind",
                description: "ADXC pulls from premium, recognised data sources. So when someone asks \"what\'s this based on?\", you can answer confidently.",
            },
        ],
        partners: [
            { name: "Miro", logo: "/miro-logo.png", width: 120, height: 40 },
            { name: "DEPT", logo: "/dept-logo.jpg", width: 100, height: 40 },
        ],
        partnerNote: "Access via Miro — use ADXC through the tools you already know",
        socialProofNote: "Backed by leading agencies and data partners",
        quote: {
            text: "ADXC solves a real problem our SME clients face. How to get the data they need to fuel their AI agents, and accelerate their growth.",
            author: "Andrew Dimitriou",
            role: "Chief Growth Officer, DEPT",
        },
        cta: { label: "Get early access", href: "/early-access" },
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