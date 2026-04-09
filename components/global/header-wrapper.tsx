import { getPosts } from "@/lib/cms/queries"
import { Header } from "./header"

export async function HeaderWrapper() {
    // Fetch silently — if Sanity is unavailable, header still renders
    const latestPosts = await getPosts().catch(() => [])

    return <Header latestPosts={latestPosts} />
}