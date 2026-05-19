import Image from "next/image"
import { FadeIn } from "@/components/ui/fade-in"

const partners = [
    { name: "Miro", logo: "/miro-logo.svg" },
    { name: "DEPT", logo: "/dept-logo.svg" },
    { name: "YouGov", logo: "/yougov-logo-horizontal.png" },
]

export function BrandsPartners() {
    return (
        <FadeIn>
            <section className="bg-tyrian-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <div className="space-y-3 max-w-xl">
                            <p className="text-base text-center tracking-tight text-primary">
                                Partnering with the world's leading agencies,
                                <span className="block">data providers and AI platforms</span>
                            </p>
                        </div>



                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            {partners.map((p) => (
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