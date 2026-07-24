import { ProductHero } from "../product-hero";

interface DataSourcesHeroProps {
    headlineLine1: string
    headlineLine2?: string
    headlineLine3?: string
    subtext: string
}

export function DataSourcesHero({ headlineLine1, headlineLine2, headlineLine3, subtext }: DataSourcesHeroProps) {
    return (
        <ProductHero
            headlineLine1={headlineLine1}
            headlineLine2={headlineLine2}
            headlineLine3={headlineLine3}
            subtext={subtext}
        />
    )
}