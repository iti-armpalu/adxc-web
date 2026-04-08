"use client"

export type ConsentState = {
    essential: true       // always true, never asked
    analytics: boolean
    marketing: boolean
}

export type ConsentStatus = "unset" | "accepted" | "declined" | "custom"

const CONSENT_KEY = "adxc_cookie_consent"
const CONSENT_VERSION = "1" // bump this to re-prompt after policy changes

export type StoredConsent = {
    version: string
    status: ConsentStatus
    state: ConsentState
    updatedAt: string
}

export const defaultConsent: ConsentState = {
    essential: true,
    analytics: false,
    marketing: false,
}

export const fullConsent: ConsentState = {
    essential: true,
    analytics: true,
    marketing: true,
}

export function getStoredConsent(): StoredConsent | null {
    if (typeof window === "undefined") return null
    try {
        const raw = localStorage.getItem(CONSENT_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw) as StoredConsent
        // Re-prompt if policy version changed
        if (parsed.version !== CONSENT_VERSION) return null
        return parsed
    } catch {
        return null
    }
}

export function setStoredConsent(status: ConsentStatus, state: ConsentState): void {
    if (typeof window === "undefined") return
    const stored: StoredConsent = {
        version: CONSENT_VERSION,
        status,
        state,
        updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(stored))
}

export function clearStoredConsent(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(CONSENT_KEY)
}

export function hasConsented(): boolean {
    const stored = getStoredConsent()
    return stored !== null
}