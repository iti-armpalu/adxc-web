import type { Metadata } from "next"
import { AboutHero } from "@/components/sections/about/hero"
import { AboutTeam } from "@/components/sections/about/team"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "About",
    description: `About ${siteConfig.name} — our mission and the team behind the platform.`,
}

export default function AboutPage() {
    return (
        <div className="mt-header">
            <AboutHero />
            <AboutTeam />
        </div>
    )
}