export type NavItem = {
    label: string
    href: string
    description?: string
    icon?: string
}

export type NavGroup = {
    label: string
    href?: string
    items?: NavItem[]
}

export type FooterGroup = {
    label: string
    links: NavItem[]
}

export const siteConfig = {
    name: "ADXC",
    tagline:
        "The Agentic Data Exchange that gives companies access to all the marketing data they need, and only charges for what they use",
    url: "https://adxc.ai",
    contactEmail: "iti@adxc.ai",

    // Header nav
    nav: [
        {
            label: "Why ADXC",
            items: [
                {
                    label: "For Brands",
                    href: "/for/brands",
                    description: "Access marketing data on demand",
                    icon: "TrendingUp",
                },
                {
                    label: "For Agencies",
                    href: "/for/agencies",
                    description: "Unified data for your clients",
                    icon: "Users",
                },
                {
                    label: "For Data Providers",
                    href: "/for/data-providers",
                    description: "Monetise your data without overhead",
                    icon: "Database",
                },
                {
                    label: "For AI Platforms",
                    href: "/for/ai-platforms",
                    description: "Structured feeds built for models",
                    icon: "Cpu",
                },
            ],
        },
        { label: "Product", href: "/product" },
        { label: "Pricing", href: "/pricing" },
        {
            label: "Resources",
            items: [
                {
                    label: "FAQs",
                    href: "/faq",
                    description: "Common questions answered",
                    icon: "CircleHelp",
                },
                {
                    label: "Guides",
                    href: "/guides",
                    description: "How to get the most from ADXC",
                    icon: "BookOpen",
                },
                {
                    label: "Blog",
                    href: "/blog",
                    description: "Thinking on data and AI",
                    icon: "Newspaper",
                },
            ],
        },
    ] as NavGroup[],

    cta: {
        label: "Get early access",
        href: "/early-access",
    },

    secondaryCta: {
        label: "Login",
        href: "/login",
    },

    // Footer link groups
    footerLinks: [
        {
            label: "Why ADXC",
            links: [
                { label: "For Brands", href: "/for/brands" },
                { label: "For Agencies", href: "/for/agencies" },
                { label: "For Data Providers", href: "/for/data-providers" },
                { label: "For AI Platforms", href: "/for/ai-platforms" },
            ],
        },
        {
            label: "Platform",
            links: [
                { label: "Product", href: "/product" },
                { label: "Pricing", href: "/pricing" },
            ],
        },
        {
            label: "Resources",
            links: [
                { label: "FAQs", href: "/faq" },
                { label: "Guides", href: "/guides" },
                { label: "Blog", href: "/blog" },
            ],
        },
        {
            label: "Legal",
            links: [
                { label: "Privacy Notice", href: "/legal/privacy" },
                { label: "Terms of Service", href: "/legal/terms" },
                { label: "Cookie Policy", href: "/legal/cookies" },
            ],
        },

    ] as FooterGroup[],
} as const

export type SiteConfig = typeof siteConfig