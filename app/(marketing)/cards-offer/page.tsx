import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getWebSummitContent, isExpired, safeRedirectPath } from "@/lib/cms/websummit";
import { getHome } from "@/lib/cms/queries";
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

const partners = [
    { name: "YouGov", logo: "/yougov-logo.svg", width: 136, height: 28 },
    { name: "Quid", logo: "/quid-logo.svg", width: 83, height: 24 },
    { name: "Serpstat", logo: "/serpstat-logo-1.svg", width: 222, height: 40 },
]

// Gemini is a large PNG (3840×867), so it goes through next/image to be resized;
// width/height ≈ 2× the 24px display height, at the file's real aspect ratio.
// Josh's Miro demo (any youtube.com or youtu.be URL works).
// The "See it in action" section is hidden when this is empty.
const DEMO_VIDEO_URL = "https://youtu.be/NKjQbPB7ya0";

const integrations = [
    { name: "Miro", logo: "/miro-logo.svg", width: 703, height: 258 },
    { name: "Gemini", logo: "/gemini-logo.png", width: 213, height: 48, raster: true },
]

// No numeric credit amounts, claim deadline or beta-access date anymore — the offer is
// "free Beta tokens" everywhere. The tier/credits, endsAt (display) and betaAccessLabel
// fields still exist in the Sanity schema but aren't shown here.
export default async function CardsOfferPage() {
    // "How it works" reuses the home page platform section and its Sanity content
    const [content, home] = await Promise.all([getWebSummitContent(), getHome()]);

    if (isExpired(content)) redirect(safeRedirectPath(content.expiredRedirect));

    const headline = content.headline;
    const demoVideoId = getYouTubeId(DEMO_VIDEO_URL);
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
                {/* </section> */}
                {/* Hero + form — must fit the first mobile screen */}
                {/* <section className="px-5 pb-12 pt-2 md:px-8 md:pb-20 md:pt-12"> */}
                {/* <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_minmax(0,26rem)] md:items-start md:gap-16"> */}
                <div className="relative z-10 mx-auto grid max-w-5xl gap-6 px-5 pt-8 pb-12 sm:px-6 md:px-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start lg:gap-16 lg:min-h-[calc(90dvh-var(--header-h))] lg:py-16">
                    <div className="lg:pt-8">
                        <h1 className="text-3xl leading-[1.1] text-balance md:text-4xl md:leading-none">{headline}</h1>
                        <p className="mt-3 max-w-xl text-base text-foreground-alt md:mt-6 md:text-lg">{content.subhead}</p>
                    </div>

                    {/* Form — id="claim" is the target of the repeat CTA button below */}
                    <div id="claim" className="bg-card border border-border rounded-lg p-5 sm:p-8 scroll-mt-24">
                        <CardsOfferForm ctaLabel={content.ctaLabel} microcopy={microcopy} />
                    </div>
                </div>
            </section>

            {/* Proof */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col items-center lg:flex-row sm:justify-center gap-12">

                        <p className="text-base text-center text-primary shrink-0 max-w-xs">
                            Answers from providers you already trust
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
                            {partners.map((p) => (
                                <div key={p.name} className="flex items-center gap-2">
                                    <img
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={p.width} height={p.height}
                                        className="h-4 sm:h-6 w-auto object-contain"
                                    />
                                </div>
                            ))}
                            <div className="text-sm text-muted-foreground">
                                More coming soon
                            </div>
                        </div>

                    </div>

                    {/* Available in */}
                    <div className="mt-8 flex flex-col items-center lg:flex-row sm:justify-center gap-6 lg:gap-12">
                        <p className="text-base text-center text-primary shrink-0 max-w-xs">
                            Available in
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            {integrations.map((p) =>
                                p.raster ? (
                                    <Image
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={p.width}
                                        height={p.height}
                                        className="h-4 sm:h-6 w-auto object-contain"
                                    />
                                ) : (
                                    <img
                                        key={p.name}
                                        src={p.logo}
                                        alt={p.name}
                                        width={p.width}
                                        height={p.height}
                                        className="h-4 sm:h-6 w-auto object-contain"
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
                        <YouTubeEmbed videoId={demoVideoId} title="ADXC demo in Miro" />
                    </div>
                </section>
            )}

            {/* Repeat CTA — desktop. Mobile uses the sticky bar. */}
            {/* <section className="hidden border-t border-border px-8 py-16 md:block"> */}
            <section className="hidden px-8 py-16 md:block bg-white">
                <div className="mx-auto flex max-w-2xl items-center justify-between gap-8">

                    <h2 className="text-primary">
                        Free Beta tokens. No card needed.
                    </h2>
                    <Button asChild size="lg" className="h-12 rounded-xs px-6 text-base">
                        <a href="#claim">{content.ctaLabel}</a>
                    </Button>
                </div>
            </section>
        </>
    );
}