"use client"

import { useState } from "react"
import { DataProvidersHero } from "@/components/sections/data-providers/hero"
import { DataProvidersStat } from "@/components/sections/data-providers/stat"
import { DataProvidersWhyNow } from "@/components/sections/data-providers/why-now"
import { DataProvidersHowItWorks } from "@/components/sections/data-providers/how-it-works"
import { DataProvidersDistribution } from "@/components/sections/data-providers/distribution"
import { DataProvidersPartners } from "@/components/sections/data-providers/partners"
import { DataProvidersCTA } from "@/components/sections/data-providers/cta"

export default function DataProvidersPageClient() {
    const [sharedEmail, setSharedEmail] = useState("")

    return (
        <>
            <DataProvidersHero onEmailSubmit={(email) => setSharedEmail(email)} />
            <DataProvidersStat />
            <DataProvidersWhyNow />
            <DataProvidersHowItWorks />
            <DataProvidersDistribution />
            <DataProvidersPartners />
            <DataProvidersCTA prefillEmail={sharedEmail} />
        </>
    )
}
