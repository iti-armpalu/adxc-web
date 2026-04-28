export function HeroBackground() {
    return (
        <div className="absolute inset-x-0 -top-16 bottom-0 z-0 overflow-hidden pointer-events-none">

            {/* Linear gradient — responsive hard stop and angle via CSS variables */}
            <div
                className="absolute inset-0
            [--stop:68%] [--angle:154deg]
            sm:[--stop:66%] sm:[--angle:140deg]
            md:[--stop:68%] md:[--angle:126deg]
            lg:[--stop:68%] lg:[--angle:124deg]
            xl:[--stop:72%] xl:[--angle:122deg]"
                style={{
                    background: "linear-gradient(var(--angle), transparent 21%, transparent var(--stop), #66023C var(--stop), #32002B 100%)",
                }}
            />

            {/* Ellipse — #C46184 glow, responsive position */}
            {/* Ellipse — #C46184 glow, responsive position */}
            <div
                className="absolute rounded-full
          [--el-top:75%] [--el-left:50%]
          md:[--el-top:85%] md:[--el-left:50%]
          lg:[--el-top:70%] lg:[--el-left:60%]
          xl:[--el-top:50%] xl:[--el-left:70%]"
                style={{
                    width: "600px",
                    height: "600px",
                    top: "var(--el-top)",
                    left: "var(--el-left)",
                    transform: "translate(-50%, -50%)",
                    background: "#C46184",
                    filter: "blur(280px)",
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
                    WebkitMaskImage: "linear-gradient(var(--angle), transparent 21%, transparent calc(var(--stop) - 10%), black var(--stop), black 100%)",
                    maskImage: "linear-gradient(var(--angle), transparent 21%, transparent calc(var(--stop) - 10%), black var(--stop), black 100%)",
                }}
            />

        </div>
    )
}