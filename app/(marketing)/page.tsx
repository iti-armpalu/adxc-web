import type { Metadata } from "next"
import { getHome, getSiteSeo } from "@/lib/cms/queries"
import { buildMetadata } from "@/lib/seo/build-metadata"
import { HeroSection } from "@/components/sections/home/hero"
import { HomeProblemSection } from "@/components/sections/home/problem"
import { PlatformSection } from "@/components/sections/home/platform"
import { UseCasesSection } from "@/components/sections/home/use-cases"
import { AudienceCardsSection } from "@/components/sections/home/audience-cards"
import { HomeCTASection } from "@/components/sections/home/cta"
import { PartnersSection } from "@/components/sections/home/partners-section"

export async function generateMetadata(): Promise<Metadata> {
    const [home, siteSeo] = await Promise.all([getHome(), getSiteSeo()])
    return buildMetadata({ seo: home?.seo, siteSeo, path: "/" })
}

export default async function HomePage() {
    const home = await getHome()

    if (!home) {
        // Dev: throw so it's impossible to miss locally — surfaces as
        // Next.js's error overlay with a full stack trace.
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getHome() returned null — has the Home document been created in Sanity Studio?"
            )
        }

        // Prod: log for monitoring, then render a minimal fallback
        // rather than a blank page or Next's generic error screen.
        console.error("[HomePage] getHome() returned null in production")

        return (
            <section className="min-h-[60vh] flex items-center justify-center px-4">
                <p className="text-muted-foreground text-center">
                    We're having trouble loading this page. Please try again shortly.
                </p>
            </section>
        )
    }

    return (
        <>
            <HeroSection
                headline={home.heroHeadline}
                subtext={home.heroSubtext}
            />
            <PartnersSection />
            <HomeProblemSection
                sentenceOne={home.problemSentenceOne}
                sentenceTwo={home.problemSentenceTwo}
                sentenceThree={home.problemSentenceThree}
                punchline={home.problemPunchline}
                solution={home.problemSolution}
            />
            <PlatformSection
                headline={home.platformHeadline}
                subtext={home.platformSubtext}
                steps={home.platformSteps}
            />
            <UseCasesSection
                headline={home.useCasesHeadline}
                subtext={home.useCasesSubtext}
                useCases={home.useCases}
            />
            <AudienceCardsSection />
            <HomeCTASection />
        </>
    )
}