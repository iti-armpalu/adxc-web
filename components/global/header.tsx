"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { siteConfig, type NavGroup } from "@/config/site"
import { Button } from "@/components/ui/button"
import {
    ChevronDown, Menu, X, ArrowRight,
    TrendingUp, Users, Database, Cpu,
    CircleHelp, BookOpen, Newspaper,
    type LucideIcon,
} from "lucide-react"
import type { BlogPostPreview } from "@/lib/cms/types"
import Image from "next/image"

// Icon registry — maps string names from siteConfig to Lucide components
const iconMap: Record<string, LucideIcon> = {
    TrendingUp,
    Users,
    Database,
    Cpu,
    CircleHelp,
    BookOpen,
    Newspaper,
}

type Props = {
    latestPosts?: BlogPostPreview[]
}

export function Header({ latestPosts = [] }: Props) {
    const pathname = usePathname()
    const [openPanel, setOpenPanel] = useState<string | null>(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
    const [scrolled, setScrolled] = useState(false)
    const headerRef = useRef<HTMLElement>(null)
    // Dark header state — over the brand background on homepage
    const isDark = !scrolled && pathname === "/"

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        setOpenPanel(null)
        setMobileOpen(false)
        setMobileExpanded(null)
    }, [pathname])

    useEffect(() => {
        if (!openPanel) return
        const handler = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setOpenPanel(null)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [openPanel])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpenPanel(null)
                setMobileOpen(false)
            }
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [])

    const togglePanel = (label: string) =>
        setOpenPanel((prev) => (prev === label ? null : label))

    const isActive = (group: NavGroup) => {
        if (group.href) return pathname === group.href
        return group.items?.some((item) => pathname.startsWith(item.href)) ?? false
    }

    return (
        <header
            ref={headerRef}
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/95 backdrop-blur-md border-b border-border/40"
                    : "bg-transparent"
            )}
        >
            {/* Main bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">

                <Link href="/" className="shrink-0 hover:opacity-70 transition-opacity">
                    <Image
                        src="/adxc-logo.svg"
                        alt={siteConfig.name}
                        width={120}
                        height={40}
                        priority
                    />
                </Link>


                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
                    {siteConfig.nav.map((group) => {
                        const active = isActive(group)
                        const hasPanel = !!group.items?.length
                        const panelOpen = openPanel === group.label

                        if (!hasPanel && group.href) {
                            return (
                                <Link
                                    key={group.label}
                                    href={group.href}
                                    className={cn(
                                        "px-3.5 py-2 text-sm rounded-md transition-colors",
                                        active
                                            ? "text-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {group.label}
                                </Link>
                            )
                        }

                        return (
                            <button
                                key={group.label}
                                onClick={() => togglePanel(group.label)}
                                aria-expanded={panelOpen}
                                aria-label={`${group.label} menu`}
                                className={cn(
                                    "flex items-center gap-1 px-3.5 py-2 text-sm rounded-md transition-colors",
                                    active || panelOpen
                                        ? "text-foreground font-medium"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                {group.label}
                                <ChevronDown
                                    className={cn(
                                        "w-3.5 h-3.5 transition-transform duration-200",
                                        panelOpen && "rotate-180"
                                    )}
                                />
                            </button>
                        )
                    })}
                </nav>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                    {siteConfig.secondaryCta && (
                        <Link
                            href={siteConfig.secondaryCta.href}
                            className={cn(
                                "px-3.5 py-2 text-sm font-semibold transition-colors",
                                isDark
                                    ? "text-white/90 hover:text-white"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {siteConfig.secondaryCta.label}
                        </Link>
                    )}
                    <Button
                        asChild
                        size="sm"
                        className={cn(
                            "font-semibold",
                            isDark
                                ? "bg-background text-foreground hover:!bg-neutral-100 hover:!text-foreground hover:shadow-sm active:!bg-neutral-200"
                                : ""
                        )}
                    >
                        <Link href={siteConfig.cta.href}>
                            {siteConfig.cta.label}
                        </Link>
                    </Button>
                </div>

                {/* Mobile toggle */}
                <button
                    className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Desktop mega panels */}
            {siteConfig.nav.map((group) => {
                if (!group.items?.length) return null
                const isOpen = openPanel === group.label
                const isResources = group.label === "Resources"

                return (
                    <div
                        key={group.label}
                        className={cn(
                            "hidden lg:block fixed inset-x-0 top-16 z-40",
                            "transition-all duration-200 ease-out overflow-hidden",
                            isOpen
                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 -translate-y-1 pointer-events-none"
                        )}
                    >
                        {/* Panel background — fixed so backdrop-blur works regardless of scroll */}
                        <div className="bg-background border-b border-border/50 shadow-sm">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
                                <div className={cn(
                                    "grid gap-8",
                                    isResources ? "grid-cols-[auto_300px]" : "grid-cols-[1fr_300px]"
                                )}>

                                    {/* Left — nav items */}
                                    <div className={cn(
                                        isResources
                                            ? "flex items-center justify-between w-full gap-2"
                                            : "grid grid-cols-2 gap-1"
                                    )}>
                                        {group.items.map((item) => {
                                            const active = pathname.startsWith(item.href)
                                            const Icon = item.icon ? iconMap[item.icon] : null

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={cn(
                                                        "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150",
                                                        isResources && "flex-1",
                                                        active
                                                            ? "bg-muted text-foreground"
                                                            : "hover:bg-muted text-foreground/80 hover:text-foreground"
                                                    )}
                                                >
                                                    {Icon && (
                                                        <div className={cn(
                                                            "shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                                                            active
                                                                ? "bg-foreground/10 text-foreground"
                                                                : "bg-border/50 text-muted-foreground group-hover:bg-foreground/10 group-hover:text-foreground"
                                                        )}>
                                                            <Icon className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium leading-none mb-1">
                                                            {item.label}
                                                        </p>
                                                        {item.description && (
                                                            <p className="text-xs text-muted-foreground leading-snug">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <ArrowRight className={cn(
                                                        "w-3.5 h-3.5 shrink-0 text-muted-foreground transition-all duration-150",
                                                        "opacity-0 -translate-x-1",
                                                        "group-hover:opacity-100 group-hover:translate-x-0"
                                                    )} />
                                                </Link>
                                            )
                                        })}
                                    </div>

                                    {/* Right — contextual panel */}
                                    <div className="border-l border-border/50 pl-8">
                                        {isResources && latestPosts.length > 0 ? (
                                            <ResourcesPanel posts={latestPosts} />
                                        ) : (
                                            <WhyAdxcPanel />
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* Mobile menu */}
            <div
                className={cn(
                    "lg:hidden fixed inset-0 top-16 z-40 bg-background",
                    "transition-all duration-300 ease-in-out",
                    mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                <div className="h-full overflow-y-auto px-4 py-6 space-y-1">
                    {siteConfig.nav.map((group) => {
                        const hasItems = !!group.items?.length
                        const expanded = mobileExpanded === group.label

                        if (!hasItems && group.href) {
                            return (
                                <Link
                                    key={group.label}
                                    href={group.href}
                                    className={cn(
                                        "block px-4 py-3 text-sm rounded-lg transition-colors",
                                        pathname === group.href
                                            ? "text-foreground font-medium bg-muted"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {group.label}
                                </Link>
                            )
                        }

                        return (
                            <div key={group.label}>
                                <button
                                    aria-label={`${group.label} menu`}
                                    aria-expanded={expanded}
                                    onClick={() =>
                                        setMobileExpanded((prev) =>
                                            prev === group.label ? null : group.label
                                        )
                                    }
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-colors",
                                        expanded
                                            ? "text-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {group.label}
                                    <ChevronDown
                                        className={cn(
                                            "w-4 h-4 transition-transform duration-200",
                                            expanded && "rotate-180"
                                        )}
                                    />
                                </button>

                                <div
                                    className={cn(
                                        "overflow-hidden transition-all duration-200",
                                        expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    )}
                                >
                                    <div className="pl-2 pt-1 pb-2 space-y-0.5">
                                        {group.items?.map((item) => {
                                            const Icon = item.icon ? iconMap[item.icon] : null
                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                                                        pathname.startsWith(item.href)
                                                            ? "text-foreground font-medium bg-muted"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                    )}
                                                >
                                                    {Icon && <Icon className="w-4 h-4 shrink-0" />}
                                                    <div>
                                                        <p className="text-sm">{item.label}</p>
                                                        {item.description && (
                                                            <p className="text-xs text-muted-foreground/70 mt-0.5">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div className="pt-4 mt-4 border-t border-border/50 space-y-2">
                        {siteConfig.secondaryCta && (
                            <Link
                                href={siteConfig.secondaryCta.href}
                                className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {siteConfig.secondaryCta.label}
                            </Link>
                        )}
                        <Button asChild className="w-full">
                            <Link href={siteConfig.cta.href}>
                                {siteConfig.cta.label}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

function ResourcesPanel({ posts }: { posts: BlogPostPreview[] }) {
    return (
        <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
                Latest from the blog
            </p>
            {posts.slice(0, 3).map((post) => (
                <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group flex items-start justify-between gap-3 py-2.5 border-b border-border/40 last:border-0 hover:opacity-70 transition-opacity"
                >
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                            {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
            ))}
            <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors pt-2"
            >
                View all posts
                <ArrowRight className="w-3 h-3" />
            </Link>
        </div>
    )
}

function WhyAdxcPanel() {
    return (
        <div className="h-full flex flex-col justify-between">
            <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    Get started
                </p>
                <p className="text-sm text-foreground font-medium leading-snug">
                    Access all the marketing data you need — pay only for what you use.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    ADXC connects brands, agencies, and data providers in a single unified exchange.
                </p>
            </div>
            <Link
                href="/contact"
                className={cn(
                    "mt-6 flex items-center justify-between gap-2 px-4 py-3 rounded-xl",
                    "bg-foreground text-background text-sm font-medium",
                    "hover:opacity-90 transition-opacity group"
                )}
            >
                Get early access
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
        </div>
    )
}