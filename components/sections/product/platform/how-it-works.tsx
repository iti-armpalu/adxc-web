import { Brain, Zap, Lock, type LucideIcon } from "lucide-react"
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
        icon: Brain,
        title: "Understands questions in their full context",
        lead: "When a user asks a question through their AI agent, ADXC reads the work surrounding it too.",
        description: "The brief, the audience, the brand, whatever's in the workflow. This enables ADXC to find the specific, relevant data to the question at hand.",
    },
    {
        icon: Zap,
        title: "One connection. Every data source.",
        lead: "One connection via API/MCP gives your AI agents access to every data source ADXC supports.",
        description: "ADXC takes a single question, breaks it down into subqueries to help find the most relevant data, and returns a single answer. Natural language in, synthesised answer out.",
    },
    {
        icon: Lock,
        title: "Data that never leaves the provider's control",
        lead: "Data providers' raw datasets are never copied, stored, or exposed to end users.",
        description: "ADXC retrieves only what's needed to answer each specific question, and returns synthesised answers, keeping the underlying data fully within the provider's control.",
    },
]

export function PlatformHowItWorks() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="space-y-3 mb-16">
                        <h2 className="text-primary">
                            How ADXC works
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            A single connection that understands context, routes across providers, and returns synthesised answers.
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