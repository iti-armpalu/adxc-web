"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CLAIMED_EVENT } from "./claim-form";

export function StickyClaimBar({ label }: { label: string }) {
    const [visible, setVisible] = useState(false);
    const [claimed, setClaimed] = useState(false);

    useEffect(() => {
        const target = document.getElementById("claim");
        if (!target) return;

        // Show only once the form has scrolled off the top of the screen
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        });
        observer.observe(target);

        const onClaimed = () => setClaimed(true);
        window.addEventListener(CLAIMED_EVENT, onClaimed);

        return () => {
            observer.disconnect();
            window.removeEventListener(CLAIMED_EVENT, onClaimed);
        };
    }, []);

    function scrollToForm() {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById("claim")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        document.getElementById("ws-email")?.focus({ preventScroll: true });
    }

    if (claimed) return null;

    return (
        <div
            className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-transform duration-200 motion-reduce:transition-none md:hidden ${visible ? "translate-y-0" : "pointer-events-none translate-y-full"
                }`}
            aria-hidden={!visible}
        >
            <Button
                type="button"
                size="lg"
                onClick={scrollToForm}
                tabIndex={visible ? 0 : -1}
                className="h-12 w-full rounded-xs text-base"
            >
                {label}
            </Button>
        </div>
    );
}