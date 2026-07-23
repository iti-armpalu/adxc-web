import type { Metadata } from "next"
import { getDataProvidersPage, getSiteSeo } from "@/lib/cms/queries"
import { buildMetadata } from "@/lib/seo/build-metadata"
import DataProvidersPageClient from "./page-client"

export async function generateMetadata(): Promise<Metadata> {
    const [dataProviders, siteSeo] = await Promise.all([getDataProvidersPage(), getSiteSeo()])
    return buildMetadata({ seo: dataProviders?.seo, siteSeo, path: "/data-providers" })
}

export default async function DataProvidersPage() {
    const dataProviders = await getDataProvidersPage()

    if (!dataProviders) {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getDataProvidersPage() returned null — has the audience-data-providers document been created in Sanity Studio?"
            )
        }

        console.error("[DataProvidersPage] getDataProvidersPage() returned null in production")

        return (
            <section className="min-h-[60vh] flex items-center justify-center px-4">
                <p className="text-muted-foreground text-center">
                    We're having trouble loading this page. Please try again shortly.
                </p>
            </section>
        )
    }

    return <DataProvidersPageClient data={dataProviders} />
}