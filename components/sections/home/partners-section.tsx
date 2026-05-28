import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

const dataProviders = [
    { name: "YouGov", logo: "/yougov-logo-horizontal.png" },
    { name: "Reddit", logo: "/reddit-logo-horizontal.png" },
    { name: "X", logo: "/x-logo.jpg" }
]

const accessThrough = [
    { name: "Miro", logo: "/miro-logo.svg" },
]

export function PartnersSection() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center gap-8 sm:gap-0 sm:flex-row sm:justify-center sm:divide-x sm:divide-border">

                        {/* Access data from */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:pr-12">
                            <p className="text-caption text-muted-foreground shrink-0">
                                Access data from
                            </p>
                            <div className="flex items-center flex-wrap justify-center gap-6 sm:gap-8">
                                {dataProviders.map((p) => (
                                    <Image
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={80}
                                        height={28}
                                        className="h-6 sm:h-7 w-auto object-contain"
                                    />
                                ))}
                                <div className="text-sm text-muted-foreground">
                                    More coming soon
                                </div>
                            </div>
                        </div>

                        {/* Mobile divider */}
                        <div className="w-full max-w-xs h-px bg-border sm:hidden" />

                        {/* Access through */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:pl-12">
                            <p className="text-caption text-muted-foreground shrink-0">
                                Access through
                            </p>
                            <div className="flex items-center flex-wrap justify-center gap-6 sm:gap-8">
                                {accessThrough.map((p) => (
                                    <Image
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={80}
                                        height={28}
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