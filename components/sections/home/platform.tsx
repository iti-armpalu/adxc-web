import { MessageCircle, Search, Eye, CreditCard } from "lucide-react"

const steps = [
    {
        number: "1",
        icon: MessageCircle,
        title: "You ask a question",
        description: "through your AI agent",
    },
    {
        number: "2",
        icon: Search,
        title: "ADXC finds the data",
        description: "across multiple premium sources",
    },
    {
        number: "3",
        icon: Eye,
        title: "You see the answer and price",
        description: "before you commit",
    },
    {
        number: "4",
        icon: CreditCard,
        title: "You approve and pay",
        description: "only for what you use",
    },
]

export function PlatformSection() {
    return (
        <section className="border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

                {/* Header */}
                <div className="space-y-4 mb-16">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        How It Works
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground max-w-2xl">
                        The ADXC platform
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step) => {
                        const Icon = step.icon
                        return (
                            <div
                                key={step.number}
                                className="relative flex flex-col gap-8 p-8 rounded-2xl overflow-hidden min-h-[220px]"
                                style={{ backgroundColor: "#F7F4F6" }}
                            >
                                {/* Icon + Number on same row */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: "#8F1E56" }}
                                    >
                                        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                                    </div>
                                    <span
                                        className="text-6xl font-bold tracking-tighter select-none leading-none"
                                        style={{ color: "#C46184", opacity: 0.25 }}
                                    >
                                        {step.number.padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-2 mt-auto">
                                    <p className="text-base font-semibold text-foreground leading-snug">
                                        {step.title}
                                    </p>
                                    <p className="text-sm text-foreground/70 leading-relaxed">
                                        {step.description}
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