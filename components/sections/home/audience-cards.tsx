import { TrendingUp, Database, Users, Cpu, type LucideIcon } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"

const audiences: {
    icon: LucideIcon
    title: string
    description: string
    color: string
}[] = [
        {
            icon: TrendingUp,
            title: "For marketers and brands",
            description:
                "Access premium data for your strategies, briefs and campaigns, without enterprise subscriptions.",
            color: "var(--chart-1)"
        },
        {
            icon: Database,
            title: "For data providers",
            description:
                "Unlock a new SME market your enterprise model can't reach. Your data powers AI agents, you earn on every query.",
            color: "var(--chart-3)"
        },
        {
            icon: Users,
            title: "For agencies",
            description:
                "Give every client access to the data they need. Usage-based, so costs scale with your work. Earn for referrals.",
            color: "var(--chart-4)"
        },
        {
            icon: Cpu,
            title: "For AI platforms",
            description:
                "Make your agents smarter with premium data. One connection for multiple providers, better outputs, stronger retention.",
            color: "var(--chart-2)"
        },
    ]

export function AudienceCardsSection() {
    return (
        <FadeIn>
            <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 space-y-12">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary text-center">
                        Who it's for
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {audiences.map((audience) => {
                            const Icon = audience.icon
                            return (
                                <Card key={audience.title} className="gap-1">
                                    <CardHeader>
                                        <div className="flex flex-col items-center gap-3 text-center">
                                            <div
                                                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                                                style={{ backgroundColor: audience.color }}
                                            >
                                                <Icon className="w-8 h-8 text-neutral-50" strokeWidth={1.5} />
                                            </div>
                                            <CardTitle className="text-base font-semibold text-foreground">
                                                {audience.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-neutral-600 leading-relaxed text-center">
                                            {audience.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
        </FadeIn>
    )
}