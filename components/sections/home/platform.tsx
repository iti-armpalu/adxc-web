import { MessageCircle, Search, Eye, CreditCard } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const steps = [
  {
    number: "1",
    icon: MessageCircle,
    title: "Ask a question",
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
    title: "See an abstract and price",
    description: "before you commit",
  },
  {
    number: "4",
    icon: CreditCard,
    title: "Approve and pay",
    description: "only for what you use",
  },
]

export function PlatformSection() {
  return (
    <section className="border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

        <div className="space-y-4 mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary max-w-2xl">
            The ADXC platform
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
            Connect ADXC to your existing AI tools, starting with Miro Sidekick at launch.
            More integrations coming soon…
          </p>
        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <Card key={step.number} className="bg-background border border-border shadow-md px-4 py-6 flex flex-col min-h-[200px] gap-0">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between mb-4">
                    {/* Small brand icon */}
                    <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-primary">
                      {step.number}
                    </div>
                    {/* Ghost step number */}
                    <span className="text-5xl font-bold tracking-tighter select-none leading-none text-primary opacity-15">
                      {step.number.padStart(2, "0")}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground leading-snug">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <CardDescription className="text-base text-foreground/60 leading-relaxed">
                    {step.description}
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