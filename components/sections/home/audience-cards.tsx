import Link from "next/link"
import { ArrowRight, Database, TrendingUp, Cpu, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type LucideIcon } from "lucide-react"

const audiences: {
    icon: LucideIcon
    title: string
    description: string
}[] = [
        {
            icon: Database,
            title: "For data providers",
            description:
                "Connect to ADXC to monetise your data with pay-per-use access for SMEs, without exposing raw datasets.",
        },
        {
            icon: TrendingUp,
            title: "For brands",
            description:
                "Connect ADXC to get decision-grade market and consumer insights on demand, without expensive annual licences.",
        },
        {
            icon: Cpu,
            title: "For AI platforms",
            description:
                "Add ADXC to your marketplace to deliver dramatically better outcomes inside your workflows.",
        },
        {
            icon: Users,
            title: "For agencies",
            description:
                "Monetise your clients' marketing data usage, and cut your own data budget in half.",
        },
    ]

export function AudienceCardsSection() {
    return (
        <section className="border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 space-y-12">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                    Built for every part of the ecosystem
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {audiences.map((audience) => {
                        const Icon = audience.icon
                        return (
                            <div
                                key={audience.title}
                                className="flex flex-col gap-6 p-6 rounded-2xl border border-border/50"
                            >
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                                    <Icon className="w-5 h-5" />
                                </div>

                                <div className="flex-1 space-y-2">
                                    <h3 className="text-base font-medium text-foreground">
                                        {audience.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {audience.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        Interested in how ADXC can work for you?
                    </p>
                    <Button asChild variant="outline" size="sm" className="group shrink-0">
                        <Link href="/contact">
                            Get in touch
                            <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </Button>
                </div>

            </div>
        </section>
    )
}