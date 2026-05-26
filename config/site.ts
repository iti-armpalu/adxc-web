export type NavItem = {
    label: string
    href: string
    description?: string
    longDescription?: string
    icon?: string
    color?: string
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
        "The Agentic Data Exchange that gives companies access to the marketing data they need, and only charges for what they use",
    url: "https://adxc.ai",
    contactEmail: "contact@adxc.ai",
    investorUrl: "https://investor.adxc.ai",

    nav: [
        {
            label: "Why ADXC",
            items: [
                {
                    label: "For Brands",
                    href: "/for/brands",
                    description: "Premium data for strategies, briefs and campaigns",
                    longDescription: "Access premium data for your strategies, briefs and campaigns, without enterprise subscriptions.",
                    icon: "TrendingUp",
                    color: "var(--chart-1)",
                },
                {
                    label: "For Agencies",
                    href: "/for/agencies",
                    description: "Usage-based data access for every client brief",
                    longDescription: "Give every client access to the data they need. Usage-based, so costs scale with your work. Earn for referrals.",
                    icon: "Users",
                    color: "var(--chart-4)",
                },
                {
                    label: "For Data Providers",
                    href: "/for/data-providers",
                    description: "New SME market for your data, pay-per-query",
                    longDescription: "Unlock a new SME market your enterprise model can't reach. Your data powers AI agents, you earn on every query.",
                    icon: "Database",
                    color: "var(--chart-3)",
                },
                {
                    label: "For AI Platforms",
                    href: "/for/ai-platforms",
                    description: "One connection, smarter agents, better retention",
                    longDescription: "Make your agents smarter with premium data. One connection for multiple providers, better outputs, stronger retention.",
                    icon: "Cpu",
                    color: "var(--chart-2)",
                },
            ],
        },
        {
            label: "Product",
            items: [
                {
                    label: "Platform",
                    href: "/product/platform",
                    description: "How ADXC connects AI agents to premium consumer data",
                    icon: "Layers",
                },
                {
                    label: "For data providers",
                    href: "/product/data-providers",
                    description: "Connect your data to ADXC and unlock a new revenue stream",
                    icon: "Database",
                },
            ],
        },
        { label: "Pricing", href: "/pricing" },
        {
            label: "Resources",
            items: [
                {
                    label: "FAQs",
                    href: "/faq",
                    description: "Everything you need to know about how ADXC works",
                    icon: "CircleHelp",
                },
                {
                    label: "Guides",
                    href: "/guides",
                    description: "Step-by-step guides to get the most from ADXC",
                    icon: "BookOpen",
                },
                {
                    label: "Blog",
                    href: "/blog",
                    description: "Perspectives on data, AI agents and marketing",
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
        label: "Investor portal",
        href: "https://investor.adxc.ai",
    },

    footerLinks: [
        {
            label: "Product",
            links: [
                { label: "Platform", href: "/product/platform" },
                { label: "Data Providers", href: "/product/data-providers" },
            ],
        },
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