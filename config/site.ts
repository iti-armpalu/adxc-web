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

    // Header nav — stripped to live pages only, restore when pages are ready
    nav: [] as NavGroup[],

    cta: {
        label: "Get early access",
        href: "/early-access",
    },

    secondaryCta: null,

    // Footer — legal only, restore other groups when pages are ready
    footerLinks: [
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