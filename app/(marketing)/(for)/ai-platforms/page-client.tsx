"use client"

import { useState } from "react"
import { PersonaHero } from "@/components/sections/persona/persona-hero"
import { AIPlatformsCapabilities } from "@/components/sections/ai-platforms/capabilities"
import { AIPlatformsWhyNow } from "@/components/sections/ai-platforms/why-now"
import { AIPlatformsHowItWorks } from "@/components/sections/ai-platforms/how-it-works"
import { AIPlatformsPartners } from "@/components/sections/ai-platforms/partners"
import { AIPlatformsCTA } from "@/components/sections/ai-platforms/cta"
import type { AIPlatformsPageContent } from "@/lib/cms/types"

interface AIPlatformsPageClientProps {
    data: AIPlatformsPageContent
}

export default function AIPlatformsPageClient({ data }: AIPlatformsPageClientProps) {
    const [sharedEmail, setSharedEmail] = useState("")

    return (
        <>
            <PersonaHero
                persona="ai-platforms"
                label={data.heroLabel}
                headlineLine1={data.heroHeadlineLine1}
                headlineLine2={data.heroHeadlineLine2}
                headlineLine3={data.heroHeadlineLine3}
                subtext={data.heroSubtext}
                emailHandoff={{
                    buttonLabel: "Talk with our team",
                    scrollToId: "cta",
                    onSubmit: (email) => setSharedEmail(email),
                }}
            />
            <AIPlatformsCapabilities
                headline={data.capabilitiesHeadline}
                subtext={data.capabilitiesSubtext}
            />
            <AIPlatformsWhyNow
                label={data.whyNowLabel}
                cards={data.whyNowCards}
            />
            <AIPlatformsHowItWorks
                headline={data.howItWorksHeadline}
                subtext={data.howItWorksSubtext}
                features={data.howItWorksFeatures}
            />
            <AIPlatformsPartners
                label={data.midPartnersLabel}
                logos={data.midPartnersLogos}
                moreText={data.midPartnersMoreText}
            />
            <AIPlatformsCTA
                label={data.ctaLabel}
                headline={data.ctaHeadline}
                subtext={data.ctaSubtext}
                buttonLabel={data.ctaButtonLabel}
                prefillEmail={sharedEmail}
            />
        </>
    )
}