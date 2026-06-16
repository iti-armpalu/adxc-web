import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"

const steps = [
  {
    number: "1",
    title: "Ask a question",
    description: "through your AI agent. We understand the context of your Miro board.",
    image: "/adxc-how-1.png",
  },
  {
    number: "2",
    title: "ADXC finds the data",
    description: "across multiple premium sources, for your specific question.",
    image: "/adxc-how-2.png",
  },
  {
    number: "3",
    title: "See an abstract and price",
    description: "before you commit",
    image: "/adxc-how-3.png",
  },
  {
    number: "4",
    title: "Approve and pay",
    description: "only for what you use",
    image: "/adxc-how-4.png",
  },
]

export function PlatformSection() {
  return (
    <FadeIn>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

          <div className="space-y-4 mb-16">
            <h2 className="text-primary">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Connect ADXC to your existing AI tools, starting with Miro Sidekick at launch.
              More integrations coming soon…
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <Card key={step.number} className="gap-0 overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="w-8 h-8 rounded-xs flex items-center justify-center shrink-0 bg-primary text-primary-foreground text-sm font-medium mb-4">
                    {step.number}
                  </div>
                  <CardTitle className="text-lg text-primary">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-1">
                  <CardDescription>
                    {step.description}
                  </CardDescription>
                </CardContent>
                <div className="px-4 pt-6 mt-auto">
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </FadeIn>
  )
}