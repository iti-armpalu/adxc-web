type HeroBackgroundProps = {
    gradientFrom?: string
    gradientTo?: string
    glowColor?: string
}

export function HeroBackground({
    gradientFrom = "#66023C",
    gradientTo = "#32002B",
    glowColor = "#C46184",
}: HeroBackgroundProps) {
    return (
        <div className="absolute inset-x-0 -top-[var(--header-h)] bottom-0 z-0 overflow-hidden pointer-events-none">

            {/* Linear gradient */}
            <div
                className="absolute inset-0
                [--stop:68%] [--angle:154deg]
                sm:[--stop:66%] sm:[--angle:140deg]
                md:[--stop:68%] md:[--angle:126deg]
                lg:[--stop:68%] lg:[--angle:124deg]
                xl:[--stop:72%] xl:[--angle:122deg]"
                style={{
                    background: `linear-gradient(var(--angle), transparent 21%, transparent var(--stop), ${gradientFrom} var(--stop), ${gradientTo} 100%)`,
                }}
            />

            {/* Ellipse glow
                Previously a 600px circle with filter: blur(280px), which forces a
                ~2300px off-screen buffer (×3 on iPhone ≈ 150MB+ of GPU memory) and
                crashed iOS Safari. A radial gradient draws the same soft glow with
                no filter cost. Size/opacity tuned to approximate the old look. */}
            <div
                className="absolute
                [--el-top:75%] [--el-left:50%]
                md:[--el-top:85%] md:[--el-left:50%]
                lg:[--el-top:70%] lg:[--el-left:60%]
                xl:[--el-top:50%] xl:[--el-left:70%]"
                style={{
                    width: "1200px",
                    height: "1200px",
                    top: "var(--el-top)",
                    left: "var(--el-left)",
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(closest-side, ${glowColor}, transparent)`,
                    opacity: 0.3,
                }}
            />

            {/* Grid overlay — masked to dark side only */}
            <div
                className="bg-grid absolute inset-0 opacity-30
                [--stop:70%] [--angle:154deg]
                sm:[--stop:66%] sm:[--angle:140deg]
                md:[--stop:68%] md:[--angle:126deg]
                lg:[--stop:68%] lg:[--angle:124deg]
                xl:[--stop:72%] xl:[--angle:122deg]"
                style={{
                    WebkitMaskImage: `linear-gradient(var(--angle), transparent 21%, transparent calc(var(--stop) - 10%), black var(--stop), black 100%)`,
                    maskImage: `linear-gradient(var(--angle), transparent 21%, transparent calc(var(--stop) - 10%), black var(--stop), black 100%)`,
                }}
            />

        </div>
    )
}