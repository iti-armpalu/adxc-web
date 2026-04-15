import Image from "next/image"
import type { AudienceConfig } from "@/config/audiences"

type Props = {
    config: AudienceConfig
}

export function AudienceSocialProof({ config }: Props) {
    if (!config.partners?.length) return null

    return (
        <section className="border-y border-border/50 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left — quote */}
                    <div className="space-y-8">
                        {config.quote ? (
                            <>
                                <blockquote className="text-2xl sm:text-3xl font-medium text-foreground leading-snug">
                                    "{config.quote.text}"
                                </blockquote>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-foreground">
                                        {config.quote.author}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {config.quote.role}
                                    </p>
                                </div>
                            </>
                        ) : config.partnerNote ? (
                            <p className="text-2xl sm:text-3xl font-medium text-foreground leading-snug">
                                {config.partnerNote}
                            </p>
                        ) : null}
                    </div>

                    {/* Right — partners */}
                    <div className="space-y-8">
                        {config.partnerNote && config.quote && (
                            <p className="text-lg text-muted-foreground leading-relaxed">
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
                                    <div
                                        key={partner.name}
                                        className="opacity-80 hover:opacity-100 transition-opacity"
                                    >
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            width={partner.width}
                                            height={partner.height}
                                            className="object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}