import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

type IntegrationsSectionProps = {
    heading: string
    description: string
    accentBg: string        // e.g. "bg-purple-50"
    pillBg: string          // e.g. "bg-purple-100"
    captionColor: string    // e.g. "text-purple-700"
    textColor: string       // e.g. "text-purple-800"
    bodyColor: string       // e.g. "text-purple-950"
}

export function IntegrationsSection({
    heading,
    description,
    accentBg,
    pillBg,
    captionColor,
    textColor,
    bodyColor,
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
                            <p className={`text-caption ${captionColor}`}>Launching with</p>
                            <Image
                                src="/miro-logo.svg"
                                alt="Miro"
                                width={200}
                                height={64}
                                className="h-16 w-auto object-contain"
                            />
                            <p className={`text-sm ${captionColor}`}>More integrations coming soon</p>
                        </div>

                    </div>
                </div>
            </FadeIn>
        </section>
    )
}