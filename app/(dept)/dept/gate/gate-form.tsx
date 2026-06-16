"use client"

import { useActionState } from "react"
import { deptUnlockAction, type UnlockState } from "@/lib/gate/dept-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initial: UnlockState = { ok: false, error: "" }

export function DeptGateForm() {
    const [state, action, pending] = useActionState(deptUnlockAction, initial)

    const hasError = state.ok === false && !!state.error

    return (
        <form action={action} className="space-y-4">
            <input type="hidden" name="next" value="/dept/calculator" />

            <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter access password"
                    autoComplete="current-password"
                    autoFocus
                    required
                    disabled={pending}
                    aria-describedby={hasError ? "gate-error" : undefined}
                    aria-invalid={hasError}
                />
                {hasError && (
                    <p
                        id="gate-error"
                        role="alert"
                        className="text-sm text-destructive-text"
                    >
                        {state.error}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={pending} className="w-full">
                {pending ? (
                    <span className="flex items-center gap-2">
                        <span className="size-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-adxc-spin" />
                        Verifying…
                    </span>
                ) : (
                    "Access Calculator"
                )}
            </Button>
        </form>
    )
}