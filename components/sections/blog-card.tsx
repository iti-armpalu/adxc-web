import Link from "next/link"
import type { BlogPostPreview } from "@/lib/cms/types"
import { cn } from "@/lib/utils"

type Props = {
    post: BlogPostPreview
    featured?: boolean
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

export function BlogCard({ post, featured = false }: Props) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className={cn(
                "group flex flex-col gap-4 p-6 rounded-xl border border-border/50",
                "hover:border-border hover:bg-muted/30 transition-all duration-200",
                featured && "sm:col-span-2"
            )}
        >
            <div className="flex flex-col gap-3 flex-1">
                <h2
                    className={cn(
                        "font-medium text-foreground leading-snug group-hover:opacity-80 transition-opacity",
                        featured ? "text-2xl sm:text-3xl" : "text-lg"
                    )}
                >
                    {post.title}
                </h2>

                {post.excerpt && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between mt-auto pt-2 text-xs text-muted-foreground">
                <span>{formatDate(post.publishedAt)}</span>
            </div>
        </Link>
    )
}