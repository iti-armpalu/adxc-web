import Image from "next/image"

const partners = [
    { name: "Miro", logo: "/miro-logo.png", width: 120, height: 40 },
    { name: "DEPT", logo: "/dept-logo.svg", width: 60, height: 20 },
]

export function SocialProofSection() {
    return (
        <section className="border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

                {/* Launch partners */}
                <div className="space-y-6 text-center">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Launch partners
                    </p>
                    <div className="flex items-center justify-center gap-12">
                        {partners.map((partner) => (
                            <Image
                                key={partner.name}
                                src={partner.logo}
                                alt={partner.name}
                                width={partner.width}
                                height={partner.height}
                                className="h-14 w-auto object-contain"
                            />
                        ))}
                    </div>
                </div>


            </div>
        </section>
    )
}