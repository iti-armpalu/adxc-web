import { TrendingUp, Database, Users, Cpu, type LucideIcon } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"

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
                            <Card key={audience.title} className="bg-neutral-200 border-0 shadow-md px-4 py-6">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 bg-neutral-700">
                                            <Icon className="w-5 h-5 text-neutral-50" strokeWidth={1.5} />
                                        </div>
                                        <CardTitle className="text-base font-semibold text-foreground">
                                            {audience.title}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-foreground/70 leading-relaxed">
                                        {audience.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}