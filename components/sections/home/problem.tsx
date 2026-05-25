import { FadeIn } from "@/components/ui/fade-in";

export function ProblemSection() {
    return (
        <section
            style={{
                background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 80%)",
            }}
        >
            <FadeIn>
                <div className="max-w-3xl mx-auto px-12 sm:px-6 py-16 sm:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center text-primary-foreground md:divide-x md:divide-primary-foreground/20">

                        {/* Left — stat */}
                        <div className="flex flex-col space-y-6">
                            <div className="text-sm text-primary-foreground uppercase tracking-widest">
                                The problem
                            </div>
                            <div className="space-y-2 md:pr-12">
                                <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-none text-primary-foreground">
                                    $200k+
                                </h2>
                                <p className="text-base text-primary-foreground/70">
                                    Price for enterprise subscriptions to premium marketing data providers
                                </p>
                            </div>
                        </div>

                        {/* Mobile divider */}
                        <hr className="border-primary-foreground/20 md:hidden" />

                        {/* Right — copy */}
                        <div className="space-y-8 md:pl-12">
                            <p className="text-lg sm:text-xl text-primary-foreground/70 leading-snug">
                                99% of businesses can't afford the insight they need to make better
                                marketing decisions. This limits your growth.
                            </p>
                            <h4 className="font-bold leading-tight">
                                ADXC was built for the{" "}
                                <span>99%</span>
                                .
                            </h4>
                        </div>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}