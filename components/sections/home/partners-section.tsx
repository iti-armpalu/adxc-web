import { FadeIn } from "@/components/ui/fade-in"
import { urlFor } from "@/lib/cms/image"
import type { PartnerLogoContent } from "@/lib/cms/types"

interface PartnersSectionProps {
    dataLabel: string
    dataLogos: PartnerLogoContent[]
    moreText?: string
    accessLabel: string
    accessLogos: PartnerLogoContent[]
}

export function PartnersSection({ dataLabel, dataLogos, moreText, accessLabel, accessLogos }: PartnersSectionProps) {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col items-center gap-8 sm:gap-0 sm:flex-row sm:justify-center sm:divide-x sm:divide-border">

                        {/* Access data from */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:pr-12">
                            <p className="text-caption text-muted-foreground shrink-0">
                                {dataLabel}
                            </p>
                            <div className="flex items-center flex-wrap justify-center gap-6 sm:gap-8">
                                {dataLogos.map((p) => (
                                    <div key={p.name} className="flex items-center gap-2">
                                        <img
                                            src={urlFor(p.logo).width(400).auto("format").url()}
                                            alt={p.name}
                                            className="h-6 sm:h-7 w-auto object-contain"
                                        />
                                        {p.showName && (
                                            <span style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 400, color: "#000000" }} className="text-sm">{p.name}</span>
                                        )}
                                    </div>
                                ))}
                                {moreText && (
                                    <div className="text-sm text-muted-foreground">
                                        {moreText}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile divider */}
                        <div className="w-full max-w-xs h-px bg-border sm:hidden" />

                        {/* Access through */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:pl-12">
                            <p className="text-caption text-muted-foreground shrink-0">
                                {accessLabel}
                            </p>
                            <div className="flex items-center flex-wrap justify-center gap-6 sm:gap-8">
                                {accessLogos.map((p) => (
                                    <img
                                        key={p.name}
                                        src={urlFor(p.logo).width(400).auto("format").url()}
                                        alt={p.name}
                                        className="h-7 sm:h-8 w-auto object-contain"
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}