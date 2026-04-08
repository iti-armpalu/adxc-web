import type { ReactNode } from "react"

type Section = {
    heading: string
    content: ReactNode
}

type Props = {
    category?: string
    title: string
    lastUpdated: string
    sections: Section[]
}

export function LegalTemplate({ category = "Legal", title, lastUpdated, sections }: Props) {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">

            <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    {category}
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-3">
                    {title}
                </h1>
                <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
            </div>

            <div className="space-y-8">
                {sections.map((section) => (
                    <section key={section.heading} className="space-y-3">
                        <h2 className="text-base font-medium text-foreground">
                            {section.heading}
                        </h2>
                        <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                            {section.content}
                        </div>
                    </section>
                ))}
            </div>

        </div>
    )
}