import { MessageCircle, Search, Eye, CreditCard } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"

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
    <FadeIn>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

          <div className="space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary max-w-2xl">
              The ADXC platform
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
              Connect ADXC to your existing AI tools, starting with Miro Sidekick at launch.
              More integrations coming soon…
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => {
              return (
                <Card key={step.number} className="gap-0">
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-primary text-primary-foreground font-bold">
                        {step.number}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-medium text-primary leading-snug">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <CardDescription className="text-sm text-neutral-600 leading-relaxed">
                      {step.description}
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