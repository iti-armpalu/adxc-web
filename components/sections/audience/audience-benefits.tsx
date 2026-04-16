import type { AudienceConfig } from "@/config/audiences"

type Props = {
    config: AudienceConfig
}

export function AudienceBenefits({ config }: Props) {
    return (
        <section className="border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-12 divide-y sm:divide-y-0 divide-border/40">
                    {config.benefits.map((benefit, i) => (
                        <div
                            key={benefit.title}
                            className="space-y-4 py-10 sm:py-0 first:pt-0 last:pb-0"
                        >
                            {/* Number */}
                            <span className="text-4xl font-semibold tracking-tight text-foreground/10 select-none">
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
    )
}