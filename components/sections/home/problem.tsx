"use client";

import { useRef, useEffect, useState } from "react";

interface HomeProblemSectionProps {
    sentenceOne: string
    sentenceTwo: string
    sentenceThree: string
    punchline: string
    solution: string
}

// Labels are derived here, not stored in Sanity — only the first three
// sentences get a numbered label; punchline/solution never do.
// Sentence count is fixed at 5 by the schema (see homeType.ts) so the
// scroll-slice math below can safely assume SENTENCE_COUNT = 5.

const SENTENCE_COUNT = 5;
const slice = 1 / SENTENCE_COUNT;
const fade = slice * 0.15;

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * Math.max(0, Math.min(1, t));
}

function invLerp(a: number, b: number, v: number) {
    if (b === a) return 0;
    return Math.max(0, Math.min(1, (v - a) / (b - a)));
}

function getSentenceState(index: number, progress: number) {
    const start = index * slice;
    const end = start + slice;
    const isLast = index === SENTENCE_COUNT - 1;

    // Opacity: fade in, hold, fade out — last sentence never fades out
    let opacity = 0;
    if (progress < start) {
        opacity = 0;
    } else if (progress < start + fade) {
        opacity = invLerp(start, start + fade, progress);
    } else if (isLast || progress < end - fade) {
        opacity = 1;
    } else {
        opacity = invLerp(end, end - fade, progress); // fade out
    }

    // Y: enters from below, exits upward — last sentence stays
    let translateY = 0;
    if (progress < start) {
        translateY = 40;
    } else if (progress < start + fade) {
        translateY = lerp(40, 0, invLerp(start, start + fade, progress));
    } else if (!isLast && progress >= end - fade) {
        translateY = lerp(0, -40, invLerp(end - fade, end, progress));
    }

    return { opacity, translateY };
}

function getWordOpacity(wordIndex: number, wordCount: number, sentenceIndex: number, progress: number) {
    const start = sentenceIndex * slice;
    const wordStart = start + fade + (wordIndex / wordCount) * (slice - fade * 2) * 0.8;
    const wordEnd = wordStart + slice * 0.08;
    return lerp(0.15, 1, invLerp(wordStart, wordEnd, progress));
}

// Performance notes (mobile Safari):
// - Scroll progress is read once per animation frame and written straight to
//   the DOM via refs. No React state per scroll, so nothing re-renders.
// - Invisible sentences get visibility:hidden so the browser skips painting them.
// - Only words in visible sentences are updated.
// - The masked grid sits on its own compositing layer so it isn't repainted
//   under the changing text.

export function HomeProblemSection({
    sentenceOne,
    sentenceTwo,
    sentenceThree,
    punchline,
    solution,
}: HomeProblemSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);
    const wordRefs = useRef<(HTMLSpanElement | null)[][]>([]);
    const hintRef = useRef<HTMLDivElement>(null);
    const [activeDot, setActiveDot] = useState(0);

    const SENTENCES = [
        { id: 1, label: "01", text: sentenceOne },
        { id: 2, label: "02", text: sentenceTwo },
        { id: 3, label: "03", text: sentenceThree },
        { id: 4, label: null, text: punchline },
        { id: 5, label: null, text: solution },
    ];

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let frame = 0;

        const update = () => {
            frame = 0;
            const rect = el.getBoundingClientRect();
            const totalScrollable = el.offsetHeight - window.innerHeight;
            const progress =
                totalScrollable > 0 ? Math.max(0, Math.min(1, -rect.top / totalScrollable)) : 0;

            for (let i = 0; i < SENTENCE_COUNT; i++) {
                const node = sentenceRefs.current[i];
                if (!node) continue;

                const { opacity, translateY } = getSentenceState(i, progress);
                node.style.opacity = String(opacity);
                node.style.transform = `translate3d(0, ${translateY}px, 0)`;
                node.style.visibility = opacity === 0 ? "hidden" : "visible";

                const words = wordRefs.current[i];
                if (words && opacity > 0) {
                    for (let w = 0; w < words.length; w++) {
                        const word = words[w];
                        if (word) word.style.opacity = String(getWordOpacity(w, words.length, i, progress));
                    }
                }
            }

            if (hintRef.current) {
                hintRef.current.style.opacity = String(Math.max(0, 1 - progress * 8));
            }

            // React bails out when the value is unchanged, so this only re-renders
            // when the active sentence actually changes (5 times per full scroll).
            setActiveDot(Math.min(SENTENCE_COUNT - 1, Math.floor(progress * SENTENCE_COUNT)));
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const renderWords = (text: string, sentenceIndex: number) => {
        const words = text.split(" ");
        return words.map((word, i) => (
            <span
                key={i}
                className="opacity-[0.15]"
                ref={(node) => {
                    if (!wordRefs.current[sentenceIndex]) wordRefs.current[sentenceIndex] = [];
                    wordRefs.current[sentenceIndex][i] = node;
                }}
            >
                {word}
                {i < words.length - 1 ? " " : ""}
            </span>
        ));
    };

    return (
        <div
            ref={containerRef}
            style={{ height: `${SENTENCE_COUNT * 120}vh` }}
            className="relative"
        >
            {/* Sticky viewport — svh avoids jumps when the iOS toolbar shows/hides */}
            <div className="sticky top-0 h-svh w-full overflow-hidden bg-brand-50 flex items-center justify-center">

                {/* Diagonal grid overlay — own layer so it's painted once */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                        WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                        transform: "translateZ(0)",
                    }}
                >
                    <div className="absolute inset-0 bg-grid opacity-20" />
                </div>

                {/* Sentences — positioned absolutely, opacity/transform driven by scroll */}
                <div className="relative z-10 w-full max-w-4xl px-8 md:px-16">
                    {SENTENCES.map((sentence, index) => {
                        const isPunchline = index === SENTENCE_COUNT - 2;

                        return (
                            <div
                                key={sentence.id}
                                ref={(node) => {
                                    sentenceRefs.current[index] = node;
                                }}
                                className="absolute inset-0 flex items-center justify-center px-8 md:px-16 pointer-events-none opacity-0 invisible"
                            >
                                <div className="w-full max-w-4xl">
                                    {isPunchline ? (
                                        <div className="text-center">
                                            <p
                                                className="font-heading font-bold text-primary tracking-[-0.04em] leading-none"
                                                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                                            >
                                                {sentence.text}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col md:flex-row items-start gap-3 md:gap-10">
                                            {/* Mobile: label stacks above the text. md+: label sits left.
                                                Unlabelled sentence keeps the empty column on md+ for alignment,
                                                but is removed on mobile so it doesn't add a gap. */}
                                            <span
                                                className={`font-mono text-xs tracking-[0.15em] text-brand-400 shrink-0 md:min-w-10 md:pt-1.5 ${sentence.label ? "" : "hidden md:block"
                                                    }`}
                                            >
                                                {sentence.label}
                                            </span>
                                            <p
                                                className="font-heading font-medium text-brand-900 leading-[1.15] tracking-[-0.03em]"
                                                style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
                                            >
                                                {renderWords(sentence.text, index)}
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
                            className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === activeDot ? "w-7 bg-brand-600" : "w-1.5 bg-brand-200"
                                }`}
                        />
                    ))}
                </div>

                {/* Scroll hint */}
                <div
                    ref={hintRef}
                    className="absolute bottom-10 right-10 z-20 flex flex-col items-center gap-2"
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