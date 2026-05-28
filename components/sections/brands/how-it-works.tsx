import { Search, Coins, ShieldCheck, type LucideIcon } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { FeatureCard } from "@/components/global/feature-card"

type Feature = {
    icon: LucideIcon
    title: string
    lead: string
    description: string
}

const features: Feature[] = [
    {
        icon: Search,
        title: "Answer the questions your business depends on",
        lead: "Audience research, competitive intelligence, market sizing.",
        description: "Real answers to the questions that shape your strategy, your briefs, and your campaigns.",
    },
    {
        icon: Coins,
        title: "Only pay for the answers you use",
        lead: "No subscriptions or annual contracts.",
        description: "Spend $20 when you need an answer, not $200k in case you might.",
    },
    {
        icon: ShieldCheck,
        title: "Answers you can stand behind",
        lead: "ADXC pulls from premium, recognised data sources, like YouGov.",
        description: `So when someone asks "what's this based on?", you can answer confidently.`,
    },
]

export function BrandsHowItWorks() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="space-y-3 mb-16">
                        <h2 className="text-primary">
                            How ADXC works for you
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} {...feature} />
                        ))}
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}