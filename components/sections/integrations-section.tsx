import { FadeIn } from "@/components/ui/fade-in"
import { urlFor } from "@/lib/cms/image"
import type { PartnerLogoContent } from "@/lib/cms/types"

type IntegrationsSectionProps = {
    heading: string
    description: string
    accentBg: string        // e.g. "bg-purple-50"
    pillBg: string          // e.g. "bg-purple-100"
    captionColor: string    // e.g. "text-purple-700"
    textColor: string       // e.g. "text-purple-800"
    bodyColor: string       // e.g. "text-purple-950"
    // Optional so pages not yet on Sanity (Agencies) keep the original
    // hardcoded Miro pill. Remove the fallbacks once every page passes these.
    label?: string
    logos?: PartnerLogoContent[]
    moreText?: string
}

export function IntegrationsSection({
    heading,
    description,
    accentBg,
    pillBg,
    captionColor,
    textColor,
    bodyColor,
    label = "Launching with",
    logos,
    moreText = "More integrations coming soon",
}: IntegrationsSectionProps) {
    return (
        <section className={accentBg}>
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-4xl mx-auto">

                        {/* Left — text */}
                        <div className="space-y-4">
                            <h2 className={textColor}>{heading}</h2>
                            <p className={`text-lg leading-relaxed ${bodyColor}`}>{description}</p>
                        </div>

                        {/* Right — logo pill */}
                        <div className={`flex flex-col items-center justify-center gap-6 ${pillBg} rounded-lg p-12`}>
                            <p className={`text-caption ${captionColor}`}>{label}</p>
                            {logos ? (
                                logos.map((l) => (
                                    <img
                                        key={l.name}
                                        src={urlFor(l.logo).width(600).auto("format").url()}
                                        alt={l.name}
                                        className="h-16 w-auto object-contain"
                                    />
                                ))
                            ) : (
                                <img
                                    src="/miro-logo.svg"
                                    alt="Miro"
                                    width={703} height={258}
                                    className="h-16 w-auto object-contain"
                                />
                            )}
                            {moreText && (
                                <p className={`text-sm ${captionColor}`}>{moreText}</p>
                            )}
                        </div>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}