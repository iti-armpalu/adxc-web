import type { Metadata } from "next"
import { getPosts } from "@/lib/cms/queries"
import { BlogCard } from "@/components/sections/blog-card"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Blog",
    description: `Thinking on data, AI, and the exchange economy from the ${siteConfig.name} team.`,
}

// Revalidate every hour
export const revalidate = 3600

export default async function BlogPage() {
    const posts = await getPosts()
    const [featured, ...rest] = posts

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">

            <div className="mb-16">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Blog
                </p>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
                    Thinking out loud
                </h1>
            </div>

            {posts.length === 0 && (
                <div className="py-24 text-center text-muted-foreground">
                    No posts yet — check back soon.
                </div>
            )}

            {posts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {featured && <BlogCard post={featured} featured />}
                    {rest.map((post) => (
                        <BlogCard key={post._id} post={post} />
                    ))}
                </div>
            )}

        </div>
    )
}