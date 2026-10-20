"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster: string | null; title: string };

/**
 * Loads nothing but the poster until the video nears the viewport.
 * Autoplays muted, except for reduced-motion or Data Saver users.
 */
export function DemoVideo({ src, poster, title }: Props) {
    const ref = useRef<HTMLVideoElement>(null);
    const [inView, setInView] = useState(false);
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        setAutoplay(!reduceMotion && !saveData);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (inView && autoplay) ref.current?.play().catch(() => { });
    }, [inView, autoplay]);

    return (
        <video
            ref={ref}
            src={inView ? src : undefined}
            poster={poster ?? undefined}
            muted
            playsInline
            controls
            preload="none"
            aria-label={title}
            className="aspect-video w-full rounded-lg border border-border bg-muted object-cover"
        />
    );
}