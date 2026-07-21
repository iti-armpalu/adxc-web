import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"
import Image from "next/image"
import { urlFor } from "@/lib/cms/image"
import type { PlatformStep } from "@/lib/cms/types"

interface PlatformSectionProps {
  headline: string
  subtext: string
  steps: PlatformStep[]
}

export function PlatformSection({ headline, subtext, steps }: PlatformSectionProps) {
  return (
    <FadeIn>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">

          <div className="space-y-4 mb-16">
            <h2 className="text-primary">
              {headline}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              {subtext}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <Card key={step.title} className="gap-0 overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="w-8 h-8 rounded-xs flex items-center justify-center shrink-0 bg-primary text-primary-foreground text-sm font-medium mb-4">
                    {index + 1}
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
                      src={
                        typeof step.image === "string"
                          ? step.image
                          : urlFor(step.image).width(800).auto("format").url()
                      }
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