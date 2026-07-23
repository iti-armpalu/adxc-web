import type { Metadata } from "next"
import { getDataProvidersPage } from "@/lib/cms/queries"
import DataProvidersPageClient from "./page-client"

export const metadata: Metadata = {
    title: "For Data Providers",
    description: "Unlock a market your enterprise model can't reach. ADXC connects your data to the AI agents and workflows shaping marketing decisions for SMEs.",
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