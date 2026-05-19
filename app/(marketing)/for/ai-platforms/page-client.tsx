"use client"

import { useState } from "react"
import { AIPlatformsHero } from "@/components/sections/ai-platforms/hero"
import { AIPlatformsCapabilities } from "@/components/sections/ai-platforms/capabilities"
import { AIPlatformsWhyNow } from "@/components/sections/ai-platforms/why-now"
import { AIPlatformsHowItWorks } from "@/components/sections/ai-platforms/how-it-works"
import { AIPlatformsPartners } from "@/components/sections/ai-platforms/partners"
import { AIPlatformsCTA } from "@/components/sections/ai-platforms/cta"

export default function AIPlatformsPageClient() {
    const [sharedEmail, setSharedEmail] = useState("")

    return (
        <>
            <AIPlatformsHero onEmailSubmit={(email) => setSharedEmail(email)} />
            <AIPlatformsCapabilities />
            <AIPlatformsWhyNow />
            <AIPlatformsHowItWorks />
            <AIPlatformsPartners />
            <AIPlatformsCTA prefillEmail={sharedEmail} />
        </>
    )
}