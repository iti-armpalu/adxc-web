import { FadeIn } from "@/components/ui/fade-in";

export function DataProvidersStat() {
    return (
        <FadeIn>
            <section className="bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">

                        {/* Left — stat */}
                        <div className="space-y-1">
                            <p className="text-7xl sm:text-8xl font-semibold tracking-tight text-blue-900 leading-none">
                                &gt;99%
                            </p>
                            <div className="mt-2 text-sm font-medium text-blue-950 md:text-base">of businesses are SMEs</div>
                        </div>

                        {/* Right — explainer */}
                        <div className="space-y-3">
                            <p className="text-lg text-blue-950 leading-relaxed font-medium">
                                They can't justify enterprise subscriptions, but they still need
                                your data.
                            </p>
                            <p className="text-base text-blue-950 leading-relaxed">
                                Until now, there was no viable way to serve them.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}