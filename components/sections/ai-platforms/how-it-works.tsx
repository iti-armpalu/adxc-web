import { BarChart3, Brain, Layers, type LucideIcon } from "lucide-react"
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
        icon: BarChart3,
        title: "Dramatically better outputs",
        lead: "AI agents deliver materially better results when powered by trusted, premium consumer data.",
        description: "Users stay inside your workflows because the answers are actually useful.",
    },
    {
        icon: Brain,
        title: "Context-aware answers",
        lead: "ADXC reads what users are working on to tailor the data retrieval to that context.",
        description: "Users get answers specific to their work, not generic dumps. The right data, at the right moment, in the right format.",
    },
    {
        icon: Layers,
        title: "Product differentiation",
        lead: "Data can be a moat.",
        description: "Access to trusted consumer data creates differentiation vs blunt outputs from generic co-pilots.",
    },
]

export function AIPlatformsHowItWorks() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="space-y-3 mb-16">
                        <h2 className="text-primary">
                            How ADXC works for you
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            ADXC connects your platform to multiple premium consumer data providers via a single connection.
                        </p>
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