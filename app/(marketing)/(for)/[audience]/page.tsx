import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { audienceConfig, validAudiences } from "@/config/audiences"
import type { Audience } from "@/types/content"
import { AudienceHero } from "@/components/sections/audience/audience-hero"
import { AudienceProblem } from "@/components/sections/audience/audience-problem"
import { AudienceBenefits } from "@/components/sections/audience/audience-benefits"
import { AudienceSocialProof } from "@/components/sections/audience/audience-social-proof"
import { AudienceCTA } from "@/components/sections/audience/audience-cta"

type Props = {
    params: Promise<{ audience: string }>
}

export async function generateStaticParams() {
    return validAudiences.map((audience) => ({ audience }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { audience } = await params
    const config = audienceConfig[audience as Audience]
    if (!config) return {}

    return {
        title: config.label,
        description: config.subheadline,
    }
}

export default async function AudiencePage({ params }: Props) {
    const { audience } = await params
    const config = audienceConfig[audience as Audience]

    if (!config) notFound()

    return (
        <>
            <AudienceHero config={config} />
            <AudienceProblem config={config} />
            <AudienceBenefits config={config} />
            {config.partners?.length && <AudienceSocialProof config={config} />}
            <AudienceCTA config={config} />
        </>
    )
}