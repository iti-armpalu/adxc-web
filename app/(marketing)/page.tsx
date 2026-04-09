import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { HeroSection } from "@/components/sections/home/hero"
import { SocialProofSection } from "@/components/sections/home/social-proof"
import { ProblemSection } from "@/components/sections/home/problem"
import { PlatformSection } from "@/components/sections/home/platform"
import { UseCasesSection } from "@/components/sections/home/use-cases"
import { AudienceCardsSection } from "@/components/sections/home/audience-cards"
import { HomeCTASection } from "@/components/sections/home/cta"


export const metadata: Metadata = {
    title: "Home",
    description: siteConfig.tagline,
}

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <SocialProofSection />
            <ProblemSection />
            <PlatformSection />
            <UseCasesSection />
            <AudienceCardsSection />
            <HomeCTASection />
        </>
    )
}