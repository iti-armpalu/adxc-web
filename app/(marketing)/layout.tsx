// app/(marketing)/layout.tsx

import { Footer } from "@/components/global/footer";
import { Header } from "@/components/global/header";


export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
        </>
    )
}