import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { HeroBackground } from "@/components/sections/home/hero-background"
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
            {/* Hero with background bleeding behind fixed header */}
            <div className="relative px-4 sm:px-6 py-20"> 
                <HeroBackground />
                <div className="relative z-10">
                    <HeroSection />
                </div>
            </div>

            <SocialProofSection />
            <ProblemSection />
            <PlatformSection />
            <UseCasesSection />
            <AudienceCardsSection />
            <HomeCTASection />
        </>
    )
}