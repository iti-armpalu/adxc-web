import { Layers, Coins, SlidersHorizontal, type LucideIcon } from "lucide-react"
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
        icon: Layers,
        title: "Varied work. Varied clients. Varied data needs.",
        lead: "No two briefs ask the same question. ADXC gives your team access to the right data for each one, through your existing AI tools.",
        description: "Audience, category and competition, trends and more; the same data used by the world's largest brands, now available for every client.",
    },
    {
        icon: Coins,
        title: "Only pay for the data you need",
        lead: "Top up from as little as $50 and use it as briefs come in. No subscriptions, no annual commitments, no minimum spend per provider.",
        description: "Your data costs match the shape of your work: varied, project-based, and only when it matters.",
    },
    {
        icon: SlidersHorizontal,
        title: "Spend controls across your team",
        lead: "Set spend caps by client, project, or team.",
        description: "Track usage in real time. Bill back to client engagements with full transparency, no more buried data costs in agency overhead.",
    },
]

export function AgenciesHowItWorks() {
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
                            <FeatureCard
                                key={feature.title}
                                {...feature}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}