import { ProblemSection } from "@/components/sections/problem-section"

export function HomeProblemSection() {
    return (
        <ProblemSection
            eyebrow="The problem"
            stat="$200k+"
            statLabel="Price for enterprise subscriptions to premium consumer data providers"
            body="99% of businesses can't afford the insight they need to make better marketing decisions. This wastes resources and limits your growth."
            closer="ADXC was built for the 99%."
            background="bg-brand-700"
            statColor="text-primary-foreground"
            labelColor="text-primary-foreground/70"
            bodyColor="text-primary-foreground"
            closerColor="text-primary-foreground"
            dividerColor="divide-primary-foreground/20"
            eyebrowColor="text-primary-foreground"
        />
    )
}