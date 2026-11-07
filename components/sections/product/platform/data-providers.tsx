import { FadeIn } from "@/components/ui/fade-in"
import { urlFor } from "@/lib/cms/image"
import type { PartnerLogoContent } from "@/lib/cms/types"

interface PlatformDataProvidersProps {
    label: string
    logos: PartnerLogoContent[]
    moreText?: string
}

export function PlatformDataProviders({ label, logos, moreText }: PlatformDataProvidersProps) {
    return (
        <FadeIn>
            <section className="bg-brand-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <p className="text-base text-center text-brand-950 shrink-0 max-w-xs">
                            {label}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            {logos.map((p) => (
                                <div key={p.name} className="flex items-center gap-2">
                                    <img
                                        src={urlFor(p.logo).width(400).auto("format").url()}
                                        alt={p.name}
                                        className="h-4 sm:h-6 w-auto object-contain"
                                    />
                                    {p.showName && (
                                        <span style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 400, color: "#000000" }} className="text-sm">{p.name}</span>
                                    )}
                                </div>
                            ))}
                            {moreText && (
                                <p className="text-sm text-muted-foreground">{moreText}</p>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}
