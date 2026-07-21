"use client"

import { useState } from "react"
import { AIPlatformsHero } from "@/components/sections/ai-platforms/hero"
import { AIPlatformsCapabilities } from "@/components/sections/ai-platforms/capabilities"
import { AIPlatformsWhyNow } from "@/components/sections/ai-platforms/why-now"
import { AIPlatformsHowItWorks } from "@/components/sections/ai-platforms/how-it-works"
import { AIPlatformsPartners } from "@/components/sections/ai-platforms/partners"
import { AIPlatformsCTA } from "@/components/sections/ai-platforms/cta"
import type { AudiencePageContent } from "@/lib/cms/types"

interface AIPlatformsPageClientProps {
    data: AudiencePageContent
}

export default function AIPlatformsPageClient({ data }: AIPlatformsPageClientProps) {
    const [sharedEmail, setSharedEmail] = useState("")

    return (
        <>
            <AIPlatformsHero
                label={data.heroLabel}
                headline={data.heroHeadline}
                subtext={data.heroSubtext}
                onEmailSubmit={(email) => setSharedEmail(email)}
            />
            <AIPlatformsCapabilities />
            <AIPlatformsWhyNow />
            <AIPlatformsHowItWorks
                headline={data.howItWorksHeadline}
                subtext={data.howItWorksSubtext}
                features={data.howItWorksFeatures}
            />
            <AIPlatformsPartners />
            <AIPlatformsCTA prefillEmail={sharedEmail} />
        </>
    )
}