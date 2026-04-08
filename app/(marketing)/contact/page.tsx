import type { Metadata } from "next"
import { ContactForm } from "@/components/sections/contact-form"
import { siteConfig } from "@/config/site"


export const metadata: Metadata = {
    title: "Contact",
    description: `Get in touch with the ${siteConfig.name} team.`,
}

export default function ContactPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Left — intro */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                            Contact
                        </p>
                        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
                            Get in touch
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Whether you're a brand, data provider, or AI platform — we'd love
                        to hear from you.
                    </p>
                    <div className="pt-4 space-y-2">
                        <p className="text-sm text-muted-foreground">Or email us directly</p>
                        <a
                            href={`mailto:${siteConfig.contactEmail}`}
                            className="text-sm text-foreground hover:underline underline-offset-4 transition-colors"
                        >
                            {siteConfig.contactEmail}
                        </a>
                    </div>
                </div>

                {/* Right — form */}
                <div className="bg-muted/30 border border-border/50 rounded-xl p-6 sm:p-8">
                    <ContactForm />
                </div>

            </div>
        </div>
    )
}