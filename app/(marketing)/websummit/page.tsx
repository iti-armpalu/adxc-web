import type { Metadata } from "next";
import Script from "next/script";
import { redirect } from "next/navigation";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClaimForm } from "@/components/websummit/claim-form";
import { DemoVideo } from "@/components/websummit/demo-video";
import { StickyClaimBar } from "@/components/websummit/sticky-claim-bar";
import { getWebSummitContent, isExpired, resolveTier, safeRedirectPath } from "@/lib/cms/websummit";

export const metadata: Metadata = {
    title: "ADXC at Web Summit",
    description: "Claim your free ADXC research credits.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
    },
};

type Props = { searchParams: Promise<{ src?: string | string[] }> };

const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

const claimByFormat = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Lisbon",
});

export default async function WebSummitPage({ searchParams }: Props) {
    const [content, params] = await Promise.all([getWebSummitContent(), searchParams]);

    if (isExpired(content)) redirect(safeRedirectPath(content.expiredRedirect));

    const rawSrc = Array.isArray(params.src) ? params.src[0] : params.src;
    const tier = resolveTier(content, rawSrc);
    const credits = tier.credits.toLocaleString("en-GB");
    const headline = content.headline.replace("{credits}", credits);
    const claimBy = claimByFormat.format(new Date(content.endsAt));
    const microcopy = `No card needed. Beta access from ${content.betaAccessLabel}. Claim by ${claimBy}.`;

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
                <div className="relative z-10 mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_minmax(0,26rem)] min-h-[calc(100dvh-var(--header-h))] md:items-start md:gap-16 flex items-center py-16">
                    <div className="md:pt-8">
                        <h1 className="text-3xl leading-[1.1] text-balance md:text-4xl md:leading-none">{headline}</h1>
                        <p className="mt-3 max-w-xl text-base text-foreground-alt md:mt-6 md:text-lg">{content.subhead}</p>
                    </div>

                    <ClaimForm
                        src={rawSrc ?? ""}
                        ctaLabel={content.ctaLabel}
                        microcopy={microcopy}
                        betaAccessLabel={content.betaAccessLabel}
                        linkedinUrl={content.linkedinUrl}
                    />
                </div>
            </section>

            {/* How it works */}
            <section className="px-5 py-12 md:px-8 md:py-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl md:text-3xl">How it works</h2>
                    <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-10">
                        {content.steps.map((step, i) => (
                            <li key={step.title} className="flex gap-4 md:flex-col md:gap-4">
                                <span
                                    aria-hidden="true"
                                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-2 text-sm font-bold text-primary"
                                >
                                    {i + 1}
                                </span>
                                <div>
                                    <h3 className="text-lg leading-snug tracking-normal">{step.title}</h3>
                                    <p className="mt-1 text-foreground-alt">{step.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Proof */}
            <section className="border-t border-border px-5 py-12 md:px-8 md:py-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl md:text-3xl">Answers from providers you already trust</h2>
                    <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                        {content.partners.map((partner) => (
                            <li key={partner.name}>
                                {partner.logoUrl ? (
                                    <img src={partner.logoUrl} alt={partner.name} className="h-6 w-auto md:h-7" loading="lazy" />
                                ) : (
                                    <span className="text-lg font-bold text-muted-foreground">{partner.name}</span>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 max-w-3xl">
                        {content.videoUrl ? (
                            <DemoVideo src={content.videoUrl} poster={content.posterUrl} title="ADXC in Miro, a 30-second demo" />
                        ) : (
                            // TODO: placeholder until the V1 Miro demo is uploaded to Sanity
                            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-3 bg-muted">
                                <span className="flex size-12 items-center justify-center rounded-full bg-card shadow-sm">
                                    <Play aria-hidden="true" className="ml-0.5 size-5 text-primary" />
                                </span>
                                <p className="text-sm text-muted-foreground">Demo video coming soon</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Example answer */}
            <section className="border-t border-border px-5 py-12 md:px-8 md:py-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl md:text-3xl">What an answer looks like</h2>
                    <div className="bg-grid bg-grid-sm mt-8 rounded-lg px-4 py-8 md:px-12 md:py-14">
                        <article className="mx-auto max-w-lg rounded-lg border border-border bg-card p-5 shadow-md md:p-6">
                            <p className="text-sm text-muted-foreground">Question</p>
                            <p className="mt-1 text-lg font-medium text-card-foreground">{content.example.question}</p>

                            <div className="mt-5 flex items-center justify-between rounded-xs bg-muted px-3 py-2">
                                <span className="text-sm text-foreground-alt">Fixed price</span>
                                <span className="font-bold tabular-nums text-card-foreground">{content.example.price}</span>
                            </div>

                            <p className="mt-5 text-sm text-muted-foreground">Summary</p>
                            <p className="mt-1 text-foreground-alt">{content.example.abstract}</p>

                            {content.example.sources.length > 0 && (
                                <p className="mt-4 text-sm text-muted-foreground">Sources: {content.example.sources.join(", ")}</p>
                            )}

                            <div
                                aria-hidden="true"
                                className="mt-5 flex h-10 items-center justify-center rounded-xs bg-primary px-3 text-sm font-medium text-primary-foreground"
                            >
                                Approve {content.example.price} for the full answer
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Risk reversal */}
            <section className="px-5 py-12 md:px-8 md:py-20">
                <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
                    {content.riskPoints.map((point, i) => {
                        return (
                            <li key={point.title} className="flex gap-4">
                                <div>
                                    <p className="font-bold">{point.title}</p>
                                    <p className="mt-1 text-foreground-alt">{point.body}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* FAQ — native details/summary, no JS */}
            <section className="border-t border-border px-5 py-12 md:px-8 md:py-20">
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-2xl md:text-3xl">Questions</h2>
                    <div className="mt-6 divide-y divide-border border-y border-border">
                        {content.faq.map((item) => (
                            <details key={item.question} className="group">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xs py-4 font-medium focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                                    {item.question}
                                    <ChevronDown
                                        aria-hidden="true"
                                        className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
                                    />
                                </summary>
                                <p className="pb-4 text-foreground-alt">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Repeat CTA — desktop. Mobile uses the sticky bar. */}
            <section className="hidden border-t border-border px-8 py-16 md:block">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-8">
                    <p className="text-2xl font-bold">{credits} free credits. No card needed.</p>
                    <Button asChild size="lg" className="h-12 rounded-xs px-6 text-base">
                        <a href="#claim">{content.ctaLabel}</a>
                    </Button>
                </div>
            </section>

            <StickyClaimBar label={content.ctaLabel} />

            {/* HubSpot tracking on this page only: page views + hutk for form attribution */}
            {HUBSPOT_PORTAL_ID && (
                <Script id="hs-script-loader" src={`https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`} strategy="lazyOnload" />
            )}
        </>
    );
}