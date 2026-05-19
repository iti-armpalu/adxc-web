import { FadeIn } from "@/components/ui/fade-in";

export function AIPlatformsCapabilities() {
    return (
        <FadeIn>
            <section className="border-t border-border/50 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                    What becomes possible
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
                                    Unlock new, differentiated capabilities for your AI agents.
                                </h2>
                            </div>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                Strategy. Research. Audience deep-dives. Competitive analysis. With ADXC,
                                your AI agents can answer the questions users actually come to your platform
                                to work through, backed by real consumer data.
                            </p>
                        </div>

                        {/* Visual placeholder */}
                        <div className="rounded-xl border border-border bg-muted h-80 flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">Visual TBC</p>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}