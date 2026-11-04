// app/(marketing)/layout.tsx
import { HeaderWrapper } from "@/components/global/header-wrapper"
import { Footer } from "@/components/global/footer"
import { getSiteSettings } from "@/lib/cms/queries"
import { siteConfig } from "@/config/site"

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
    const settings = await getSiteSettings()

    // Falls back to the config tagline so the footer never renders empty
    // if the Studio document is missing or not yet published.
    const footerDescription = settings?.footerDescription ?? siteConfig.tagline

    return (
        <>
            <HeaderWrapper />
            <main>{children}</main>
            <Footer description={footerDescription} />
        </>
    )
}
