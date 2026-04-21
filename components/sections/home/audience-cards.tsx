import { TrendingUp, Database, Users, Cpu } from "lucide-react"
import { type LucideIcon } from "lucide-react"

const audiences: {
    icon: LucideIcon
    title: string
    description: string
}[] = [
        {
            icon: TrendingUp,
            title: "For marketers and brands",
            description:
                "Access premium data for your strategies, briefs and campaigns, without enterprise subscriptions.",
        },
        {
            icon: Database,
            title: "For data providers",
            description:
                "Unlock a new SME market your enterprise model can't reach. Your data powers AI agents, you earn on every query.",
        },
        {
            icon: Users,
            title: "For agencies",
            description:
                "Give every client access to the data they need. Usage-based, so costs scale with your work. Earn for referrals.",
        },
        {
            icon: Cpu,
            title: "For AI platforms",
            description:
                "Make your agents smarter with premium data. One connection for multiple providers, better outputs, stronger retention.",
        },
    ]

export function AudienceCardsSection() {
    return (
        <section className="border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 space-y-12">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                    Who it's for
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {audiences.map((audience) => {
                        const Icon = audience.icon
                        return (
                            <div
                                key={audience.title}
                                className="flex flex-col gap-6 p-8 rounded-2xl"
                                style={{ backgroundColor: "#D8C9D2" }}
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: "#66023C" }}
                                >
                                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                                </div>

                                <div className="flex-1 space-y-2">
                                    <h3 className="text-base font-semibold text-foreground">
                                        {audience.title}
                                    </h3>
                                    <p className="text-sm text-foreground/70 leading-relaxed">
                                        {audience.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}