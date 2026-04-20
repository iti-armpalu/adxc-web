// app/(marketing)/layout.tsx
import { HeaderWrapper } from "@/components/global/header-wrapper"
import { Footer } from "@/components/global/footer"
import { AIWidget } from "@/components/global/ai-widget"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderWrapper />
            <main className="flex-1">{children}</main>
            <Footer />
            <AIWidget />
        </>
    )
}