export function HeroBackground() {
    return (
        <div className="absolute inset-x-0 -top-16 bottom-0 z-0 overflow-hidden pointer-events-none">

            {/* Linear gradient — transparent left, hard diagonal stop, dark right */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(122deg, transparent 21%, transparent 72%, #66023C 72%, #32002B 100%)",
                }}
            />

            {/* Ellipse — #C46184 glow, sits behind the graphic */}
            <div
                style={{
                    position: "absolute",
                    width: "716px",
                    height: "716px",
                    top: "175px",
                    left: "702px",
                    borderRadius: "50%",
                    background: "#C46184",
                    filter: "blur(300px)",
                    opacity: 0.2,
                }}
            />

            {/* Grid overlay — masked so it fades out on the light side */}
            <div
                className="bg-grid bg-grid-sm absolute inset-0 opacity-30"
                style={{
                    WebkitMaskImage: "linear-gradient(120deg, transparent 21%, transparent 68%, black 72%, black 100%)",
                    maskImage: "linear-gradient(120deg, transparent 21%, transparent 68%, black 72%, black 100%)",
                }}
            />

        </div>
    )
}