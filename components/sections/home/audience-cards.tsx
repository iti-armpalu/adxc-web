import Link from "next/link"
import { ArrowRight, Database, TrendingUp, Cpu, Users } from "lucide-react"
import { type LucideIcon } from "lucide-react"

const audiences: {
    icon: LucideIcon
    title: string
    description: string
    href: string
}[] = [
        {
            icon: Database,
            title: "For data providers",
            description:
                "Connect to ADXC to monetise your data with pay-per-use access for SMEs, without exposing raw datasets.",
            href: "/for/data-providers",
        },
        {
            icon: TrendingUp,
            title: "For brands",
            description:
                "Connect ADXC to get decision-grade market and consumer insights on demand, without expensive annual licences.",
            href: "/for/brands",
        },
        {
            icon: Cpu,
            title: "For AI platforms",
            description:
                "Add ADXC to your marketplace to deliver dramatically better outcomes inside your workflows.",
            href: "/for/ai-platforms",
        },
        {
            icon: Users,
            title: "For agencies",
            description:
                "Monetise your clients' marketing data usage, and cut your own data budget in half.",
            href: "/for/agencies",
        },
    ]

export function AudienceCardsSection() {
    return (
        <section className="border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-12">
                    Explore how ADXC works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {audiences.map((audience) => {
                        const Icon = audience.icon
                        return (
                            <Link
                                key={audience.href}
                                href={audience.href}
                                className="group flex flex-col gap-6 p-6 rounded-2xl border border-border/50 hover:border-border hover:bg-muted/30 transition-all duration-200"
                            >
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
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

                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                    Explore
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}