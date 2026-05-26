import type { Metadata } from "next"
import { DataProvidersHero } from "@/components/sections/product/data-providers/hero"
import { DataProvidersList } from "@/components/sections/product/data-providers/providers-list"
import { DataProvidersStatement } from "@/components/sections/product/data-providers/statement"
import { DataProvidersCTA } from "@/components/sections/product/data-providers/cta"
import { DataProvidersPartner } from "@/components/sections/product/data-providers/partner"

export const metadata: Metadata = {
    title: "Data Providers",
    description: "Multiple industry-leading data providers. One connection.",
}

export default function ProductDataProvidersPage() {
    return (
        <>
            <DataProvidersHero />
            <DataProvidersList />
            <DataProvidersStatement />
            <DataProvidersCTA />
            <DataProvidersPartner />
        </>
    )
}