export function HeroBackground() {
    return (
        <div className="absolute inset-x-0 -top-16 bottom-0 z-0 overflow-hidden pointer-events-none">

            {/* Rectangle 717 — #66023C, rotated -15deg, positioned from Figma */}
            <div
                style={{
                    position: "absolute",
                    width: "957px",
                    height: "1355px",
                    top: "-133px",
                    left: "1200px",
                    background: "#66023C",
                    transform: "rotate(15deg)",
                    transformOrigin: "top left",
                    overflow: "hidden",
                }}
            >

                {/* Grid overlay — counter-rotated to stay upright */}
                <div
                    className="bg-grid bg-grid-sm absolute opacity-90"
                    style={{
                        inset: "-50%",
                        transform: "rotate(-15deg)",
                        transformOrigin: "center center",
                    }}
                />


                {/* Ellipse — clipped to rectangle */}
                <div
                    style={{
                        position: "absolute",
                        width: "1361px",
                        height: "1361px",
                        top: "-200px",
                        right: "850px",
                        borderRadius: "50%",
                        background: "#C46184",
                        filter: "blur(300px)",

                        /* Test position */
                        // filter: "none",
                        // borderStyle: "solid",
                        // borderWidth: "2px",
                        // borderColor: "#080080",
                    }}
                />

                {/* Ellipse — #32002B, clipped to rectangle */}
                <div
                    style={{
                        position: "absolute",
                        width: "1361px",
                        height: "1361px",
                        top: "300px",
                        left: "150px",
                        borderRadius: "50%",
                        background: "#32002B",
                        filter: "blur(300px)",

                        /* Test position - */
                        // filter: "none",
                        // borderStyle: "solid",
                        // borderWidth: "2px",
                        // borderColor: "#080080",
                    }}
                />


            </div>

            {/* Ellipse 490 — #C46184 */}
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
                    opacity: 0.7,
                }}
            />




        </div>
    )
}