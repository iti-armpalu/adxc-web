import { HeroCut } from "./hero-cut"

export const ADXC_DEFAULT_SIZE = 120
export const ADXC_PAD = 12 // pl-3 — offsets the circle centre 6px right of the unit's centre
const DEFAULT_RING = 6

interface AdxcUnitProps {
    size?: number
    ring?: number
    cut?: boolean // draw the hero's dark half pivoting on this circle
}

export function AdxcUnit({ size = ADXC_DEFAULT_SIZE, ring = DEFAULT_RING, cut = false }: AdxcUnitProps) {
    const logoSize = Math.round(size * 0.4)
    const brandColor = "var(--color-brand-700)"

    return (
        <div className="relative flex items-center justify-center shrink-0 pl-3" aria-label="ADXC">
            {/* Spinning conic ring */}
            <div
                className="absolute rounded-full animate-spin"
                style={{
                    width: size + ring * 2,
                    height: size + ring * 2,
                    background: `conic-gradient(from 0deg, var(--color-brand-700) 0deg, oklch(from var(--color-brand-700) l c h / 0) 120deg, oklch(from var(--color-brand-700) l c h / 0) 240deg, var(--color-brand-700) 360deg)`,
                    animationDuration: "2.4s",
                    maskImage: `radial-gradient(circle, transparent ${size / 2}px, black ${size / 2 + 0.5}px)`,
                    WebkitMaskImage: `radial-gradient(circle, transparent ${size / 2}px, black ${size / 2 + 0.5}px)`,
                }}
            />
            <div
                className="relative rounded-full border-4 bg-background flex items-center justify-center shadow-2xl"
                style={{ width: size, height: size, borderColor: brandColor }}
            >
                {cut && <HeroCut />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/adxc-logo-primary-stacked.svg"
                    alt="ADXC"
                    width={logoSize}
                    height={logoSize}
                    className="object-contain"
                />
            </div>
        </div>
    )
}