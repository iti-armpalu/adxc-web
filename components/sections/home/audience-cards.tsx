import { siteConfig } from "@/config/site"
import { FadeIn } from "@/components/ui/fade-in"
import { AudienceCard } from "@/components/global/audience-card"

const audiences = (siteConfig.nav.find((g) => g.label === "Why ADXC")?.items ?? [])

export function AudienceCardsSection() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 space-y-12 text-center">
                    <h2 className="text-primary">
                        Who it's for
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {audiences.map((audience) => (
                            <AudienceCard key={audience.href} item={audience} variant="default" />
                        ))}
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}