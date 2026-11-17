import { FadeIn } from "@/components/ui/fade-in"
import { urlFor } from "@/lib/cms/image"
import type { PartnerLogoContent } from "@/lib/cms/types"

interface AIPlatformsPartnersProps {
    label: string
    logos: PartnerLogoContent[]
    moreText?: string
}

export function AIPlatformsPartners({ label, logos, moreText }: AIPlatformsPartnersProps) {
    return (
        <FadeIn>
            <section className="bg-cyan-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <p className="text-base text-center text-cyan-950 shrink-0 max-w-xs">
                            {label}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            {logos.map((p) => (
                                <img
                                    key={p.name}
                                    src={urlFor(p.logo).width(600).auto("format").url()}
                                    alt={p.name}
                                    className="h-8 w-auto object-contain"
                                />
                            ))}
                            {moreText && (
                                <p className="text-sm text-cyan-950">{moreText}</p>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}
