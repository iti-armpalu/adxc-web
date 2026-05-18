import type { Metadata } from "next"
import { DataProviderEnquiryForm } from "@/components/sections/data-providers/enquiry-form"
import { siteConfig } from "@/config/site"


export const metadata: Metadata = {
    title: `Connect your data to ${siteConfig.name}.`,
    description: "Get in touch to start unlocking a new market for your data through AI agents.",
    robots: { index: false },
}

type Props = {
    searchParams: Promise<{ email?: string }>
}

export default async function DataProviderEnquiryPage({ searchParams }: Props) {
    const { email } = await searchParams
    const prefillEmail = typeof email === "string" ? email : undefined

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                {/* Left — copy */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight">
                            Connect your data
                            <span className="block text-brand-bright">to ADXC</span>
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Get in touch to start unlocking a new market for your data through AI agents.
                        </p>
                    </div>
                </div>

                {/* Right — form */}
                <div className="bg-muted/30 border border-border/50 rounded-xl p-6 sm:p-8">
                    <DataProviderEnquiryForm prefillEmail={prefillEmail} />
                </div>

            </div>
        </div>
    )
}