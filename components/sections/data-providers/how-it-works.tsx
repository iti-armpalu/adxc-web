import { FadeIn } from "@/components/ui/fade-in"
import { FeatureCard } from "@/components/global/feature-card"
import { iconMap } from "@/lib/cms/icon-map"
import type { AudienceFeature } from "@/lib/cms/types"

interface DataProvidersHowItWorksProps {
    headline: string
    features: AudienceFeature[]
}

export function DataProvidersHowItWorks({ headline, features }: DataProvidersHowItWorksProps) {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="space-y-3 mb-16">
                        <h2 className="text-primary">
                            {headline}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {features.map((feature) => (
                            <FeatureCard
                                key={feature.title}
                                icon={iconMap[feature.icon]}
                                title={feature.title}
                                lead={feature.lead}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}