import { FadeIn } from "@/components/ui/fade-in"

export function PlatformOverview() {
    return (
        <section className="bg-brand-50">
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="max-w-3xl mx-auto space-y-8">

                        <h2 className="text-primary">
                            Smart. Simple. Secure.
                        </h2>

                        <p className="text-lg text-foreground leading-relaxed">
                            ADXC connects AI agents to industry-leading consumer data sources. It understands
                            questions in context, orchestrates data retrieval across multiple sources, and
                            returns synthesised answers. All while keeping the underlying data fully protected.
                        </p>

                        <p className="text-sm font-medium text-foreground">
                            Patent-pending technology, built for the way AI agents work.
                        </p>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}