"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CLAIMED_EVENT = "websummit:claimed";

const ROLES = ["Brand", "Agency", "Data provider", "Investor", "Other"] as const;

type Props = {
    src: string;
    ctaLabel: string;
    microcopy: string;
    betaAccessLabel: string;
    linkedinUrl: string | null;
};

type Status = "idle" | "submitting" | "success" | "error";

export function ClaimForm({ src, ctaLabel, microcopy, betaAccessLabel, linkedinUrl }: Props) {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<string | null>(null);
    const [submittedEmail, setSubmittedEmail] = useState("");
    const confirmationRef = useRef<HTMLHeadingElement>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setStatus("submitting");
        setError(null);

        try {
            const res = await fetch("/api/websummit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.get("email"),
                    name: data.get("name"),
                    company: data.get("company"),
                    role: data.get("role"),
                    website: data.get("website"), // honeypot
                    src,
                    pageUri: window.location.href,
                }),
            });

            const json = (await res.json().catch(() => ({}))) as { error?: string };
            if (!res.ok) throw new Error(json.error ?? "We couldn't save your details. Try again in a moment.");

            setSubmittedEmail(String(data.get("email") ?? ""));
            setStatus("success");
            window.dispatchEvent(new Event(CLAIMED_EVENT));
            requestAnimationFrame(() => confirmationRef.current?.focus());
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "We couldn't save your details. Try again in a moment.");
        }
    }

    if (status === "success") {
        return (
            <div id="claim" className="animate-adxc-fade scroll-mt-4 rounded-lg border border-border bg-card p-5 shadow-sm md:p-6">
                <CheckCircle2 aria-hidden="true" className="size-8 text-success" />
                <h2 ref={confirmationRef} tabIndex={-1} className="mt-4 text-2xl leading-tight outline-none">
                    Your credits are reserved
                </h2>
                <p className="mt-3 text-foreground-alt">
                    Beta access opens in {betaAccessLabel}. You&rsquo;ll get an email from ADXC at{" "}
                    <span className="font-medium text-card-foreground">{submittedEmail}</span> with your login details, and your
                    credits will be ready to use.
                </p>
                {linkedinUrl && (
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block text-sm font-medium text-primary underline underline-offset-4"
                    >
                        Follow ADXC on LinkedIn
                    </a>
                )}
            </div>
        );
    }

    const submitting = status === "submitting";

    return (
        <div id="claim" className="scroll-mt-4 rounded-lg border border-border bg-card p-5 shadow-sm md:p-6">
            {/* data-hs-do-not-collect stops HubSpot's collected-forms script double-submitting this form */}
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="space-y-3">
                <div className="space-y-1.5">
                    <Label htmlFor="ws-email">Work email</Label>
                    <Input
                        id="ws-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        enterKeyHint="next"
                        className="h-11 rounded-xs"
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="ws-name">Full name</Label>
                    <Input id="ws-name" name="name" required autoComplete="name" enterKeyHint="next" className="h-11 rounded-xs" />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="ws-company">Company</Label>
                    <Input
                        id="ws-company"
                        name="company"
                        required
                        autoComplete="organization"
                        enterKeyHint="next"
                        className="h-11 rounded-xs"
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="ws-role">
                        Role <span className="font-normal text-muted-foreground">(optional)</span>
                    </Label>
                    {/* Native select: opens the OS picker on mobile, tap only, no extra JS */}
                    <select
                        id="ws-role"
                        name="role"
                        defaultValue=""
                        className="h-11 w-full rounded-xs border border-input bg-transparent px-3 text-base text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                    >
                        <option value="">Select your role</option>
                        {ROLES.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Honeypot — hidden from people and assistive tech */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label>
                        Website
                        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </label>
                </div>

                {error && (
                    <p role="alert" className="text-sm text-destructive-text">
                        {error}
                    </p>
                )}

                <Button type="submit" size="lg" disabled={submitting} className="mt-1 h-12 w-full rounded-xs text-base">
                    {submitting && <Loader2 aria-hidden="true" className="size-4 animate-adxc-spin" />}
                    {submitting ? "Claiming…" : ctaLabel}
                </Button>

                <p className="text-center text-sm text-muted-foreground">{microcopy}</p>
            </form>
        </div>
    );
}