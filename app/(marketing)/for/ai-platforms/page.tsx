import type { Metadata } from "next"
import { getAIPlatformsPage } from "@/lib/cms/queries"
import AIPlatformsPageClient from "./page-client"

export const metadata: Metadata = {
    title: "For AI Platforms",
    description: "ADXC connects your platform to industry-leading consumer data sources.",
}

export default async function AIPlatformsPage() {
    const aiPlatforms = await getAIPlatformsPage()

    if (!aiPlatforms) {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "getAIPlatformsPage() returned null — has the audience-ai-platforms document been created in Sanity Studio?"
            )
        }

        console.error("[AIPlatformsPage] getAIPlatformsPage() returned null in production")

        return (
            <section className="min-h-[60vh] flex items-center justify-center px-4">
                <p className="text-muted-foreground text-center">
                    We're having trouble loading this page. Please try again shortly.
                </p>
            </section>
        )
    }

    return <AIPlatformsPageClient data={aiPlatforms} />
}