import { IntegrationsSection } from "../integrations-section"
import type { PartnerLogoContent } from "@/lib/cms/types"

interface BrandsIntegrationsProps {
    headline: string
    subtext: string
    label: string
    logos: PartnerLogoContent[]
    moreText?: string
}

export function BrandsIntegrations({ headline, subtext, label, logos, moreText }: BrandsIntegrationsProps) {
    return (
        <IntegrationsSection
            heading={headline}
            description={subtext}
            label={label}
            logos={logos}
            moreText={moreText}
            accentBg="bg-purple-50"
            pillBg="bg-purple-100"
            captionColor="text-purple-700"
            textColor="text-purple-800"
            bodyColor="text-purple-950"
        />
    )
}
