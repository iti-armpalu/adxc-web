import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { getAboutPage, getCardsOfferPage, getHome, getSiteSeo } from "@/lib/cms/queries";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { urlFor } from "@/lib/cms/image";
import { ContactCard } from "@/components/sections/contact-card";
import { PlatformSection } from "@/components/sections/home/platform";
import { YouTubeEmbed } from "@/components/sections/youtube-embed";
import { getYouTubeId } from "@/lib/youtube";
import { CardsOfferForm } from "@/components/sections/cards-offer-form";

// Title/description come from Sanity; this page is never indexed regardless.
export async function generateMetadata(): Promise<Metadata> {
    const [cardsOffer, siteSeo] = await Promise.all([getCardsOfferPage(), getSiteSeo()]);
    return {
        ...buildMetadata({ seo: cardsOffer?.seo, siteSeo, path: "/cards-offer" }),
        robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: { index: false, follow: false },
        },
    };
}

const LOGO_ROW = "flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-12"
const LOGO_LABEL = "text-base text-center text-primary shrink-0 max-w-xs"
const LOGOS = "flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10"

export default async function CardsOfferPage() {
    // "How it works" reuses the home page platform section and its Sanity content
    const [content, home, about] = await Promise.all([getCardsOfferPage(), getHome(), getAboutPage()]);

    if (!content) {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getCardsOfferPage() returned null — has the cards-offer document been created in Sanity Studio?"
            );
        }

        console.error("[CardsOfferPage] getCardsOfferPage() returned null in production");

        return (
            <section className="min-h-[60vh] flex items-center justify-center px-4">
                <p className="text-muted-foreground text-center">
                    We&apos;re having trouble loading this page. Please try again shortly.
                </p>
            </section>
        );
    }

    const demoVideoId = content.demoVideoUrl ? getYouTubeId(content.demoVideoUrl) : null;
    const contactFirstName = content.contactTeamMember.toLowerCase();
    const contact = about?.team?.find((p) => p.name.toLowerCase().startsWith(contactFirstName));

    return (
        <>
            <section className="relative w-full mt-header bg-background overflow-hidden">
                {/* Diagonal glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                        WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                    }}
                >
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
                        <h1 className="text-balance max-md:text-3xl max-md:leading-[1.1]">{content.heroHeadline}</h1>
                        <p className="mt-3 max-w-xl text-base text-foreground-alt md:mt-6 md:text-lg">{content.heroSubtext}</p>
                        <div className="mt-6 md:mt-8">
                            <ContactCard
                                name={contact?.name ?? content.contactTeamMember}
                                title={contact?.title}
                                email={content.contactEmail}
                                linkedin={contact?.linkedin}
                                photoUrl={contact?.photo ? urlFor(contact.photo).width(112).height(112).fit("crop").url() : undefined}
                                lead={content.contactLead}
                            />
                        </div>
                    </div>

                    {/* Form — id="claim" is the target of the repeat CTA button below */}
                    <div id="claim" className="bg-card border border-border rounded-lg p-5 sm:p-8 scroll-mt-24">
                        <CardsOfferForm ctaLabel={content.formButtonLabel} microcopy={content.formMicrocopy} />
                    </div>
                    </div>
                </div>
            </section>

            {/* Proof — providers + where ADXC is available. Both rows share one layout:
                stacked label over logos on mobile, label beside logos from lg. */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-8 flex flex-col gap-10 lg:gap-8">
                    <div className={LOGO_ROW}>
                        <p className={LOGO_LABEL}>{content.providersLabel}</p>
                        <div className={LOGOS}>
                            {content.providersLogos.map((p) => (
                                <img
                                    key={p.name}
                                    src={urlFor(p.logo).width(480).auto("format").url()}
                                    alt={p.name}
                                    className="h-5 sm:h-6 w-auto object-contain"
                                />
                            ))}
                            {/* Own line on mobile, inline with the logos from lg */}
                            {content.providersMoreText && (
                                <p className="basis-full text-center text-sm text-muted-foreground lg:basis-auto">
                                    {content.providersMoreText}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={LOGO_ROW}>
                        <p className={LOGO_LABEL}>{content.integrationsLabel}</p>
                        <div className={LOGOS}>
                            {content.integrationsLogos.map((p) => (
                                <img
                                    key={p.name}
                                    src={urlFor(p.logo).width(480).auto("format").url()}
                                    alt={p.name}
                                    className="h-6 sm:h-7 w-auto object-contain"
                                />
                            ))}
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

            {/* Demo video — hidden when no video URL is set in Sanity */}
            {demoVideoId && (
                <section className="bg-brand-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
                        <div className="space-y-4 mb-10">
                            {content.demoHeadline && <h2 className="text-primary">{content.demoHeadline}</h2>}
                            {content.demoSubtext && (
                                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                                    {content.demoSubtext}
                                </p>
                            )}
                        </div>
                        <YouTubeEmbed
                            videoId={demoVideoId}
                            title={content.demoHeadline ?? "Demo video"}
                            thumbnail={
                                content.demoThumbnail
                                    ? urlFor(content.demoThumbnail).width(1600).height(900).fit("crop").auto("format").url()
                                    : undefined
                            }
                        />
                    </div>
                </section>
            )}

            {/* Closing CTA — a plum panel inset on white, so it doesn't merge into the
                brand-700 footer below. Shown on all screen sizes. */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
                    <div className="rounded-xl bg-primary px-6 py-12 text-center md:py-16">
                        <div className="flex flex-col items-center gap-6">
                            <h2 className="text-primary-foreground text-balance">
                                {content.ctaHeadline}
                            </h2>
                            <Button asChild size="lg" className="h-12 rounded-xs px-6 text-base bg-white text-primary hover:bg-white/90">
                                <a href="#claim">{content.formButtonLabel}</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
