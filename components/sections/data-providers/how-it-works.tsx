import { Workflow, Banknote, ShieldCheck, type LucideIcon } from "lucide-react"
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
        icon: Workflow,
        title: "Be where the strategic work happens",
        lead: "Marketers are planning, creating and deciding inside workflow tools.",
        description: "ADXC integrates your data directly into the tools they're already using, starting with Miro.",
    },
    {
        icon: Banknote,
        title: "New revenue from a market you can't currently serve",
        lead: "SMEs need your data but can't afford your subscriptions.",
        description: "ADXC gives them access on a pay-per-query basis, a completely new buyer with a different need.",
    },
    {
        icon: ShieldCheck,
        title: "Your IP and brand stay fully protected.",
        lead: "Datasets are never copied, stored, or exposed.",
        description: "ADXC queries your data via API or MCP and returns only synthesised answers. End users never see your raw data. Your brand is attributed to every answer delivered.",
    },
]

export function DataProvidersHowItWorks() {
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