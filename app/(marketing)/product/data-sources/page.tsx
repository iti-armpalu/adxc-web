import type { Metadata } from "next"
import { DataSourcesHero } from "@/components/sections/product/data-sources/hero"
import { DataProvidersList } from "@/components/sections/product/data-sources/providers-list"
import { MoreProviders } from "@/components/sections/product/data-sources/more-providers"
import { DataSourcesCTA } from "@/components/sections/product/data-sources/cta"
import { DataProvidersPartner } from "@/components/sections/product/data-sources/partner"

export const metadata: Metadata = {
    title: "Data Providers",
    description: "Multiple industry-leading data providers. One connection.",
}

export default function ProductDataProvidersPage() {
    return (
        <>
            <DataSourcesHero />
            <DataProvidersList />
            <MoreProviders />
            <DataSourcesCTA />
            <DataProvidersPartner />
        </>
    )
}