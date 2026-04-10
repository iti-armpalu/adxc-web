import type { Metadata } from "next"
import { AISearch } from "@/components/sections/faq/ai-search"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "FAQs",
    description: `Frequently asked questions about ${siteConfig.name}.`,
}

const faqs = [
    {
        question: "What is ADXC?",
        answer:
            "ADXC is an agentic data exchange that connects your AI agents to premium marketing data sources. You ask a question, ADXC finds the data, and you pay only for what you use — no subscriptions, no contracts.",
    },
    {
        question: "How does pricing work?",
        answer:
            "ADXC uses a usage-based model. You see the price before you approve any query, so there are no surprises. There are no minimum commitments or upfront costs — you pay only for the data you actually use.",
    },
    {
        question: "What data providers does ADXC connect to?",
        answer:
            "ADXC currently connects to YouGov, Reddit, and X (Twitter), with more data providers coming soon. All data is normalised and enriched before it reaches you.",
    },
    {
        question: "Who is ADXC for?",
        answer:
            "ADXC is built for brands, agencies, data providers, and AI platforms. If you need marketing data without expensive enterprise subscriptions, ADXC was built for you.",
    },
    {
        question: "How do I get access?",
        answer:
            "ADXC is currently in early beta. Request access at adxc.ai/early-access — the team reviews applications and responds within 2 business days.",
    },
    {
        question: "Is there a minimum commitment?",
        answer:
            "No. There are no contracts, no minimum spend, and no lock-in. You pay only for what you use.",
    },
    {
        question: "How does ADXC work with AI agents?",
        answer:
            "ADXC connects directly to your AI agent ecosystem — tools like Miro Sidekick, Jasper AI, and Salesforce Einstein. Your agent asks a question, ADXC retrieves the data from premium sources, and returns a structured answer.",
    },
    {
        question: "Is ADXC suitable for agencies managing multiple clients?",
        answer:
            "Yes. ADXC is built for multi-client use — you manage data access across all your clients from a single platform with transparent, per-client billing.",
    },
]

export default function FAQPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">

            {/* Header */}
            <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    FAQs
                </p>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-4">
                    Common questions
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Can't find what you're looking for? Ask the AI assistant below.
                </p>
            </div>

            {/* AI search */}
            <div className="mb-16 p-6 rounded-2xl border border-border/50 bg-muted/20">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
                    Ask anything
                </p>
                <AISearch />
            </div>

            {/* Static FAQ list */}
            <div className="space-y-0 divide-y divide-border/50">
                {faqs.map((faq) => (
                    <details
                        key={faq.question}
                        className="group py-5 cursor-pointer list-none"
                    >
                        <summary className="flex items-center justify-between gap-4 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors list-none">
                            {faq.question}
                            <span className="shrink-0 w-5 h-5 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-transform group-open:rotate-45">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>
                        </summary>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed pr-8">
                            {faq.answer}
                        </p>
                    </details>
                ))}
            </div>

            {/* Still have questions */}
            <div className="mt-16 pt-8 border-t border-border/50 text-center space-y-3">
                <p className="text-sm text-muted-foreground">Still have questions?</p>
                <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-sm font-medium text-foreground hover:underline underline-offset-4 transition-colors"
                >
                    {siteConfig.contactEmail}
                </a>
            </div>

        </div>
    )
}