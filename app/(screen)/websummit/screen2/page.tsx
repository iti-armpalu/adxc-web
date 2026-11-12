import type { Metadata } from "next"
import { ScreenStage } from "@/components/sections/websummit-screen/screen-stage"
import { HeroBackground } from "@/components/sections/home/hero-background"
import { HeroGraphic } from "@/components/sections/home/hero-graphic"

// Booth monitor display for Web Summit (1920×1080). Not linked anywhere — remove after the event.
export const metadata: Metadata = {
    title: "ADXC at Web Summit",
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export const dynamic = "force-static"

// Scales the home graphic (built for a ~640px column) up to fill the screen's right side
const GRAPHIC_ZOOM = 1.6

export default function WebSummitScreenPage() {
    return (
        <ScreenStage>
            <section className="relative w-full h-full overflow-hidden">
                <HeroBackground showCut={false} />

                <div className="relative z-10 h-full flex flex-col pl-24 pr-10">
                    <header className="h-40 shrink-0 flex items-center gap-10">
                        <img
                            src="/adxc-logo-with-tagline.svg"
                            alt="ADXC — The Agentic Data Exchange"
                            width={771}
                            height={310}
                            className="h-24 w-auto"
                        />
                        <span className="h-20 w-px bg-border-4" aria-hidden />
                        <p className="max-w-[720px] text-[22px] leading-snug text-foreground-alt">
                            <span className="text-foreground">The trusted data layer for marketing AI.</span>{" "}
                            ADXC connects AI tools to consumer research from leading data providers, charged per question.
                        </p>
                    </header>

                    <div className="flex-1 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-12 pb-40">
                        <h1 className="text-[80px] leading-[1.05] whitespace-nowrap">
                            The trusted
                            <br />
                            data
                            <br />
                            layer for
                            <br />
                            marketing AI
                            <br />

                        </h1>

                        <div className="pointer-events-none" style={{ zoom: GRAPHIC_ZOOM }} aria-hidden>
                            <HeroGraphic />
                        </div>
                    </div>

                    <p className="absolute bottom-16 right-24 text-[28px] leading-none text-brand-100">
                        *of tokens, we&rsquo;re a startup
                    </p>
                </div>
            </section>
        </ScreenStage>
    )
}
