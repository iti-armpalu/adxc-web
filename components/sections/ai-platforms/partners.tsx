import { FadeIn } from "@/components/ui/fade-in"

const partners = [
    { name: "Miro", logo: "/miro-logo.svg", width: 703, height: 258 },
    { name: "Deptify", logo: "/deptify-logo.svg", width: 1273, height: 283 },
]

export function AIPlatformsPartners() {
    return (
        <FadeIn>
            <section className="bg-cyan-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <p className="text-base text-center text-cyan-950 shrink-0 max-w-xs">
                            Join leading AI platforms integrating ADXC
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            {partners.map((p) => (
                                <img
                                    key={p.name}
                                    src={p.logo}
                                    alt={p.name}
                                    width={p.width} height={p.height}
                                    className="h-8 w-auto object-contain"
                                />
                            ))}
                            <p className="text-sm text-cyan-950">More coming soon</p>
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}