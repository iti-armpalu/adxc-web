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
        description: "YouGov is used by the world's largest brands and agencies. Profiles is their syndicated audience and brand dataset, built from their panel of 30+ million registered members across 55 markets. It is a continuously-updated dataset covering millions of consumer datapoints across attitudes, behaviours, demographics, media consumption, and brand affinities.",
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
            "Quid analyses billions of indexed sources — social media, news, forums, reviews, and more — using AI to find the themes and sentiment shaping a category. It surfaces the patterns, narratives, and emerging trends behind the conversation, giving ADXC users a synthesised read on how consumers and markets are moving.",
        capabilities: [
            "Trend identification",
            "Brand sentiment analysis",
            "Cultural insight",
            "Consumer conversation analysis",
        ],
    },
    {
        name: "Google Data Commons",
        logo: "/data-comms-logo.svg",
        logoWidth: 120,
        logoHeight: 40,
        tagline: "The world's public statistics, unified into one trusted source.",
        description: "Google Data Commons unifies thousands of public datasets — from the US Census Bureau, the UN, the World Bank, the CDC, and more — into a single, standardised resource. It covers population, demographics, economic indicators, and other macro-level statistics, drawn from government and institutional sources.",
        capabilities: [
            "Population data",
            "Demographic trends",
            "Economic indicators",
            "Government statistics",
            "Macro-level benchmarks",
        ],
    }
]

export function DataProvidersList() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24">

                    <div className="space-y-3 mb-16">
                        <h2 className="text-primary">
                            Connected data providers
                        </h2>
                    </div>

                    <div className="space-y-6">
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

                </div>
            </section>
        </FadeIn>
    )
}