import type { Metadata } from "next"
import { getDataSourcesPage, getSiteSeo } from "@/lib/cms/queries"
import { buildMetadata } from "@/lib/seo/build-metadata"
import { DataSourcesHero } from "@/components/sections/product/data-sources/hero"
import { DataProvidersList } from "@/components/sections/product/data-sources/providers-list"
import { MoreProviders } from "@/components/sections/product/data-sources/more-providers"
import { DataSourcesCTA } from "@/components/sections/product/data-sources/cta"
import { DataProvidersPartner } from "@/components/sections/product/data-sources/partner"

export async function generateMetadata(): Promise<Metadata> {
    const [dataSources, siteSeo] = await Promise.all([getDataSourcesPage(), getSiteSeo()])
    return buildMetadata({ seo: dataSources?.seo, siteSeo, path: "/product/data-sources" })
}

export default async function ProductDataProvidersPage() {
    const dataSources = await getDataSourcesPage()

    if (!dataSources) {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getDataSourcesPage() returned null — has the product-data-sources document been created in Sanity Studio?"
            )
        }

        console.error("[ProductDataProvidersPage] getDataSourcesPage() returned null in production")

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
            <DataSourcesHero
                headlineLine1={dataSources.heroHeadlineLine1}
                headlineLine2={dataSources.heroHeadlineLine2}
                headlineLine3={dataSources.heroHeadlineLine3}
                subtext={dataSources.heroSubtext}
            />
            <DataProvidersList
                headline={dataSources.providersHeadline}
                providers={dataSources.providers}
            />
            <MoreProviders />
            <DataSourcesCTA />
            <DataProvidersPartner />
        </>
    )
}