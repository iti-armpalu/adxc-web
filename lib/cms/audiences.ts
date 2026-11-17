import { siteConfig, type NavGroup, type NavItem } from "@/config/site"
import type { SiteSettingsContent } from "./types"

// The "who it's for" audiences. Text (name, short + long description) comes
// from Sanity → Site-wide Content → Audiences. Links, icons and colours stay
// in config/site.ts. Any field missing in Sanity falls back to the config text.

const AUDIENCE_GROUP = "Why ADXC"

const FIELD_BY_HREF = {
    "/brands": "audienceBrands",
    "/agencies": "audienceAgencies",
    "/data-providers": "audienceDataProviders",
    "/ai-platforms": "audienceAiPlatforms",
} as const

export function getAudienceItems(settings: SiteSettingsContent | null): NavItem[] {
    const base = siteConfig.nav.find((g) => g.label === AUDIENCE_GROUP)?.items ?? []
    return base.map((item) => {
        const field = FIELD_BY_HREF[item.href as keyof typeof FIELD_BY_HREF]
        const copy = field ? settings?.[field] : undefined
        return {
            ...item,
            label: copy?.label || item.label,
            description: copy?.shortDescription || item.description,
            longDescription: copy?.longDescription || item.longDescription,
        }
    })
}

// Full header nav with the audience group's items swapped for the Sanity text.
export function getNavWithAudiences(settings: SiteSettingsContent | null): NavGroup[] {
    const audiences = getAudienceItems(settings)
    return siteConfig.nav.map((group) =>
        group.label === AUDIENCE_GROUP ? { ...group, items: audiences } : group
    ) as NavGroup[]
}
