import type { Metadata } from "next"
import { getBrandsPage, getSiteSeo } from "@/lib/cms/queries"
import { buildMetadata } from "@/lib/seo/build-metadata"
import { BrandsHero } from "@/components/sections/brands/hero"
import { BrandsDataProviders } from "@/components/sections/brands/data-providers"
import { BrandsProblem } from "@/components/sections/brands/problem"
import { BrandsHowItWorks } from "@/components/sections/brands/how-it-works"
import { BrandsIntegrations } from "@/components/sections/brands/integrations"
import { BrandsPartners } from "@/components/sections/brands/partners"
import { BrandsCTA } from "@/components/sections/brands/cta"

export async function generateMetadata(): Promise<Metadata> {
    const [brands, siteSeo] = await Promise.all([getBrandsPage(), getSiteSeo()])
    return buildMetadata({ seo: brands?.seo, siteSeo, path: "/brands" })
}

export default async function BrandsPage() {
    const brands = await getBrandsPage()

    if (!brands) {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getBrandsPage() returned null — has the audience-brands document been created in Sanity Studio?"
            )
        }

        console.error("[BrandsPage] getBrandsPage() returned null in production")

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
            <BrandsHero
                label={brands.heroLabel}
                headline={brands.heroHeadline}
                subtext={brands.heroSubtext}
            />
            <BrandsDataProviders />
            <BrandsProblem />
            <BrandsHowItWorks
                headline={brands.howItWorksHeadline}
                features={brands.howItWorksFeatures}
            />
            <BrandsIntegrations />
            <BrandsCTA />
            <BrandsPartners />
        </>
    )
}