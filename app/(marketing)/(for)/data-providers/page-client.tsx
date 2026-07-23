"use client"

import { useState } from "react"
import { DataProvidersHero } from "@/components/sections/data-providers/hero"
import { DataProvidersStat } from "@/components/sections/data-providers/stat"
import { DataProvidersWhyNow } from "@/components/sections/data-providers/why-now"
import { DataProvidersHowItWorks } from "@/components/sections/data-providers/how-it-works"
import { DataProvidersDistribution } from "@/components/sections/data-providers/distribution"
import { DataProvidersPartners } from "@/components/sections/data-providers/partners"
import { DataProvidersCTA } from "@/components/sections/data-providers/cta"
import { DataProvidersDataProviders } from "@/components/sections/data-providers/data-providers"
import type { AudiencePageContent } from "@/lib/cms/types"

interface DataProvidersPageClientProps {
    data: AudiencePageContent
}

export default function DataProvidersPageClient({ data }: DataProvidersPageClientProps) {
    const [sharedEmail, setSharedEmail] = useState("")

    return (
        <>
            <DataProvidersHero
                label={data.heroLabel}
                headline={data.heroHeadline}
                subtext={data.heroSubtext}
                onEmailSubmit={(email) => setSharedEmail(email)}
            />
            <DataProvidersDataProviders />
            <DataProvidersStat />
            <DataProvidersWhyNow />
            <DataProvidersHowItWorks
                headline={data.howItWorksHeadline}
                features={data.howItWorksFeatures}
            />
            <DataProvidersDistribution />
            <DataProvidersCTA prefillEmail={sharedEmail} />
            <DataProvidersPartners />
        </>
    )
}