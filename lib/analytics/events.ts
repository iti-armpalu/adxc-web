// ─── Analytics transport ──────────────────────────────────────────────────────
// TODO: re-add analytics provider. PostHog was removed (Oct 2026) during mobile
// performance troubleshooting — session replay / dead-click capture was a major
// cost on iOS Safari. All track* functions below are kept so call sites don't
// change; to re-enable, implement `capture` and `identify` here only.
// In development, events are logged to the console so you can still verify them.

function capture(event: string, properties?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "development") {
        console.debug("[analytics]", event, properties ?? {})
    }
}

function identify(distinctId: string, properties: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "development") {
        console.debug("[analytics] identify", distinctId, properties)
    }
}

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
    identify(email, {
        email,
        name,
        company,
        company_size: companySize,
        job_title: jobTitle,
    })
}

// ─── Page Events ─────────────────────────────────────────────────────────────

export function trackPageView(path: string) {
    capture("page_viewed", { path })
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function trackHeroEmailStarted() {
    capture("hero_email_input_started")
}

export function trackHeroCtaClicked(email: string) {
    capture("hero_cta_clicked", {
        has_email: !!email,
    })
}

// ─── Early Access ─────────────────────────────────────────────────────────────

export function trackEarlyAccessPageViewed() {
    capture("early_access_page_viewed")
}

export function trackEarlyAccessFormStarted() {
    capture("early_access_form_started")
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
    capture("early_access_submitted", {
        company_size: companySize,
        job_title: jobTitle,
        company,
    })
}

export function trackEarlyAccessError(error: string) {
    capture("early_access_form_error", { error })
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export function trackContactPageViewed() {
    capture("contact_page_viewed")
}

export function trackContactFormStarted() {
    capture("contact_form_started")
}

export function trackContactSubmitted() {
    capture("contact_submitted")
}

export function trackContactError(error: string) {
    capture("contact_form_error", { error })
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export function trackNavCtaClicked(label: string) {
    capture("nav_cta_clicked", { label })
}

export function trackNavSecondaryCtaClicked(label: string) {
    capture("nav_secondary_cta_clicked", { label })
}

export function trackMobileMenuOpened() {
    capture("mobile_menu_opened")
}

export function trackMobileMenuClosed() {
    capture("mobile_menu_closed")
}

export function trackNavLinkClicked(label: string, href: string) {
    capture("nav_link_clicked", { label, href })
}

// ─── Hero Graphic ─────────────────────────────────────────────────────────────

export function trackHeroGraphicQuestionViewed(question: string) {
    capture("hero_graphic_question_viewed", { question })
}

// ─── AI Widget ────────────────────────────────────────────────────────────────

export function trackAIWidgetOpened(surface: string) {
    capture("ai_widget_opened", { surface })
}

export function trackAIQuestionAsked(surface: string, question?: string) {
    capture("ai_question_asked", { surface, question })
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function trackFooterLinkClicked(label: string, href: string) {
    capture("footer_link_clicked", { label, href })
}

export function trackFooterInvestorClicked() {
    capture("footer_investor_clicked")
}

export function trackFooterContactClicked() {
    capture("footer_contact_clicked")
}

// ─── Cookie Consent ───────────────────────────────────────────────────────────

export function trackCookieConsentAccepted() {
    capture("cookie_consent_accepted")
}

export function trackCookieConsentDeclined() {
    capture("cookie_consent_declined")
}