"use client"

import Link from "next/link"
import { Mail, LineChart, ArrowRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import Image from "next/image"
import { trackFooterContactClicked, trackFooterInvestorClicked, trackFooterLinkClicked } from "@/lib/analytics/events"

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="border-t border-border/50 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">

                    {/* Brand column — spans 2 cols on md+ */}
                    <div className="col-span-2 space-y-4">
                        <Link href="/" className="hover:opacity-70 transition-opacity inline-block">
                            <Image
                                src="/adxc-logo-primary-horizontal.svg"
                                alt={siteConfig.name}
                                width={120}
                                height={40}
                                className="h-4 w-auto"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                            {siteConfig.tagline}
                        </p>
                    </div>

                    {/* Link groups — one col each */}
                    {siteConfig.footerLinks.map((group) => (
                        <div key={group.label} className="space-y-4">
                            <p className="text-xs font-medium text-foreground tracking-wider uppercase">
                                {group.label}
                            </p>
                            <ul className="space-y-2.5">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => trackFooterLinkClicked(link.label, link.href)}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">

                    <p className="text-xs text-muted-foreground">
                        &copy; {year} {siteConfig.name}. All rights reserved.
                    </p>

                    {/* Contact + Investors cards */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/contact"
                            onClick={trackFooterContactClicked}
                            className="group flex items-center gap-3 px-4 py-2.5 min-w-[160px] rounded-xl border border-border/50 hover:border-border hover:bg-muted/40 transition-all duration-150"
                        >
                            <div className="shrink-0 w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                                <Mail className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-medium text-foreground">Contact</p>
                                <p className="text-xs text-muted-foreground">Get in touch</p>
                            </div>
                            <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                        </Link>

                        <Link
                            href={siteConfig.investorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={trackFooterInvestorClicked}
                            className="group flex items-center gap-3 px-4 py-2.5 min-w-[160px] rounded-xl border border-border/50 hover:border-border hover:bg-muted/40 transition-all duration-150"
                        >
                            <div className="shrink-0 w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                                <LineChart className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-medium text-foreground">Investors</p>
                                <p className="text-xs text-muted-foreground">Investor portal</p>
                            </div>
                            <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                        </Link>
                    </div>

                </div>

            </div>
        </footer>
    )
}