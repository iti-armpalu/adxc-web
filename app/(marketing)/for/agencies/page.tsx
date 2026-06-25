import type { Metadata } from "next"
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

export default function AgenciesPage() {
    return (
        <>
            <AgenciesHero />
            <AgenciesPartners />
            <AgenciesHowItWorks />
            <AgenciesIntegrations />
            <AgenciesCTA />
            <AgenciesOtherWays />
        </>
    )
}