import type { Metadata } from "next"
import { BrandsHero } from "@/components/sections/brands/hero"
import { BrandsDataProviders } from "@/components/sections/brands/data-providers"
import { BrandsProblem } from "@/components/sections/brands/problem"
import { BrandsHowItWorks } from "@/components/sections/brands/how-it-works"
import { BrandsIntegrations } from "@/components/sections/brands/integrations"
import { BrandsPartners } from "@/components/sections/brands/partners"
import { BrandsCTA } from "@/components/sections/brands/cta"

export const metadata: Metadata = {
    title: "For Brands",
    description: "Consumer insight on demand. Connect your AI agents to industry-leading providers and pay only for the answers you need.",
}

export default function BrandsPage() {
    return (
        <>
            <BrandsHero />
            <BrandsDataProviders />
            <BrandsProblem />
            <BrandsHowItWorks />
            <BrandsIntegrations />
            <BrandsPartners />
            <BrandsCTA />
        </>
    )
}