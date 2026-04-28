import posthog from "posthog-js"

// ─── User Identity ────────────────────────────────────────────────────────────

export function identifyUser({
    email,
    name,
    company,
    companySize,
    jobTitle,
}: {
    email: string
    name: string
    company: string
    companySize: string
    jobTitle: string
}) {
    posthog.identify(email, {
        email,
        name,
        company,
        company_size: companySize,
        job_title: jobTitle,
    })
}

// ─── Page Events ─────────────────────────────────────────────────────────────

export function trackPageView(path: string) {
    posthog.capture("page_viewed", { path })
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function trackHeroEmailStarted() {
    posthog.capture("hero_email_input_started")
}

export function trackHeroCtaClicked(email: string) {
    posthog.capture("hero_cta_clicked", {
        has_email: !!email,
    })
}

// ─── Early Access ─────────────────────────────────────────────────────────────

export function trackEarlyAccessPageViewed() {
    posthog.capture("early_access_page_viewed")
}

export function trackEarlyAccessFormStarted() {
    posthog.capture("early_access_form_started")
}

export function trackEarlyAccessSubmitted({
    companySize,
    jobTitle,
    company,
}: {
    companySize: string
    jobTitle: string
    company: string
}) {
    posthog.capture("early_access_submitted", {
        company_size: companySize,
        job_title: jobTitle,
        company,
    })
}

export function trackEarlyAccessError(error: string) {
    posthog.capture("early_access_form_error", { error })
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export function trackContactPageViewed() {
    posthog.capture("contact_page_viewed")
}

export function trackContactFormStarted() {
    posthog.capture("contact_form_started")
}

export function trackContactSubmitted() {
    posthog.capture("contact_submitted")
}

export function trackContactError(error: string) {
    posthog.capture("contact_form_error", { error })
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export function trackNavCtaClicked(label: string) {
    posthog.capture("nav_cta_clicked", { label })
}

export function trackNavSecondaryCtaClicked(label: string) {
    posthog.capture("nav_secondary_cta_clicked", { label })
}

export function trackMobileMenuOpened() {
    posthog.capture("mobile_menu_opened")
}

export function trackMobileMenuClosed() {
    posthog.capture("mobile_menu_closed")
}

export function trackNavLinkClicked(label: string, href: string) {
    posthog.capture("nav_link_clicked", { label, href })
}

// ─── Hero Graphic ─────────────────────────────────────────────────────────────

export function trackHeroGraphicQuestionViewed(question: string) {
    posthog.capture("hero_graphic_question_viewed", { question })
}

// ─── AI Widget ────────────────────────────────────────────────────────────────

export function trackAIWidgetOpened(surface: string) {
    posthog.capture("ai_widget_opened", { surface })
}

export function trackAIQuestionAsked(surface: string, question?: string) {
    posthog.capture("ai_question_asked", { surface, question })
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function trackFooterLinkClicked(label: string, href: string) {
    posthog.capture("footer_link_clicked", { label, href })
}

export function trackFooterInvestorClicked() {
    posthog.capture("footer_investor_clicked")
}

export function trackFooterContactClicked() {
    posthog.capture("footer_contact_clicked")
}

// ─── Cookie Consent ───────────────────────────────────────────────────────────

export function trackCookieConsentAccepted() {
    posthog.capture("cookie_consent_accepted")
}

export function trackCookieConsentDeclined() {
    posthog.capture("cookie_consent_declined")
}