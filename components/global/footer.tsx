import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border/50 bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <Link
                            href="/"
                            className="text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
                        >
                            {siteConfig.name}
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                            {siteConfig.tagline}
                        </p>
                    </div>

                    {/* Platform */}
                    <div className="space-y-3">
                        <p className="text-xs font-medium text-foreground uppercase tracking-wider">
                            Platform
                        </p>
                        <ul className="space-y-2">
                            {siteConfig.nav.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-3">
                        <p className="text-xs font-medium text-foreground uppercase tracking-wider">
                            Company
                        </p>
                        <ul className="space-y-2">
                            {siteConfig.footerLinks.company.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-3">
                        <p className="text-xs font-medium text-foreground uppercase tracking-wider">
                            Legal
                        </p>
                        <ul className="space-y-2">
                            {siteConfig.footerLinks.legal.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                        &copy; {year} {siteConfig.name}. All rights reserved.
                    </p>
                    <Link
                        href={`mailto:${siteConfig.contactEmail}`}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {siteConfig.contactEmail}
                    </Link>
                </div>
            </div>
        </footer>
    );
}