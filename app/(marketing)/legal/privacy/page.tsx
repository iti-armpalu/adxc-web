import type { Metadata } from "next"
import { LegalTemplate } from "@/components/sections/legal-template"
import { siteConfig } from "@/config/site"


export const metadata: Metadata = {
    title: "Privacy Notice",
    description: `How ${siteConfig.name} collects, uses, and protects your personal data.`,
}

export default function PrivacyPage() {
    return (
        <LegalTemplate
            title="Privacy Notice"
            lastUpdated="April 2025"
            sections={[
                {
                    heading: "Who we are",
                    content: (
                        <p>
                            {siteConfig.name} operates at{" "}
                            <a
                                href={siteConfig.url}
                                className="text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
                            >
                                {siteConfig.url}
                            </a>
                            . We are the data controller for personal data collected through
                            this website. If you have any questions about how we handle your
                            data, contact us at{" "}
                            <a
                                href={`mailto:${siteConfig.contactEmail}`}
                                className="text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
                            >
                                {siteConfig.contactEmail}
                            </a>
                            .
                        </p>
                    ),
                },
                {
                    heading: "What data we collect",
                    content: (
                        <>
                            <p>We collect personal data in the following ways:</p>
                            <ul className="list-disc list-inside space-y-1.5 pt-1">
                                <li>
                                    <strong className="text-foreground font-medium">Contact form</strong> — first name,
                                    last name, work email, company name, and message content when you submit an enquiry.
                                </li>
                                <li>
                                    <strong className="text-foreground font-medium">Early access signup</strong> — first
                                    name, last name, work email, company name, company size, job title, and intended
                                    use case when requesting beta access.
                                </li>
                                <li>
                                    <strong className="text-foreground font-medium">Analytics</strong> — aggregated,
                                    anonymised usage data if you consent to analytics cookies.
                                </li>
                            </ul>
                        </>
                    ),
                },
                {
                    heading: "How we use your data",
                    content: (
                        <>
                            <p>We use the data we collect to:</p>
                            <ul className="list-disc list-inside space-y-1.5 pt-1">
                                <li>Respond to enquiries submitted via the contact form</li>
                                <li>Process and manage beta access requests</li>
                                <li>Improve the website based on anonymised usage patterns</li>
                                <li>Maintain site security and prevent abuse</li>
                            </ul>
                            <p className="pt-2">
                                We do not sell, rent, or share your personal data with third
                                parties for marketing purposes.
                            </p>
                        </>
                    ),
                },
                {
                    heading: "Legal basis for processing",
                    content: (
                        <ul className="list-disc list-inside space-y-1.5">
                            <li>
                                <strong className="text-foreground font-medium">Legitimate interests</strong> —
                                responding to enquiries and maintaining site security.
                            </li>
                            <li>
                                <strong className="text-foreground font-medium">Consent</strong> — analytics and
                                marketing cookies, which you can withdraw at any time.
                            </li>
                            <li>
                                <strong className="text-foreground font-medium">Contractual necessity</strong> —
                                processing data needed to provide access to the platform.
                            </li>
                        </ul>
                    ),
                },
                {
                    heading: "Data retention",
                    content: (
                        <p>
                            Contact form submissions are retained for up to 12 months. Analytics data is retained in
                            aggregated form and is not tied to individual identities.
                        </p>
                    ),
                },
                {
                    heading: "Third-party services",
                    content: (
                        <>
                            <p>We use the following third-party services that may process your data:</p>
                            <ul className="list-disc list-inside space-y-1.5 pt-1">
                                <li>
                                    <strong className="text-foreground font-medium">Resend</strong> — email
                                    delivery for contact form submissions. Data is processed in accordance
                                    with Resend's privacy policy.
                                </li>
                                <li>
                                    <strong className="text-foreground font-medium">Cloudflare Turnstile</strong> —
                                    bot protection on forms. Cloudflare may process browser signals to
                                    verify human interaction.
                                </li>
                                <li>
                                    <strong className="text-foreground font-medium">Vercel</strong> — hosting
                                    and infrastructure. Request logs may be retained for security purposes.
                                </li>
                            </ul>
                        </>
                    ),
                },
                {
                    heading: "Your rights",
                    content: (
                        <>
                            <p>Under GDPR, you have the right to:</p>
                            <ul className="list-disc list-inside space-y-1.5 pt-1">
                                <li>Access the personal data we hold about you</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to or restrict processing</li>
                                <li>Withdraw consent at any time</li>
                                <li>Lodge a complaint with your local supervisory authority</li>
                            </ul>
                            <p className="pt-2">
                                To exercise any of these rights, contact us at{" "}
                                <a
                                    href={`mailto:${siteConfig.contactEmail}`}
                                    className="text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
                                >
                                    {siteConfig.contactEmail}
                                </a>
                                .
                            </p>
                        </>
                    ),
                },
                {
                    heading: "Changes to this notice",
                    content: (
                        <p>
                            We may update this notice from time to time. Material changes will
                            be reflected in the "last updated" date above. Continued use of the
                            site after changes constitutes acceptance of the updated notice.
                        </p>
                    ),
                },
            ]}
        />
    )
}