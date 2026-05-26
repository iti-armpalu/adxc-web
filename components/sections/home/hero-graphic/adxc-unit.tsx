import Image from "next/image"

// const SIZE = 148
// const RING = 6

const DEFAULT_SIZE = 148
const DEFAULT_RING = 6

interface AdxcUnitProps {
    size?: number
    ring?: number
}

export function AdxcUnit({ size = DEFAULT_SIZE, ring = DEFAULT_RING }: AdxcUnitProps) {
    const logoSize = Math.round(size * 0.4)

    return (
        <div className="relative flex items-center justify-center shrink-0 pl-3" aria-label="ADXC">
            {/* Spinning conic ring */}
            <div
                className="absolute rounded-full animate-spin"
                style={{
                    width: size + ring * 2,
                    height: size + ring * 2,
                    background:
                        "conic-gradient(from 0deg, #66023C 0deg, rgba(102,2,60,0) 120deg, rgba(102,2,60,0) 240deg, #66023C 360deg)",
                    animationDuration: "2.4s",
                    maskImage: `radial-gradient(circle, transparent ${size / 2}px, black ${size / 2 + 0.5}px)`,
                    WebkitMaskImage: `radial-gradient(circle, transparent ${size / 2}px, black ${size / 2 + 0.5}px)`,
                }}
            />
            <div
                className="relative rounded-full border-2 bg-background flex items-center justify-center shadow-2xl"
                style={{ width: size, height: size, borderColor: "#66023C" }}
            >
                <Image
                    src="/adxc-logo-primary-stacked.svg"
                    alt="ADXC"
                    width={60}
                    height={60}
                    className="object-contain"
                />
            </div>
        </div>
    )
}