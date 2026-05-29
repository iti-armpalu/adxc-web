"use client";

import { useRef, useEffect, useState } from "react";

const SENTENCES = [
    {
        id: 1,
        label: "01",
        text: "You commission a study. Six weeks later you get a deck with a bar chart and a caveat.",
    },
    {
        id: 2,
        label: "02",
        text: "You brief an agency. They resurface last year's syndicated data and call it insight.",
    },
    {
        id: 3,
        label: "03",
        text: "You ask your AI tool. It hallucinates a statistic and cites a source that doesn't exist.",
    },
    {
        id: 4,
        label: null,
        text: "Sound familiar?",
    },
];

const SENTENCE_COUNT = SENTENCES.length;

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const totalScrollable = el.scrollHeight - window.innerHeight;
            const scrolled = -rect.top;
            const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
            setProgress(p);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [ref]);

    return progress;
}

interface WordRevealProps {
    text: string;
    progress: number;
    phase: "before" | "in" | "after";
}

function WordReveal({ text, progress, phase }: WordRevealProps) {
    const words = text.split(" ");
    const revealProgress = Math.min(1, progress / 0.6);

    return (
        <span className="inline">
            {words.map((word, i) => {
                const threshold = i / words.length;
                const wordProgress = Math.max(
                    0,
                    Math.min(1, (revealProgress - threshold) / (1 / words.length))
                );
                const opacity = phase === "after" ? 0 : phase === "before" ? 0 : wordProgress;
                const translateY = phase === "after" ? -8 : phase === "before" ? 8 : (1 - wordProgress) * 10;

                return (
                    <span
                        key={i}
                        style={{
                            display: "inline-block",
                            opacity,
                            transform: `translateY(${translateY}px)`,
                            transition: "none",
                            marginRight: "0.25em",
                        }}
                    >
                        {word}
                    </span>
                );
            })}
        </span>
    );
}

export function BrandsProblem() {
    const containerRef = useRef<HTMLDivElement>(null);
    const progress = useScrollProgress(containerRef as React.RefObject<HTMLElement>);

    const windowSize = 1 / SENTENCE_COUNT;

    function getSentenceState(index: number): {
        phase: "before" | "in" | "after";
        localProgress: number;
        globalOpacity: number;
        translateY: number;
    } {
        const start = index * windowSize;
        const end = start + windowSize;

        const isLast = index === SENTENCE_COUNT - 1;

        const localProgress = Math.max(0, Math.min(1, (progress - start) / windowSize));

        let phase: "before" | "in" | "after" = "before";
        if (progress >= start && progress < end) {
            phase = "in";
        } else if (progress >= end) {
            phase = isLast ? "in" : "after";
        }

        let globalOpacity = 0;
        if (phase === "in") {
            const fadeIn = Math.min(1, localProgress / 0.2);
            const fadeOut = isLast ? 1 : 1 - Math.max(0, (localProgress - 0.7) / 0.3);
            globalOpacity = Math.min(fadeIn, fadeOut);
        }

        let translateY = 0;
        if (phase === "before") {
            translateY = 40;
        } else if (phase === "in") {
            const enterOffset = Math.max(0, 1 - localProgress / 0.2) * 40;
            const exitOffset = isLast ? 0 : Math.max(0, (localProgress - 0.7) / 0.3) * -40;
            translateY = enterOffset + exitOffset;
        } else if (phase === "after") {
            translateY = -40;
        }

        return { phase, localProgress, globalOpacity, translateY };
    }

    const activeDot = Math.min(SENTENCE_COUNT - 1, Math.floor(progress * SENTENCE_COUNT));

    return (
        <div
            ref={containerRef}
            style={{ height: `${SENTENCE_COUNT * 120}vh` }}
            className="relative"
        >
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-purple-50 flex items-center justify-center">



                {/* Diagonal grid overlay */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                        WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                    }}
                >
                    <div className="absolute inset-0 bg-grid opacity-20" />
                </div>

                {/* Sentences */}
                <div className="relative z-10 w-full max-w-4xl px-8 md:px-16">
                    {SENTENCES.map((sentence, index) => {
                        const { phase, localProgress, globalOpacity, translateY } = getSentenceState(index);
                        const isLast = index === SENTENCE_COUNT - 1;

                        return (
                            <div
                                key={sentence.id}
                                className="absolute inset-0 flex items-center justify-center px-8 md:px-16 pointer-events-none"
                                style={{
                                    opacity: globalOpacity,
                                    transform: `translateY(${translateY}px)`,
                                }}
                            >
                                <div className="w-full max-w-4xl">
                                    {isLast ? (
                                        <p
                                            className="font-heading font-bold text-purple-700 text-center tracking-[-0.04em] leading-none"
                                            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                                        >
                                            {sentence.text}
                                        </p>
                                    ) : (
                                        <div className="flex items-start gap-6 md:gap-10">
                                            {/* Label */}
                                            <span
                                                className="font-mono text-xs tracking-[0.15em] text-purple-400 shrink-0 min-w-10 pt-1.5"
                                                style={{ opacity: globalOpacity > 0.1 ? 1 : 0 }}
                                            >
                                                {sentence.label}
                                            </span>

                                            {/* Text */}
                                            <p
                                                className="font-heading font-medium text-purple-900 leading-[1.15] tracking-[-0.03em]"
                                                style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
                                            >
                                                <WordReveal text={sentence.text} progress={localProgress} phase={phase} />
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {SENTENCES.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeDot ? "w-7 bg-purple-600" : "w-1.5 bg-purple-200"
                                }`}
                        />
                    ))}
                </div>

                {/* Scroll hint */}
                <div
                    className="absolute bottom-10 right-10 z-20 flex flex-col items-center gap-2 transition-opacity duration-100"
                    style={{ opacity: Math.max(0, 1 - progress * 8) }}
                >
                    <span
                        className="font-mono text-[0.625rem] tracking-[0.15em] text-purple-300 uppercase"
                        style={{ writingMode: "vertical-rl" }}
                    >
                        scroll
                    </span>
                    <div
                        className="w-px h-8 bg-gradient-to-b from-purple-300 to-transparent"
                    />
                </div>
            </div>
        </div>
    );
}