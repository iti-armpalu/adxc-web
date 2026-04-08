import type { Metadata } from "next"
import { LegalTemplate } from "@/components/sections/legal-template"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Terms of Service",
    description: `Terms governing your use of ${siteConfig.name}.`,
}

export default function TermsPage() {
    return (
        <LegalTemplate
            title="Terms of Service"
            lastUpdated="April 2025"
            sections={[
                {
                    heading: "Acceptance of terms",
                    content: (
                        <p>
                            By accessing or using {siteConfig.name} at{" "}
                            <a
                                href={siteConfig.url}
                                className="text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
                            >
                                {siteConfig.url}
                            </a>
                            , you agree to be bound by these Terms of Service. If you do not
                            agree, please do not use the site.
                        </p>
                    ),
                },
                {
                    heading: "Use of the site",
                    content: (
                        <>
                            <p>You agree to use this site only for lawful purposes. You must not:</p>
                            <ul className="list-disc list-inside space-y-1.5 pt-1">
                                <li>Use the site in any way that violates applicable laws or regulations</li>
                                <li>Attempt to gain unauthorised access to any part of the site or its infrastructure</li>
                                <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
                                <li>Knowingly introduce viruses, trojans, or other malicious material</li>
                                <li>Scrape, crawl, or extract data from the site without prior written consent</li>
                            </ul>
                        </>
                    ),
                },
                {
                    heading: "Intellectual property",
                    content: (
                        <p>
                            All content on this site — including text, graphics, logos, and
                            software — is the property of {siteConfig.name} or its licensors
                            and is protected by applicable intellectual property laws. You may
                            not reproduce, distribute, or create derivative works without
                            express written permission.
                        </p>
                    ),
                },
                {
                    heading: "Beta access",
                    content: (
                        <p>
                            Access to the {siteConfig.name} platform is currently provided on
                            an invitation-only basis. Beta access is granted at our sole
                            discretion and may be revoked at any time. Features and
                            functionality may change without notice during the beta period.
                        </p>
                    ),
                },
                {
                    heading: "Disclaimers",
                    content: (
                        <>
                            <p>
                                This site is provided on an "as is" and "as available" basis
                                without warranties of any kind, either express or implied,
                                including but not limited to warranties of merchantability,
                                fitness for a particular purpose, or non-infringement.
                            </p>
                            <p>
                                We do not warrant that the site will be uninterrupted, error-free,
                                or free of viruses or other harmful components.
                            </p>
                        </>
                    ),
                },
                {
                    heading: "Limitation of liability",
                    content: (
                        <p>
                            To the fullest extent permitted by law, {siteConfig.name} shall
                            not be liable for any indirect, incidental, special, consequential,
                            or punitive damages arising from your use of or inability to use
                            the site or its content.
                        </p>
                    ),
                },
                {
                    heading: "Third-party links",
                    content: (
                        <p>
                            This site may contain links to third-party websites. These links
                            are provided for convenience only. We have no control over the
                            content of those sites and accept no responsibility for them or
                            for any loss or damage that may arise from your use of them.
                        </p>
                    ),
                },
                {
                    heading: "Governing law",
                    content: (
                        <p>
                            These terms are governed by and construed in accordance with
                            applicable law. Any disputes arising in connection with these terms
                            shall be subject to the exclusive jurisdiction of the relevant courts.
                        </p>
                    ),
                },
                {
                    heading: "Changes to these terms",
                    content: (
                        <p>
                            We may revise these terms at any time by updating this page. The
                            "last updated" date at the top of this page will reflect the most
                            recent revision. Continued use of the site after changes are posted
                            constitutes your acceptance of the revised terms.
                        </p>
                    ),
                },
                {
                    heading: "Contact",
                    content: (
                        <p>
                            Questions about these terms? Contact us at{" "}
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
            ]}
        />
    )
}