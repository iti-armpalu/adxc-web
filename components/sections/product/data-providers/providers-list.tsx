import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/ui/fade-in"

type Provider = {
    name: string
    logo: string
    logoWidth: number
    logoHeight: number
    tagline: string
    description: string
    capabilities: string[]
}

const providers: Provider[] = [
    {
        name: "YouGov Profiles",
        logo: "/yougov-logo-horizontal.png",
        logoWidth: 120,
        logoHeight: 40,
        tagline: "One of the world's most trusted consumer research providers.",
        description:
            "YouGov is used by the world's largest brands and agencies. Profiles is their syndicated audience and brand dataset, built from their panel of 30+ million registered members across 55 markets. It is a continuously-updated dataset covering millions of consumer datapoints across attitudes, behaviours, demographics, media consumption, and brand affinities.",
        capabilities: [
            "Audience profiling",
            "Brand tracking",
            "Category intelligence",
            "Media and channel preferences",
            "Attitudinal data",
        ],
    },
    {
        name: "Quid",
        logo: "/quid-logo.svg",
        logoWidth: 80,
        logoHeight: 40,
        tagline: "AI-powered consumer and market intelligence.",
        description:
            "Quid analyses billions of real-time data points from social, news, forum, search, and proprietary sources. Used by brands like Coca-Cola, Walmart, BCG, and Ogilvy, Quid surfaces emerging consumer trends, brand sentiment, competitive dynamics, and cultural shifts before they fully break. The platform combines two decades of proprietary NLP and sentiment methodology with generative AI, ingesting over 300 million documents per day.",
        capabilities: [
            "Trend identification",
            "Brand sentiment analysis",
            "Cultural insight",
            "Consumer conversation analysis",
        ],
    },
    {
        name: "Datastreamer",
        logo: "/datastreamer-logo.webp",
        logoWidth: 120,
        logoHeight: 40,
        tagline: "Social and web data orchestration at scale.",
        description:
            "Datastreamer connects to dozens of high-volume data sources — including X, Reddit, forums, blogs, reviews, and news — and delivers them as clean, structured, real-time data feeds. Used by leading intelligence software companies, Datastreamer aggregates and normalises data from across the social web, giving ADXC users direct access to real-time conversations happening on the platforms where consumers are most active.",
        capabilities: [
            "Trend identification",
            "Brand sentiment analysis",
            "Cultural insight",
            "Consumer conversation analysis",
        ],
    },
]

export function DataProvidersList() {
    return (
        <FadeIn>
            <section>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">

                    <div className="space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary max-w-2xl leading-none">
                            Powered by best-in-class
                            <span className="block">intelligence partners</span>
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
                            ADXC combines world-leading consumer research, AI-driven market
                            intelligence, and real-time social data — so every insight is built
                            on trusted foundations.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {providers.map((provider) => (
                            <Card key={provider.name}>
                                <CardContent className="p-6 sm:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-12">

                                        {/* Left — logo + name + tagline */}
                                        <div className="space-y-4">
                                            <Image
                                                src={provider.logo}
                                                alt={provider.name}
                                                width={provider.logoWidth}
                                                height={provider.logoHeight}
                                                className="h-7 w-auto object-contain"
                                            />
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-foreground">{provider.name}</p>
                                                <p className="text-sm text-muted-foreground leading-snug">{provider.tagline}</p>
                                            </div>
                                        </div>

                                        {/* Right — description + capabilities */}
                                        <div className="space-y-4">
                                            <p className="text-sm text-foreground leading-relaxed">{provider.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {provider.capabilities.map((cap) => (
                                                    <Badge key={cap} variant="secondary">{cap}</Badge>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <p className="text-sm text-muted-foreground mt-8">
                        More data providers coming soon throughout 2026.
                    </p>

                </div>
            </section>
        </FadeIn>
    )
}