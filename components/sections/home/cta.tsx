import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/config/site"

export function HomeCTASection() {
    return (
        <section className="border-t border-border/50 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center space-y-8">
                <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                        Ready to access better data?
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Join the brands, agencies, and AI platforms already on the waitlist.
                        No contracts, no minimums — pay only for what you use.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button asChild size="lg" className="group">
                        <Link href={siteConfig.cta.href}>
                            {siteConfig.cta.label}
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/contact">Talk to us</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}