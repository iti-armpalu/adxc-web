import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"
import { urlFor } from "@/lib/cms/image"
import type { PartnerLogoContent, SanityImage } from "@/lib/cms/types"

interface DataProvidersDistributionProps {
    headline: string
    subtext: string
    note?: string
    label: string
    logos: PartnerLogoContent[]
    statValue: string
    statLabel: string
    image: SanityImage
}

export function DataProvidersDistribution({
    headline,
    subtext,
    note,
    label,
    logos,
    statValue,
    statLabel,
    image,
}: DataProvidersDistributionProps) {
    return (
        <section className="bg-blue-50">
            <FadeIn>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                        {/* Left — copy */}
                        <div className="space-y-8">
                            <h2 className="text-blue-900">
                                {headline}
                            </h2>

                            <div className="space-y-4">
                                <p className="text-lg text-blue-950 font-medium leading-relaxed">
                                    {subtext}
                                </p>
                                {note && (
                                    <p className="text-sm text-blue-900 leading-relaxed">
                                        {note}
                                    </p>
                                )}
                            </div>

                            {/* Stats row */}
                            <div className="flex items-center gap-10 pt-2">
                                <div className="space-y-2">
                                    <p className="text-caption text-blue-700">{label}</p>
                                    <div className="flex items-center gap-6">
                                        {logos.map((l) => (
                                            <img
                                                key={l.name}
                                                src={urlFor(l.logo).width(600).auto("format").url()}
                                                alt={l.name}
                                                className="h-8 w-auto object-contain"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="border-l border-blue-200 pl-10 space-y-2">
                                    <p className="text-3xl font-semibold text-blue-900">{statValue}</p>
                                    <p className="text-caption text-blue-700">{statLabel}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right — canvas image */}
                        <div>
                            <Image
                                src={urlFor(image).width(1600).auto("format").url()}
                                alt={image.alt ?? ""}
                                width={1600}
                                height={900}
                                sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                                className="w-full rounded-lg object-cover shadow-lg"
                            />
                        </div>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}
