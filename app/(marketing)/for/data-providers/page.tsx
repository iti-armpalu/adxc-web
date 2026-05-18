import type { Metadata } from "next"
import { DataProvidersHero } from "@/components/sections/data-providers/hero"
import { DataProvidersStat } from "@/components/sections/data-providers/stat"
import { DataProvidersWhyNow } from "@/components/sections/data-providers/why-now"
import { DataProvidersHowItWorks } from "@/components/sections/data-providers/how-it-works"
import { DataProvidersDistribution } from "@/components/sections/data-providers/distribution"
import { DataProvidersPartners } from "@/components/sections/data-providers/partners"
import { DataProvidersCTA } from "@/components/sections/data-providers/cta"

export const metadata: Metadata = {
    title: "For Data Providers",
    description: "Unlock a market your enterprise model can't reach. ADXC connects your data to the AI agents and workflows shaping marketing decisions for SMEs.",
}

export default function DataProvidersPage() {
    return (
        <>
            <DataProvidersHero />
            <DataProvidersStat />
            <DataProvidersWhyNow />
            <DataProvidersHowItWorks />
            <DataProvidersDistribution />
            <DataProvidersPartners />
            <DataProvidersCTA />
        </>
    )
}