import Image from "next/image"
import type { AudienceConfig } from "@/config/audiences"
import { FadeIn } from "@/components/ui/fade-in"

type Props = {
    config: AudienceConfig
}

export function AudienceSocialProof({ config }: Props) {
    if (!config.partners?.length) return null

    return (
        <FadeIn>
            <section className="border-y border-border/50 bg-muted/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">

                        {/* Left — partner note + logos (primary message) */}
                        <div className="space-y-8">
                            {config.partnerNote && (
                                <p className="text-2xl sm:text-3xl font-medium text-foreground leading-snug">
                                    {config.partnerNote}
                                </p>
                            )}
                            <div className="space-y-4">
                                {config.socialProofNote && (
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                        {config.socialProofNote}
                                    </p>
                                )}
                                <div className="flex items-center gap-10">
                                    {config.partners.map((partner) => (
                                        <Image
                                            key={partner.name}
                                            src={partner.logo}
                                            alt={partner.name}
                                            width={partner.width}
                                            height={partner.height}
                                            className="object-contain"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right — quote (supporting) */}
                        {config.quote && (
                            <div className="space-y-4 pt-2">
                                <span className="text-5xl font-serif text-border leading-none select-none">&ldquo;</span>
                                <blockquote className="text-base text-muted-foreground leading-relaxed -mt-2">
                                    {config.quote.text}
                                </blockquote>
                                <div className="space-y-0.5 pt-2">
                                    <p className="text-sm font-medium text-foreground">
                                        {config.quote.author}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {config.quote.role}
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}