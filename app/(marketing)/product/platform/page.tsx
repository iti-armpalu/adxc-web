import type { Metadata } from "next"
import { PlatformHero } from "@/components/sections/product/platform/hero"
import { PlatformOverview } from "@/components/sections/product/platform/overview"
import { PlatformHowItWorks } from "@/components/sections/product/platform/how-it-works"
import { PlatformDataProviders } from "@/components/sections/product/platform/data-providers"
import { PlatformPatent } from "@/components/sections/product/platform/patent"
import { PlatformAudiences } from "@/components/sections/product/platform/audiences"

export const metadata: Metadata = {
    title: "Platform",
    description: "ADXC connects AI agents to industry-leading consumer data sources. Smart. Simple. Secure.",
}

export default function PlatformPage() {
    return (
        <>
            <PlatformHero />
            <PlatformOverview />
            <PlatformHowItWorks />
            <PlatformDataProviders />
            <PlatformPatent />
            <PlatformAudiences />
        </>
    )
}