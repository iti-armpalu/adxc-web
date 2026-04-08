"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menu on route change
    useEffect(() => setMenuOpen(false), [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">

                {/* Wordmark */}
                <Link
                    href="/"
                    className="text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
                >
                    {siteConfig.name}
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {siteConfig.nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "px-4 py-2 text-sm rounded-md transition-colors",
                                pathname === item.href || pathname.startsWith(item.href + "/")
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Button asChild size="sm">
                        <Link href={siteConfig.cta.href}>
                            {siteConfig.cta.label}
                        </Link>
                    </Button>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={cn(
                    "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="bg-background/95 backdrop-blur-md border-t border-border/50 px-4 pt-3 pb-6 space-y-1">
                    {siteConfig.nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "block px-3 py-2.5 text-sm rounded-md transition-colors",
                                pathname === item.href || pathname.startsWith(item.href + "/")
                                    ? "text-foreground font-medium bg-muted/50"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-border/50">
                        <Button asChild className="w-full" size="sm">
                            <Link href={siteConfig.cta.href}>
                                {siteConfig.cta.label}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}