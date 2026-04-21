export function ConnectingLine() {
    return (
        <div className="relative h-12 w-16 shrink-0" aria-hidden>
            <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                viewBox="0 0 100 24"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient
                        id="cl-line-grad"
                        gradientUnits="userSpaceOnUse"
                        x1="0" y1="0" x2="40" y2="0"
                        spreadMethod="repeat"
                    >
                        <stop offset="0%" stopColor="hsl(var(--gradient-flow-from))" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(var(--gradient-flow-from))" stopOpacity="1" />
                        <stop offset="100%" stopColor="hsl(var(--gradient-flow-to))" stopOpacity="0" />
                        <animateTransform
                            attributeName="gradientTransform"
                            type="translate"
                            from="0 0" to="40 0"
                            dur="1.4s"
                            repeatCount="indefinite"
                        />
                    </linearGradient>
                </defs>
                <line
                    x1="0" y1="12" x2="100" y2="12"
                    stroke="url(#cl-line-grad)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    )
}