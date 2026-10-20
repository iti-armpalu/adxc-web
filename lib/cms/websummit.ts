import { sanityClient } from "./client"; // TODO: confirm path to the public Sanity client

export type WebSummitTier = { key: string; credits: number };

export type WebSummitPartner = { name: string; logoUrl: string | null };

export type WebSummitContent = {
    headline: string; // supports a {credits} token
    subhead: string;
    creditsDefault: number;
    tiers: WebSummitTier[];
    endsAt: string; // ISO datetime — claim deadline and page expiry
    betaAccessLabel: string; // e.g. "mid-November"
    ctaLabel: string;
    steps: { title: string; body: string }[];
    example: { question: string; price: string; abstract: string; sources: string[] };
    riskPoints: { title: string; body: string }[];
    faq: { question: string; answer: string }[];
    partners: WebSummitPartner[];
    videoUrl: string | null;
    posterUrl: string | null;
    contactEmail: string;
    linkedinUrl: string | null;
    expiredRedirect: string;
};

const QUERY = /* groq */ `*[_type == "websummitPage"][0]{
  headline,
  subhead,
  creditsDefault,
  tiers[]{ key, credits },
  endsAt,
  betaAccessLabel,
  ctaLabel,
  steps[]{ title, body },
  example{ question, price, abstract, sources },
  riskPoints[]{ title, body },
  faq[]{ question, answer },
  // TODO: replace with the existing partners section projection, mapped to { name, logoUrl }
  "partners": [],
  "videoUrl": video.asset->url,
  "posterUrl": poster.asset->url + "?w=1200&auto=format&q=70",
  contactEmail,
  linkedinUrl,
  expiredRedirect
}`;

// TODO: replace placeholder copy, credit amounts and the example answer once Josh confirms them in Sanity
export const WEBSUMMIT_FALLBACK: WebSummitContent = {
    headline: "Great to meet you at Web Summit. Here are {credits} free research credits.",
    subhead:
        "Ask questions in Miro, get answers from premium consumer data providers, pay only for the answers you approve.",
    creditsDefault: 50,
    tiers: [
        { key: "booth", credits: 50 },
        { key: "talk", credits: 75 },
        { key: "vip", credits: 150 },
    ],
    endsAt: "2026-11-30T23:59:59Z",
    betaAccessLabel: "mid-November",
    ctaLabel: "Claim my credits",
    steps: [
        {
            title: "Ask in Miro",
            body: "Type your question to the ADXC agent in Miro Sidekick, the way you'd brief a researcher.",
        },
        {
            title: "See a fixed price and a summary",
            body: "ADXC routes your question to the right data providers and shows you the price and a short abstract first.",
        },
        {
            title: "Approve only what you want",
            body: "Pay for the full answer only if the summary is worth it. Nothing is charged until you approve.",
        },
    ],
    example: {
        question: "Why do UK Gen Z shoppers switch grocery brands?",
        price: "$3.40",
        abstract:
            "Price leads for about half of 18–24 shoppers, followed by own-label quality and promotions seen on social. Switching is highest in household staples and lowest in fresh produce.",
        sources: ["YouGov", "Reddit"],
    },
    riskPoints: [
        { title: "Free credits to start", body: "Your Web Summit credits cover your first questions." },
        { title: "No card needed", body: "Sign up with your work email. No payment details." },
        {
            title: "Raw data never exposed",
            body: "Every result is a synthesised answer. Providers' raw data stays with them.",
        },
    ],
    faq: [
        {
            question: "What happens after I sign up?",
            answer:
                "We add you to the beta list. When access opens, you'll get an email from ADXC with your login details and your credits ready to use.",
        },
        { question: "When do I get access?", answer: "Beta access rolls out from mid-November." },
        {
            question: "Do I need Miro?",
            answer: "Yes. The beta runs inside Miro, so you'll need a Miro account to ask questions.",
        },
        {
            question: "What happens when the credits run out?",
            answer:
                "Nothing is charged automatically. You can top up your balance to keep asking questions, or stop there.",
        },
    ],
    partners: [
        { name: "YouGov", logoUrl: null },
        { name: "Reddit", logoUrl: null },
        { name: "X", logoUrl: null },
        { name: "Quid", logoUrl: null },
        { name: "US Census", logoUrl: null },
    ],
    videoUrl: null,
    posterUrl: null,
    contactEmail: "hello@adxc.ai", // TODO: confirm contact address
    linkedinUrl: null,
    expiredRedirect: "/", // TODO: point at the main early-access page
};

export async function getWebSummitContent(): Promise<WebSummitContent> {
    const data = await sanityClient
        .fetch<Partial<WebSummitContent> | null>(QUERY, {}, { next: { revalidate: 60, tags: ["sanity-content"] } })
        .catch(() => null);

    if (!data) return WEBSUMMIT_FALLBACK;

    const defined = Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)),
    );

    return { ...WEBSUMMIT_FALLBACK, ...defined };
}

export function isExpired(content: WebSummitContent) {
    const end = Date.parse(content.endsAt);
    return Number.isFinite(end) && Date.now() > end;
}

/** Maps ?src= to a tier. Unknown or missing values fall back to the default offer. */
export function resolveTier(content: WebSummitContent, src: string | undefined) {
    const variant = (src ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32);
    const tier = content.tiers.find((t) => t.key === variant);

    return {
        variant: tier ? tier.key : variant ? `unknown:${variant}` : "direct",
        credits: tier?.credits ?? content.creditsDefault,
    };
}

export function safeRedirectPath(path: string) {
    return path.startsWith("/") && !path.startsWith("//") ? path : "/";
}