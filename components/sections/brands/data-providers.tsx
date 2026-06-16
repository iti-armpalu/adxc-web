import Image from "next/image"
import { FadeIn } from "@/components/ui/fade-in"

const dataProviders = [
    { name: "YouGov", logo: "/yougov-logo-horizontal.png" },
    { name: "Google Data Commons", logo: "/data-comms-logo.svg" },
]

export function BrandsDataProviders() {
    return (
        <FadeIn>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <p className="text-caption text-muted-foreground shrink-0">
                            Access data from
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            {dataProviders.map((p) => (
                                <Image
                                    key={p.name}
                                    src={p.logo}
                                    alt={p.name}
                                    width={100}
                                    height={36}
                                    className="h-7 sm:h-8 w-auto object-contain"
                                />
                            ))}
                            <p className="text-sm text-muted-foreground">More coming soon</p>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}