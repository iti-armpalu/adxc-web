import { IntegrationsSection } from "../integrations-section"
import type { PartnerLogoContent } from "@/lib/cms/types"

interface AgenciesIntegrationsProps {
    headline: string
    subtext: string
    label: string
    logos: PartnerLogoContent[]
    moreText?: string
}

export function AgenciesIntegrations({ headline, subtext, label, logos, moreText }: AgenciesIntegrationsProps) {
    return (
        <IntegrationsSection
            heading={headline}
            description={subtext}
            label={label}
            logos={logos}
            moreText={moreText}
            accentBg="bg-orange-50"
            pillBg="bg-orange-100"
            captionColor="text-orange-700"
            textColor="text-orange-900"
            bodyColor="text-orange-950"
        />
    )
}
