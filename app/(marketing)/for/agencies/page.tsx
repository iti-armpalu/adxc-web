import type { Metadata } from "next"
import { getAgenciesPage } from "@/lib/cms/queries"
import { AgenciesHero } from "@/components/sections/agencies/hero"
import { AgenciesHowItWorks } from "@/components/sections/agencies/how-it-works"
import { AgenciesIntegrations } from "@/components/sections/agencies/integrations"
import { AgenciesPartners } from "@/components/sections/agencies/partners"
import { AgenciesCTA } from "@/components/sections/agencies/cta"
import { AgenciesOtherWays } from "@/components/sections/agencies/other-ways"

export const metadata: Metadata = {
    title: "For Agencies",
    description: "ADXC connects your team's AI tools to industry-leading consumer data sources, with one connection.",
}

export default async function AgenciesPage() {
    const agencies = await getAgenciesPage()

    if (!agencies) {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getAgenciesPage() returned null — has the audience-agencies document been created in Sanity Studio?"
            )
        }

        console.error("[AgenciesPage] getAgenciesPage() returned null in production")

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
            <AgenciesHero
                label={agencies.heroLabel}
                headline={agencies.heroHeadline}
                subtext={agencies.heroSubtext}
            />
            <AgenciesPartners />
            <AgenciesHowItWorks
                headline={agencies.howItWorksHeadline}
                features={agencies.howItWorksFeatures}
            />
            <AgenciesIntegrations />
            <AgenciesCTA />
            <AgenciesOtherWays />
        </>
    )
}