"use client"

import Link from "next/link"
import { Mail, LineChart, ArrowRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import Image from "next/image"
import { trackFooterContactClicked, trackFooterInvestorClicked, trackFooterLinkClicked } from "@/lib/analytics/events"

const legalLinks = [
    { label: "Privacy notice", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Cookie policy", href: "/cookies" },
]

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative border-t border-white/10">
            {/* Gradient base */}
            <div
                className="absolute inset-0 -z-20"
                style={{ background: "linear-gradient(to right, var(--color-brand) 40%" }}
            />
            {/* Grid overlay */}
            <div className="absolute inset-0 -z-10 bg-grid opacity-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

                {/* Main grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">

                    {/* Brand column — spans 2 cols */}
                    <div className="col-span-2 space-y-4">
                        <Link href="/" className="hover:opacity-70 transition-opacity inline-block">
                            <Image
                                src="/adxc-logo-primary-horizontal.svg"
                                alt={siteConfig.name}
                                width={120}
                                height={40}
                                className="h-8 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-base text-primary-foreground leading-relaxed">
                            {siteConfig.tagline}
                        </p>
                    </div>

                    {/* Spacer — pushes link groups right on md+ */}
                    <div className="hidden md:block" />

                    {/* Link groups — one col each */}
                    {siteConfig.footerLinks
                        .filter((group) => group.label !== "Legal")
                        .map((group) => (
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
                                                className="text-xs text-primary-foreground hover:text-primary-foreground/70 transition-colors"
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">

                    <p className="text-xs text-white">
                        &copy; {year} {siteConfig.name}. All rights reserved.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">

                        {/* Legal links */}
                        <div className="flex items-center gap-6">
                            {legalLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs text-primary-foreground hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden sm:block w-px h-4 bg-white/20" />

                        {/* Contact + Investor buttons */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/contact"
                                onClick={trackFooterContactClicked}
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary-foreground hover:border-white/40 hover:bg-white/10 transition-all duration-150"
                            >
                                <Mail className="w-3.5 h-3.5 text-primary-foreground group-hover:text-white transition-colors" />
                                <span className="text-xs text-primary-foreground group-hover:text-white transition-colors">Contact</span>
                                <ArrowRight className="w-3 h-3 text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                            </Link>

                            <Link
                                href={siteConfig.investorUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={trackFooterInvestorClicked}
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary-foreground hover:border-white/40 hover:bg-white/10 transition-all duration-150"
                            >
                                <LineChart className="w-3.5 h-3.5 text-primary-foreground group-hover:text-white transition-colors" />
                                <span className="text-xs text-primary-foreground group-hover:text-white transition-colors">Investors</span>
                                <ArrowRight className="w-3 h-3 text-primary-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    )
}