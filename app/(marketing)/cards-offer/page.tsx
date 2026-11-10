import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getWebSummitContent, isExpired, safeRedirectPath } from "@/lib/cms/websummit";
import { getAboutPage, getHome } from "@/lib/cms/queries";
import { urlFor } from "@/lib/cms/image";
import { ContactCard } from "@/components/sections/contact-card";
import { PlatformSection } from "@/components/sections/home/platform";
import { YouTubeEmbed } from "@/components/sections/youtube-embed";
import { getYouTubeId } from "@/lib/youtube";
import { CardsOfferForm } from "@/components/sections/cards-offer-form";

export const metadata: Metadata = {
    title: "ADXC at Web Summit",
    description: "Sign up for free ADXC Beta tokens.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
    },
};

// `size` sets each logo's display height so they read at a similar optical size
const partners = [
    { name: "YouGov", logo: "/yougov-logo.svg", width: 136, height: 28, size: "h-5 sm:h-6" },
    { name: "Quid", logo: "/quid-logo.svg", width: 83, height: 24, size: "h-5 sm:h-6" },
    { name: "Serpstat", logo: "/serpstat-logo-1.svg", width: 222, height: 40, size: "h-5 sm:h-6" },
]

// Josh's Miro demo (any youtube.com or youtu.be URL works).
// The "See it in action" section is hidden when this is empty.
const DEMO_VIDEO_URL = "https://youtu.be/NKjQbPB7ya0";
const DEMO_THUMBNAIL = "/youtube-thumbnail-adxc-miro-demo.png";

// Contact alternative to the form. Name, title, photo and LinkedIn come from Josh's
// entry in the About page team (Sanity); the email isn't stored there.
const CONTACT_EMAIL = "josh@adxc.ai";

// Gemini is a large PNG (3840×867), so it goes through next/image to be resized;
// width/height ≈ 2× the 24px display height, at the file's real aspect ratio.
const integrations = [
    { name: "Miro", logo: "/miro-logo.svg", width: 703, height: 258, size: "h-6 sm:h-7" },
    { name: "Gemini", logo: "/gemini-logo.png", width: 213, height: 48, size: "h-5 sm:h-6", raster: true },
]

const LOGO_ROW = "flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-12"
const LOGO_LABEL = "text-base text-center text-primary shrink-0 max-w-xs"
const LOGOS = "flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10"

// No numeric credit amounts, claim deadline or beta-access date anymore — the offer is
// "free Beta tokens" everywhere. The tier/credits, endsAt (display) and betaAccessLabel
// fields still exist in the Sanity schema but aren't shown here.
export default async function CardsOfferPage() {
    // "How it works" reuses the home page platform section and its Sanity content
    const [content, home, about] = await Promise.all([getWebSummitContent(), getHome(), getAboutPage()]);

    if (isExpired(content)) redirect(safeRedirectPath(content.expiredRedirect));

    const headline = content.headline;
    const demoVideoId = getYouTubeId(DEMO_VIDEO_URL);
    const josh = about?.team?.find((p) => p.name.toLowerCase().startsWith("josh"));
    const microcopy = "No card needed.";

    return (
        <>
            <section className="relative w-full mt-header bg-background overflow-hidden">
                {/* Diagonal glow + grid */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                        WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                    }}
                >
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <div
                        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, var(--color-brand-200) 0%, transparent 70%)",
                            opacity: 0.4,
                        }}
                    />
                </div>
                {/* Hero + form — same container as the other heroes (early access, persona pages).
                    Phones stay compact so the form starts on the first screen; columns from lg. */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 lg:min-h-[calc(100dvh-var(--header-h))] lg:flex lg:items-center lg:py-16">
                    <div className="grid w-full gap-6 lg:grid-cols-2 lg:items-center lg:gap-16">
                    <div>
                        <h1 className="text-balance max-md:text-3xl max-md:leading-[1.1]">{headline}</h1>
                        <p className="mt-3 max-w-xl text-base text-foreground-alt md:mt-6 md:text-lg">{content.subhead}</p>
                        <div className="mt-6 md:mt-8">
                            <ContactCard
                                name={josh?.name ?? "Josh"}
                                title={josh?.title}
                                email={CONTACT_EMAIL}
                                linkedin={josh?.linkedin}
                                photoUrl={josh?.photo ? urlFor(josh.photo).width(112).height(112).fit("crop").url() : undefined}
                            />
                        </div>
                    </div>

                    {/* Form — id="claim" is the target of the repeat CTA button below */}
                    <div id="claim" className="bg-card border border-border rounded-lg p-5 sm:p-8 scroll-mt-24">
                        <CardsOfferForm ctaLabel={content.ctaLabel} microcopy={microcopy} />
                    </div>
                    </div>
                </div>
            </section>

            {/* Proof — providers + where ADXC is available. Both rows share one layout:
                stacked label over logos on mobile, label beside logos from lg. */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-8 flex flex-col gap-10 lg:gap-8">
                    <div className={LOGO_ROW}>
                        <p className={LOGO_LABEL}>Answers from providers you already trust</p>
                        <div className={LOGOS}>
                            {partners.map((p) => (
                                <img
                                    key={p.name}
                                    src={p.logo}
                                    alt={p.name}
                                    width={p.width}
                                    height={p.height}
                                    className={`${p.size} w-auto object-contain`}
                                />
                            ))}
                            {/* Own line on mobile, inline with the logos from lg */}
                            <p className="basis-full text-center text-sm text-muted-foreground lg:basis-auto">
                                More coming soon
                            </p>
                        </div>
                    </div>

                    <div className={LOGO_ROW}>
                        <p className={LOGO_LABEL}>Available in</p>
                        <div className={LOGOS}>
                            {integrations.map((p) =>
                                p.raster ? (
                                    <Image
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={p.width}
                                        height={p.height}
                                        className={`${p.size} w-auto object-contain`}
                                    />
                                ) : (
                                    <img
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={p.width}
                                        height={p.height}
                                        className={`${p.size} w-auto object-contain`}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works — same section and content as the home page */}
            {home && (
                <PlatformSection
                    headline={home.platformHeadline}
                    subtext={home.platformSubtext}
                    steps={home.platformSteps}
                />
            )}

            {/* Demo video — hidden until DEMO_VIDEO_URL is set */}
            {demoVideoId && (
                <section className="bg-brand-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
                        <div className="space-y-4 mb-10">
                            <h2 className="text-primary">See it in action</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                                Watch Josh use ADXC inside Miro.
                            </p>
                        </div>
                        <YouTubeEmbed videoId={demoVideoId} title="ADXC demo in Miro" thumbnail={DEMO_THUMBNAIL} />
                    </div>
                </section>
            )}

            {/* Closing CTA — a plum panel inset on white, so it doesn't merge into the
                brand-700 footer below. Shown on all screen sizes. */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
                    <div className="relative overflow-hidden rounded-xl bg-primary px-6 py-12 text-center md:py-16">
                        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                        <div className="relative flex flex-col items-center gap-6">
                            <h2 className="text-primary-foreground text-balance">
                                Free Beta tokens. No card needed.
                            </h2>
                            <Button asChild size="lg" className="h-12 rounded-xs px-6 text-base bg-white text-primary hover:bg-white/90">
                                <a href="#claim">{content.ctaLabel}</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}