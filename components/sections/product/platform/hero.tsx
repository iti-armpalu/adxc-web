import { ProductHero } from "../product-hero";

interface PlatformHeroProps {
    label: string
    headline: string
    subtext: string
}

export function PlatformHero({ label, headline, subtext }: PlatformHeroProps) {
    return (
        <ProductHero
            eyebrow={label}
            title={headline}
            description={subtext}
        />
    )
}