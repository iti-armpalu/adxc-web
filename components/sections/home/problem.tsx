import { FadeIn } from "@/components/ui/fade-in";

export function ProblemSection() {
    return (
        <section
            style={{
                background: "linear-gradient(135deg, var(--color-brand-900) 0%, var(--color-brand-700) 80%)",
            }}
        >
            <FadeIn>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center text-primary-foreground md:divide-x md:divide-primary-foreground/20">

                        {/* Left — stat */}
                        <div className="flex flex-col space-y-6">
                            <p className="text-caption text-primary-foreground">
                                The problem
                            </p>
                            <div className="space-y-2 md:pr-12">
                                {/* text-5xl/6xl intentionally exceeds DS scale for hero stat impact */}
                                <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-none text-primary-foreground">
                                    $200k+
                                </h2>
                                <p className="text-base text-primary-foreground/70">
                                    Price for enterprise subscriptions to premium consumer data providers
                                </p>
                            </div>
                        </div>

                        {/* Mobile divider */}
                        <hr className="border-primary-foreground/20 md:hidden" />

                        {/* Right — copy */}
                        <div className="space-y-8 md:pl-12">
                            <p className="text-lg sm:text-xl text-primary-foreground">
                                99% of businesses can't afford the insight they need to make better
                                marketing decisions. This limits your growth.
                            </p>
                            <h4 className="text-primary-foreground">
                                ADXC was built for the 99%.
                            </h4>
                        </div>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}