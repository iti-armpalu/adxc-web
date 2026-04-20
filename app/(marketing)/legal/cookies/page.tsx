import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Cookie Policy",
    description: `How ${siteConfig.name} uses cookies and similar technologies.`,
}

const LAST_UPDATED = "April 2025"

export default function CookiePolicyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">

            <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Legal</p>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-3">
                    Cookie Policy
                </h1>
                <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
            </div>

            <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed">

                <section className="space-y-3">
                    <h2 className="text-base font-medium text-foreground">What are cookies?</h2>
                    <p className="text-muted-foreground">
                        Cookies are small text files placed on your device when you visit a website.
                        They are widely used to make websites work, improve efficiency, and provide
                        information to site owners.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-base font-medium text-foreground">How we use cookies</h2>
                    <p className="text-muted-foreground">
                        {siteConfig.name} uses cookies in the following categories:
                    </p>

                    <div className="space-y-4 pt-1">
                        <CookieCategory
                            name="Essential"
                            required
                            description="These cookies are necessary for the website to function and cannot be switched off. They are set in response to actions you take, such as setting your cookie preferences."
                            examples={[
                                { name: "cookie_consent", purpose: "Stores your cookie consent preferences", duration: "12 months" },
                            ]}
                        />
                        <CookieCategory
                            name="Analytics"
                            description="These cookies help us understand how visitors interact with the website. All data is aggregated and anonymous."
                            examples={[
                                { name: "Analytics provider", purpose: "Page views, session duration, referral source", duration: "Up to 2 years" },
                            ]}
                        />
                        <CookieCategory
                            name="Marketing"
                            description="These cookies may be set to measure the effectiveness of marketing campaigns and deliver relevant content."
                            examples={[
                                { name: "Campaign tracking", purpose: "Attribution of traffic to marketing campaigns", duration: "Up to 90 days" },
                            ]}
                        />
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-base font-medium text-foreground">Your choices</h2>
                    <p className="text-muted-foreground">
                        When you first visit {siteConfig.name}, you will be asked to accept or decline
                        non-essential cookies. You can change your preferences at any time by clearing
                        your browser's local storage for this site, which will re-display the consent
                        banner on your next visit.
                    </p>
                    <p className="text-muted-foreground">
                        You can also control cookies through your browser settings. Note that disabling
                        certain cookies may affect the functionality of the site.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-base font-medium text-foreground">Third-party cookies</h2>
                    <p className="text-muted-foreground">
                        We use Cloudflare Turnstile to protect our forms from spam. Turnstile may set
                        cookies or use browser storage to assess whether a submission is from a human.
                        Cloudflare's privacy policy applies to these interactions.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-base font-medium text-foreground">Contact</h2>
                    <p className="text-muted-foreground">
                        If you have questions about our use of cookies, please contact us at{" "}
                        <a
                            href={`mailto:${siteConfig.contactEmail}`}
                            className="text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
                        >
                            {siteConfig.contactEmail}
                        </a>
                        .
                    </p>
                </section>

            </div>
        </div>
    )
}

type CookieCategoryProps = {
    name: string
    description: string
    required?: boolean
    examples: { name: string; purpose: string; duration: string }[]
}

function CookieCategory({ name, description, required, examples }: CookieCategoryProps) {
    return (
        <div className="border border-border/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{name}</p>
                {required && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        Always active
                    </span>
                )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            <div className="pt-1 space-y-2">
                {examples.map((ex) => (
                    <div key={ex.name} className="grid grid-cols-3 gap-2 text-xs">
                        <span className="text-foreground font-medium truncate">{ex.name}</span>
                        <span className="text-muted-foreground col-span-1">{ex.purpose}</span>
                        <span className="text-muted-foreground text-right">{ex.duration}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}