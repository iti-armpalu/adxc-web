import Image from "next/image"
import { FadeIn } from "@/components/ui/fade-in"

const providers = [
    { name: "YouGov", logo: "/yougov-logo-horizontal.png" },
    { name: "Quid", logo: "/quid-logo.svg" },
    { name: "Datastreamer", logo: "/datastreamer-logo.webp" },
]

export function PlatformDataProviders() {
    return (
        <FadeIn>
            <section className="bg-tyrian-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <div className="space-y-3 max-w-xl">
                            <p className="text-base text-center tracking-tight text-primary">
                                Connected to industry
                                <span className="block">leading data providers</span>
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            {providers.map((p) => (
                                <Image
                                    key={p.name}
                                    src={p.logo}
                                    alt={p.name}
                                    width={100}
                                    height={36}
                                    className="h-4 sm:h-6 w-auto object-contain"
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}
