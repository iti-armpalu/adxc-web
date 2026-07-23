import type { Metadata } from "next"
import { getPlatformPage, getSiteSeo } from "@/lib/cms/queries"
import { buildMetadata } from "@/lib/seo/build-metadata"
import { PlatformHero } from "@/components/sections/product/platform/hero"
import { PlatformOverview } from "@/components/sections/product/platform/overview"
import { PlatformHowItWorks } from "@/components/sections/product/platform/how-it-works"
import { PlatformDataProviders } from "@/components/sections/product/platform/data-providers"
import { PlatformPatent } from "@/components/sections/product/platform/patent"
import { PlatformAudiences } from "@/components/sections/product/platform/audiences"

export async function generateMetadata(): Promise<Metadata> {
    const [platform, siteSeo] = await Promise.all([getPlatformPage(), getSiteSeo()])
    return buildMetadata({ seo: platform?.seo, siteSeo, path: "/product/platform" })
}

export default async function PlatformPage() {
    const platform = await getPlatformPage()

    if (!platform) {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getPlatformPage() returned null — has the product-platform document been created in Sanity Studio?"
            )
        }

        console.error("[PlatformPage] getPlatformPage() returned null in production")

        return (
            <section className="min-h-[60vh] flex items-center justify-center px-4">
                <p className="text-muted-foreground text-center">
                    We're having trouble loading this page. Please try again shortly.
                </p>
            </section>
        )
    }

    return (
        <>
            <PlatformHero
                label={platform.heroLabel}
                headline={platform.heroHeadline}
                subtext={platform.heroSubtext}
            />
            <PlatformOverview />
            <PlatformHowItWorks
                headline={platform.howItWorksHeadline}
                subtext={platform.howItWorksSubtext}
                steps={platform.howItWorksSteps}
            />
            <PlatformPatent />
            <PlatformAudiences />
            <PlatformDataProviders />
        </>
    )
}