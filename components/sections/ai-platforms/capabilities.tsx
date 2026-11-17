import { FadeIn } from "@/components/ui/fade-in"

interface AIPlatformsCapabilitiesProps {
    headline: string
    subtext: string
}

export function AIPlatformsCapabilities({ headline, subtext }: AIPlatformsCapabilitiesProps) {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

                        <div className="space-y-6">
                            <h2 className="text-cyan-800">
                                {headline}
                            </h2>
                            <p className="text-lg text-cyan-950 leading-relaxed">
                                {subtext}
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}