import type { Metadata } from "next"
import { ContactForm } from "@/components/sections/contact-form"
import { siteConfig } from "@/config/site"
import { FadeIn } from "@/components/ui/fade-in"

export const metadata: Metadata = {
    title: "Contact",
    description: `Get in touch with the ${siteConfig.name} team.`,
}

export default function ContactPage() {
    return (
        <section className="relative w-full mt-header bg-background overflow-hidden">

            {/* Diagonal glow + grid — right side only */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                    WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                }}
            >
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div
                    className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, var(--color-brand-200) 0%, transparent 70%)",
                        opacity: 0.4,
                    }}
                />
            </div>

            {/* Content */}
            <FadeIn>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(100dvh-var(--header-h))] flex items-center py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">

                        {/* Left — intro */}
                        <div className="flex flex-col justify-center space-y-6">
                            <div className="space-y-3">
                                <h1>Get in touch</h1>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Whether you're a brand, agency, data provider, or AI platform — we'd love
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
                        <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
                            <ContactForm />
                        </div>

                    </div>
                </div>
            </FadeIn>

        </section>
    )
}