import type { Metadata } from "next"
import { EarlyAccessForm } from "@/components/sections/early-access-form"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Get Early Access",
    description: `Sign up for early beta access to ${siteConfig.name}.`,
    robots: { index: false },
}

type Props = {
    searchParams: Promise<{ email?: string }>
}

export default async function EarlyAccessPage({ searchParams }: Props) {
    const { email } = await searchParams
    const prefillEmail = typeof email === "string" ? email : undefined

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                {/* Left — copy */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight">
                            Get early access
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Selected users get $200 in free credits to spend on real marketing data. Beta launches in May, inside Miro.
                        </p>
                    </div>
                </div>

                {/* Right — form */}
                <div className="bg-muted/30 border border-border/50 rounded-xl p-6 sm:p-8">
                    <EarlyAccessForm prefillEmail={prefillEmail} />
                </div>

            </div>
        </div>
    )
}