import { ProductHero } from "../product-hero";

interface PlatformHeroProps {
    label: string
    headlineLine1: string
    headlineLine2?: string
    headlineLine3?: string
    subtext: string
}

export function PlatformHero({ label, headlineLine1, headlineLine2, headlineLine3, subtext }: PlatformHeroProps) {
    return (
        <ProductHero
            label={label}
            headlineLine1={headlineLine1}
            headlineLine2={headlineLine2}
            headlineLine3={headlineLine3}
            subtext={subtext}
        />
    )
}