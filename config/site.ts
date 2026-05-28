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
                    color: "var(--color-purple-700)",
                },
                {
                    label: "For Agencies",
                    href: "/for/agencies",
                    description: "Usage-based data access for every client brief",
                    longDescription: "Give every client access to the data they need. Usage-based, so costs scale with your work. Earn for referrals.",
                    icon: "Users",
                    color: "var(--color-orange-700)",
                },
                {
                    label: "For Data Providers",
                    href: "/for/data-providers",
                    description: "New SME market for your data, pay-per-query",
                    longDescription: "Unlock a new SME market your enterprise model can't reach. Your data powers AI agents, you earn on every query.",
                    icon: "Database",
                    color: "var(--color-blue-600)",
                },
                {
                    label: "For AI Platforms",
                    href: "/for/ai-platforms",
                    description: "One connection, smarter agents, better retention",
                    longDescription: "Make your agents smarter with premium data. One connection for multiple providers, better outputs, stronger retention.",
                    icon: "Cpu",
                    color: "var(--color-cyan-600)",
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
                    label: "Data sources",
                    href: "/product/data-providers",
                    description: "See which data providers you can access via ADXC",
                    icon: "Database",
                },
            ],
        }
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