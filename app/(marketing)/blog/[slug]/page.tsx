import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PortableText } from "next-sanity"
import { getPost, getPostSlugs } from "@/lib/cms/queries"
import { ArrowLeft } from "lucide-react"

export const revalidate = 3600

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const slugs = await getPostSlugs()
    return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)
    if (!post) return {}

    return {
        title: post.title,
        description: post.excerpt,
    }
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) notFound()

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">

            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
                <ArrowLeft className="w-4 h-4" />
                All posts
            </Link>

            <header className="mb-12">
                <p className="text-xs text-muted-foreground mb-6">
                    {formatDate(post.publishedAt)}
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 leading-tight">
                    {post.title}
                </h1>
                {post.excerpt && (
                    <p className="text-lg text-muted-foreground leading-relaxed border-t border-border/50 pt-6">
                        {post.excerpt}
                    </p>
                )}
            </header>

            {post.body ? (
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <PortableText value={post.body} />
                </div>
            ) : (
                <p className="text-muted-foreground italic">
                    Full article coming soon.{" "}
                    <Link
                        href="/contact"
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                        Get in touch
                    </Link>{" "}
                    if you'd like to discuss this topic.
                </p>
            )}

        </div>
    )
}