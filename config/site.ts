export const siteConfig = {
    name: "ADXC",
    tagline: "The Agentic Data Exchange that gives companies access to all the marketing data they need, and only charges for what they use",
    url: "https://adxc.ai",
    contactEmail: "iti@adxc.ai",

    // Header nav
    nav: [
        { label: "For Brands", href: "/for/brands" },
        { label: "For Data Providers", href: "/for/data-providers" },
        { label: "For AI Platforms", href: "/for/ai-platforms" },
        { label: "Blog", href: "/blog" },
    ],

    // Header CTA
    cta: {
        label: "Request Access",
        href: "/contact",
    },

    // Footer link groups
    footerLinks: {
        company: [
            { label: "Contact", href: "/contact" },
            { label: "Blog", href: "/blog" },
        ],
        legal: [
            { label: "Privacy Notice", href: "/legal/privacy" },
            { label: "Terms of Service", href: "/legal/terms" },
            { label: "Cookie Policy", href: "/legal/cookies" },
        ],
    },
} as const;

export type SiteConfig = typeof siteConfig;