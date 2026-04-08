// app/(public)/gate/page.tsx
import GateForm from "@/components/gate/gate-form"
import { siteConfig } from "@/config/site"

type GatePageProps = {
    searchParams: Promise<{ next?: string }>
}

export default async function GatePage({ searchParams }: GatePageProps) {
    const { next } = await searchParams

    // Pass raw value — action validates and sanitises on submit
    const nextPath = typeof next === "string" ? next : "/"

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="mx-auto w-full max-w-xl text-center mb-10">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground mb-8">
                    {siteConfig.name}
                </h1>
                <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed">
                    {siteConfig.tagline}
                </p>
            </div>
            <GateForm nextPath={nextPath} />
        </main>
    )
}