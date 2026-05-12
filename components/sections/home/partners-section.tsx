import Image from "next/image"

const dataProviders = [
    { name: "YouGov", logo: "/yougov-logo.jpg" },
    { name: "Reddit", logo: "/reddit-logo.png" },
    { name: "X", logo: "/x-logo.jpg" },
    { name: "Quid", logo: "/quid-logo.svg" },
]

const accessThrough = [
    { name: "Miro", logo: "/miro-logo.png" },
]

export function PartnersSection() {
    return (
        <section className="border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:divide-x sm:divide-border/40 gap-6 sm:gap-0">

                    {/* Row 1 — Access data from */}
                    <div className="flex flex-col items-center sm:flex-row  gap-4 sm:gap-8 sm:pr-12">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">
                            Access data from
                        </p>
                        <div className="flex items-center gap-6 sm:gap-12 flex-wrap">
                            {dataProviders.map((p) => (
                                <Image
                                    key={p.name}
                                    src={p.logo}
                                    alt={p.name}
                                    width={80}
                                    height={28}
                                    className="h-7 w-auto object-contain"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Row 2 — Access through */}
                    <div className="flex flex-col items-center sm:flex-row  gap-4 sm:gap-8 sm:pl-12">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">
                            Access through
                        </p>
                        <div className="flex items-center gap-6 sm:gap-12 flex-wrap">
                            {accessThrough.map((p) => (
                                <Image
                                    key={p.name}
                                    src={p.logo}
                                    alt={p.name}
                                    width={80}
                                    height={28}
                                    className="h-10 w-auto object-contain"
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}