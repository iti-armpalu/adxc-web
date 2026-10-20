import { NextResponse, type NextRequest } from "next/server";
import { getWebSummitContent, isExpired, resolveTier } from "@/lib/cms/websummit";

const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const FORM_GUID = process.env.HUBSPOT_EARLY_ACCESS_FORM_GUID;

// TODO: confirm internal property names on the early-access HubSpot form.
// Each must exist on the form (add the last three as hidden fields).
const HS_FIELDS = {
    role: "adxc_role",
    source: "signup_source",
    qrVariant: "qr_variant",
    creditTier: "credit_tier",
} as const;

// TODO: values must match the role dropdown's internal values in HubSpot
const ROLES = ["Brand", "Agency", "Data provider", "Investor", "Other"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (value: unknown, max = 200) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
    if (!PORTAL_ID || !FORM_GUID) {
        return NextResponse.json({ error: "Sign-up isn't available right now." }, { status: 500 });
    }

    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot filled: pretend success, send nothing
    if (str(body.website)) return NextResponse.json({ ok: true });

    const email = str(body.email, 254).toLowerCase();
    const name = str(body.name, 120);
    const company = str(body.company, 120);
    const role = ROLES.includes(str(body.role)) ? str(body.role) : "";

    if (!EMAIL_RE.test(email) || !name || !company) {
        return NextResponse.json({ error: "Add your work email, full name and company." }, { status: 400 });
    }

    const content = await getWebSummitContent();
    if (isExpired(content)) {
        return NextResponse.json({ error: "This offer has ended." }, { status: 410 });
    }

    // Credits resolved server-side so the tier can't be edited in the browser
    const tier = resolveTier(content, str(body.src, 64));
    const [firstname, ...rest] = name.split(/\s+/);

    const fields = [
        { name: "email", value: email },
        { name: "firstname", value: firstname },
        { name: "lastname", value: rest.join(" ") },
        { name: "company", value: company },
        ...(role ? [{ name: HS_FIELDS.role, value: role }] : []),
        { name: HS_FIELDS.source, value: "websummit" },
        { name: HS_FIELDS.qrVariant, value: tier.variant },
        { name: HS_FIELDS.creditTier, value: String(tier.credits) },
    ];

    const hutk = req.cookies.get("hubspotutk")?.value;

    const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fields,
                context: {
                    ...(hutk ? { hutk } : {}),
                    pageUri: str(body.pageUri, 500),
                    pageName: "Web Summit",
                },
                // TODO: add legalConsentOptions if the early-access form has GDPR consent enabled
            }),
            cache: "no-store",
        },
    );

    if (!res.ok) {
        console.error("[websummit] HubSpot submit failed", res.status, await res.text());
        return NextResponse.json({ error: "We couldn't save your details. Try again in a moment." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
}