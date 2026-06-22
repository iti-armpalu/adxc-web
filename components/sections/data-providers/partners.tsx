import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

const partners = [
    { name: "YouGov", logo: "/yougov-logo-horizontal.png" },
    { name: "Data Commons", logo: "/data-comms-logo.svg", showName: true },
    { name: "Miro", logo: "/miro-logo.svg" },
    { name: "DEPT", logo: "/dept-logo.svg" },
]

export function DataProvidersPartners() {
    return (
        <FadeIn>
            <section className="bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <p className="text-base text-center text-blue-950 shrink-0 max-w-xs">
                            Join a network of leading data and technology partners
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            {partners.map((p) => (
                                <div key={p.name} className="flex items-center gap-2">
                                    <Image
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={100}
                                        height={36}
                                        className="h-4 sm:h-6 w-auto object-contain"
                                    />
                                    {p.showName && (
                                        <span style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 400, color: "#000000" }} className="text-sm">{p.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </FadeIn>
    )
}