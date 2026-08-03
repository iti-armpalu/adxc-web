import type { Metadata } from "next"
import { getAboutPage, getSiteSeo } from "@/lib/cms/queries"
import { buildMetadata } from "@/lib/seo/build-metadata"
import { AboutHero } from "@/components/sections/about/hero"
import { AboutTeam } from "@/components/sections/about/team"

export async function generateMetadata(): Promise<Metadata> {
    const [about, siteSeo] = await Promise.all([getAboutPage(), getSiteSeo()])
    return buildMetadata({ seo: about?.seo, siteSeo, path: "/about" })
}

export default async function AboutPage() {
    const about = await getAboutPage()

    if (!about) {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getAboutPage() returned null — has the about document been created in Sanity Studio?"
            )
        }

        console.error("[AboutPage] getAboutPage() returned null in production")

        return (
            <section className="min-h-[60vh] flex items-center justify-center px-4">
                <p className="text-muted-foreground text-center">
                    We're having trouble loading this page. Please try again shortly.
                </p>
            </section>
        )
    }

    return (
        <div className="mt-header">
            <AboutHero
                headlineLine1={about.heroHeadlineLine1}
                headlineLine2={about.heroHeadlineLine2}
                headlineLine3={about.heroHeadlineLine3}
                subtext={about.heroSubtext}
            />
            <AboutTeam
                headline={about.teamHeadline}
                team={about.team}
            />
        </div>
    )
}