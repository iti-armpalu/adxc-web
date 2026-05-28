import { FadeIn } from "@/components/ui/fade-in"

export function AIPlatformsCapabilities() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

                        <div className="space-y-6">
                            <h2 className="text-cyan-800">
                                Unlock new, differentiated capabilities for your AI agents.
                            </h2>
                            <p className="text-lg text-cyan-950 leading-relaxed">
                                Strategy. Research. Audience deep-dives. Competitive analysis. With ADXC,
                                your AI agents can answer the questions users actually come to your platform
                                to work through, backed by real consumer data.
                            </p>
                        </div>

                        {/* Visual placeholder */}
                        <div className="rounded-lg border border-border bg-muted h-80 flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">Visual TBC</p>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}