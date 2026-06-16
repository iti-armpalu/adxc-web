"use server";

import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { DEPT_COOKIE_NAME, MAX_AGE_SECONDS, sign } from "@/lib/gate/token";
import { logGateEvent } from "@/lib/gate/log";

// Blocks open redirects: //evil.com, backslash tricks, non-root paths
function safeNextPath(input: string): string {
    if (!input) return "/dept/calculator";
    if (!input.startsWith("/")) return "/dept/calculator";
    if (input.startsWith("//")) return "/dept/calculator";
    if (input.includes("\\")) return "/dept/calculator";
    return input;
}

// Constant-time comparison — hashes both sides to avoid length leaks
function passwordMatches(provided: string, expected: string): boolean {
    const a = crypto.createHash("sha256").update(provided).digest();
    const b = crypto.createHash("sha256").update(expected).digest();
    return crypto.timingSafeEqual(a, b);
}

export type UnlockState = { ok: true } | { ok: false; error: string };

export async function deptUnlockAction(
    _prevState: UnlockState,
    formData: FormData
): Promise<UnlockState> {
    const expectedPassword = process.env.DEPT_GATE_PASSWORD;
    const secret = process.env.DEPT_GATE_COOKIE_SECRET;

    if (!expectedPassword || !secret) {
        return { ok: false, error: "Server misconfigured" };
    }

    const h = await headers();
    const provided = String(formData.get("password") ?? "");
    const nextPath = safeNextPath(String(formData.get("next") ?? "/dept/calculator"));
    const success = passwordMatches(provided, expectedPassword);

    logGateEvent({
        createdAt: new Date().toISOString(),
        country: h.get("x-vercel-ip-country"),
        success,
    });

    if (!success) {
        return { ok: false, error: "Invalid password" };
    }

    const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
    const token = sign(`exp=${exp}`, secret);

    const cookieStore = await cookies();
    cookieStore.set(DEPT_COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: MAX_AGE_SECONDS,
    });

    redirect(nextPath);
}