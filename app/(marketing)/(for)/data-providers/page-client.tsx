"use client"

import { useState } from "react"
import { PersonaHero } from "@/components/sections/persona/persona-hero"
import { DataProvidersStat } from "@/components/sections/data-providers/stat"
import { DataProvidersWhyNow } from "@/components/sections/data-providers/why-now"
import { DataProvidersHowItWorks } from "@/components/sections/data-providers/how-it-works"
import { DataProvidersDistribution } from "@/components/sections/data-providers/distribution"
import { DataProvidersPartners } from "@/components/sections/data-providers/partners"
import { DataProvidersCTA } from "@/components/sections/data-providers/cta"
import { DataProvidersDataProviders } from "@/components/sections/data-providers/data-providers"
import type { DataProvidersPageContent } from "@/lib/cms/types"

interface DataProvidersPageClientProps {
    data: DataProvidersPageContent
}

export default function DataProvidersPageClient({ data }: DataProvidersPageClientProps) {
    const [sharedEmail, setSharedEmail] = useState("")

    return (
        <>
            <PersonaHero
                persona="data-providers"
                label={data.heroLabel}
                headlineLine1={data.heroHeadlineLine1}
                headlineLine2={data.heroHeadlineLine2}
                headlineLine3={data.heroHeadlineLine3}
                subtext={data.heroSubtext}
                emailHandoff={{
                    buttonLabel: "Talk with our team",
                    scrollToId: "cta-data-provider",
                    onSubmit: (email) => setSharedEmail(email),
                }}
            />
            <DataProvidersDataProviders
                label={data.dataProvidersLabel}
                logos={data.dataProvidersLogos}
                moreText={data.dataProvidersMoreText}
            />
            <DataProvidersStat
                value={data.statValue}
                label={data.statLabel}
                subtext={data.statSubtext}
                note={data.statNote}
            />
            <DataProvidersWhyNow
                label={data.whyNowLabel}
                stats={data.whyNowStats}
                headline={data.whyNowHeadline}
                note={data.whyNowNote}
            />
            <DataProvidersHowItWorks
                headline={data.howItWorksHeadline}
                features={data.howItWorksFeatures}
            />
            <DataProvidersDistribution
                headline={data.distributionHeadline}
                subtext={data.distributionSubtext}
                note={data.distributionNote}
                label={data.distributionLabel}
                logos={data.distributionLogos}
                statValue={data.distributionStatValue}
                statLabel={data.distributionStatLabel}
                image={data.distributionImage}
            />
            <DataProvidersCTA
                label={data.ctaLabel}
                headline={data.ctaHeadline}
                subtext={data.ctaSubtext}
                buttonLabel={data.ctaButtonLabel}
                prefillEmail={sharedEmail}
            />
            <DataProvidersPartners
                label={data.partnersLabel}
                logos={data.partnersLogos}
            />
        </>
    )
}