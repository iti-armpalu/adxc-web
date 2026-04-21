const SIZE = 148
const RING = 6

export function AdxcUnit() {
    return (
        <div className="relative flex items-center justify-center shrink-0 pl-2" aria-label="ADXC">
            {/* Spinning conic ring */}
            <div
                className="absolute rounded-full animate-spin"
                style={{
                    width: SIZE + RING * 2,
                    height: SIZE + RING * 2,
                    background:
                        "conic-gradient(from 0deg, #66023C 0deg, rgba(102,2,60,0) 120deg, rgba(102,2,60,0) 240deg, #66023C 360deg)",
                    animationDuration: "2.4s",
                    maskImage: `radial-gradient(circle, transparent ${SIZE / 2}px, black ${SIZE / 2 + 0.5}px)`,
                    WebkitMaskImage: `radial-gradient(circle, transparent ${SIZE / 2}px, black ${SIZE / 2 + 0.5}px)`,
                }}
            />
            <div
                className="relative rounded-full border-2 bg-background flex items-center justify-center shadow-2xl"
                style={{
                    width: SIZE,
                    height: SIZE,
                    borderColor: "#66023C",
                }}
            >
                <span
                    className="text-4xl font-extrabold tracking-widest leading-none text-center"
                    style={{ color: "#66023C" }}
                >
                    AD<br />XC
                </span>
            </div>
        </div>
    )
}