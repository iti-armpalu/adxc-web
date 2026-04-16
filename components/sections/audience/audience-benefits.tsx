import { FadeIn } from "@/components/ui/fade-in"
import type { AudienceConfig } from "@/config/audiences"

type Props = {
    config: AudienceConfig
}

export function AudienceBenefits({ config }: Props) {
    return (
        <FadeIn>
            <section className="border-y border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

                    <div className="grid grid-cols-1 sm:grid-cols-3">
                        {config.benefits.map((benefit, i) => (
                            <div
                                key={benefit.title}
                                className="px-8 py-10 space-y-6 first:pl-0 last:pr-0"
                            >
                                {/* Number */}
                                <span className="text-5xl font-semibold tracking-tight text-foreground/10 select-none">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <div className="space-y-3">
                                    <h2 className="text-base font-medium text-foreground leading-snug">
                                        {benefit.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}