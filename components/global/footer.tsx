"use client"

import Link from "next/link"
import { Mail, LineChart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import Image from "next/image"
import { trackFooterContactClicked, trackFooterInvestorClicked, trackFooterLinkClicked } from "@/lib/analytics/events"

const legalLinks = [
    { label: "Privacy notice", href: "/legal/privacy" },
    { label: "Terms of service", href: "/legal/terms" },
    { label: "Cookie policy", href: "/legal/cookies" },
]

export function Footer() {
    const year = new Date().getFullYear()
    const linkGroups = siteConfig.footerLinks.filter((g) => g.label !== "Legal")

    return (
        <footer className="relative border-t border-white/10 bg-brand-700">
            {/* Halo glow
                radial-gradient(ellipse [width] [height] at [x] [y], ...)
                x: 0% = left edge, 50% = centre, 100% = right edge
                y: 0% = top edge, 50% = centre, 100% = bottom edge
                width/height: size of the ellipse as % of the element
                opacity: controls overall intensity of the glow
            */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 90% at 70% 100%, var(--color-brand-400) 0%, transparent 70%)",
                    opacity: 0.4,
                }}
            />
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">

                {/* Main grid — brand col + link groups */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] gap-8 lg:gap-16">

                    {/* Brand column */}
                    <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="hover:opacity-70 transition-opacity inline-block">
                            <Image
                                src="/adxc-logo-primary-horizontal.svg"
                                alt={siteConfig.name}
                                width={120}
                                height={40}
                                className="h-8 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
                            {siteConfig.tagline}
                        </p>
                    </div>

                    {/* Link groups */}
                    {linkGroups.map((group) => (
                        <div key={group.label} className="space-y-4">
                            <p className="text-sm font-medium text-primary-foreground">
                                {group.label}
                            </p>
                            <ul className="space-y-2.5">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => trackFooterLinkClicked(link.label, link.href)}
                                            className="text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 mt-12">

                    <p className="text-xs text-primary-foreground/50">
                        &copy; {year} {siteConfig.name}. All rights reserved.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">

                        {/* Legal links */}
                        <div className="flex items-center gap-6">
                            {legalLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden sm:block w-px h-4 bg-white/20" />

                        {/* Contact + Investor buttons */}
                        <div className="flex items-center gap-3">
                            <Button variant="outline-reversed" size="sm" asChild onClick={trackFooterContactClicked}>
                                <Link href="/contact">
                                    <Mail />
                                    Contact
                                    <ArrowRight />
                                </Link>
                            </Button>
                            <Button variant="outline-reversed" size="sm" asChild onClick={trackFooterInvestorClicked}>
                                <Link href={siteConfig.investorUrl} target="_blank" rel="noopener noreferrer">
                                    <LineChart />
                                    Investors
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    )
}