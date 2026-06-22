"use client";

import { useRef, useEffect, useState } from "react";

const SENTENCES = [
    {
        id: 1,
        label: "01",
        text: "You've built a brief as best you can using gut instinct and the data your LLM can gather (the killer stat is, on checking, a hallucination…).",
    },
    {
        id: 2,
        label: "02",
        text: "You've been quoted $100K for a data subscription you'd use twice a year.",
    },
    {
        id: 3,
        label: "03",
        text: "You've spent half a Tuesday hunting for category stats across PDFs, free trials, and outdated reports.",
    },
    {
        id: 4,
        label: null,
        text: "Sound familiar?",
    },
    {
        id: 5,
        label: "solution",
        text: "ADXC solves this, giving you instant access to trusted consumer data previously locked behind expensive subscriptions.",
    },
];

const SENTENCE_COUNT = SENTENCES.length;
const slice = 1 / SENTENCE_COUNT;
const fade = slice * 0.15;

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

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * Math.max(0, Math.min(1, t));
}

function invLerp(a: number, b: number, v: number) {
    if (b === a) return 0;
    return Math.max(0, Math.min(1, (v - a) / (b - a)));
}

interface WordRevealProps {
    text: string;
    progress: number;
    start: number; // absolute scroll start for this sentence
}

function WordReveal({ text, progress, start }: WordRevealProps) {
    const words = text.split(" ");

    return (
        <span className="inline">
            {words.map((word, i) => {
                const wordStart = start + fade + (i / words.length) * (slice - fade * 2) * 0.8;
                const wordEnd = wordStart + slice * 0.08;
                const wordOpacity = lerp(0.15, 1, invLerp(wordStart, wordEnd, progress));

                return (
                    <span
                        key={i}
                        style={{
                            display: "inline-block",
                            opacity: wordOpacity,
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

export function HomeProblemSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const progress = useScrollProgress(containerRef as React.RefObject<HTMLElement>);

    function getSentenceState(index: number) {
        const start = index * slice;
        const end = start + slice;
        const isLast = index === SENTENCE_COUNT - 1;

        // Opacity: fade in, hold, fade out — last sentence never fades out
        let globalOpacity = 0;
        if (progress < start) {
            globalOpacity = 0;
        } else if (progress < start + fade) {
            globalOpacity = invLerp(start, start + fade, progress);
        } else if (isLast || progress < end - fade) {
            globalOpacity = 1;
        } else {
            globalOpacity = invLerp(end, end - fade, progress); // fade out
        }

        // Y: enters from below, exits upward — last sentence stays
        let translateY = 0;
        if (progress < start) {
            translateY = 40;
        } else if (progress < start + fade) {
            translateY = lerp(40, 0, invLerp(start, start + fade, progress));
        } else if (!isLast && progress >= end - fade) {
            translateY = lerp(0, -40, invLerp(end - fade, end, progress));
        } else {
            translateY = 0;
        }

        return { start, globalOpacity, translateY };
    }

    const activeDot = Math.min(SENTENCE_COUNT - 1, Math.floor(progress * SENTENCE_COUNT));

    return (
        <div
            ref={containerRef}
            style={{ height: `${SENTENCE_COUNT * 120}vh` }}
            className="relative"
        >
            {/* Sticky viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-50 flex items-center justify-center">

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

                {/* Sentences — all always rendered, opacity driven by scroll */}
                <div className="relative z-10 w-full max-w-4xl px-8 md:px-16">
                    {SENTENCES.map((sentence, index) => {
                        const { start, globalOpacity, translateY } = getSentenceState(index);
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
                                        <div className="flex items-start gap-6 md:gap-10">
                                            <span className="font-mono text-xs tracking-[0.15em] text-brand-400 shrink-0 min-w-10 pt-1.5">
                                                {sentence.label}
                                            </span>
                                            <p
                                                className="font-heading font-medium text-brand-900 leading-[1.15] tracking-[-0.03em]"
                                                style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
                                            >
                                                <WordReveal text={sentence.text} progress={progress} start={start} />
                                            </p>
                                        </div>
                                    ) : index === SENTENCE_COUNT - 2 ? (
                                        <div className="text-center">
                                            <p
                                                className="font-heading font-bold text-primary tracking-[-0.04em] leading-none"
                                                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                                            >
                                                {sentence.text}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-6 md:gap-10">
                                            <span className="font-mono text-xs tracking-[0.15em] text-brand-400 shrink-0 min-w-10 pt-1.5">
                                                {sentence.label}
                                            </span>
                                            <p
                                                className="font-heading font-medium text-brand-900 leading-[1.15] tracking-[-0.03em]"
                                                style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
                                            >
                                                <WordReveal text={sentence.text} progress={progress} start={start} />
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
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeDot ? "w-7 bg-brand-600" : "w-1.5 bg-brand-200"
                                }`}
                        />
                    ))}
                </div>

                {/* Scroll hint */}
                <div
                    className="absolute bottom-10 right-10 z-20 flex flex-col items-center gap-2"
                    style={{ opacity: Math.max(0, 1 - progress * 8) }}
                >
                    <span
                        className="font-mono text-[0.625rem] tracking-[0.15em] text-brand-300 uppercase"
                        style={{ writingMode: "vertical-rl" }}
                    >
                        scroll
                    </span>
                    <div className="w-px h-8 bg-gradient-to-b from-brand-300 to-transparent" />
                </div>
            </div>
        </div>
    );
}