import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

const partners = [
    { name: "YouGov", logo: "/yougov-logo-horizontal.png" },
    { name: "Quid", logo: "/quid-logo.svg" },
]

export function DataProvidersDataProviders() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <p className="text-base text-center text-blue-950 shrink-0 max-w-xs">
                            Join leading providers on ADXC
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            {partners.map((p) => (
                                <div key={p.name} className="flex items-center gap-2">
                                    <Image
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={80}
                                        height={28}
                                        className="h-6 sm:h-7 w-auto object-contain"
                                    />
                                </div>
                            ))}
                            <div className="text-sm text-muted-foreground">
                                More coming soon
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}