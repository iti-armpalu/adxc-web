import posthog from "posthog-js"

// Call these from client components after user interactions
// PostHog only fires if it has been initialised (consent granted)

export function trackCtaClicked(label: string, location: string) {
    posthog.capture("cta_clicked", { label, location })
}

export function trackEarlyAccessSubmitted(companySize: string) {
    posthog.capture("early_access_submitted", { company_size: companySize })
}

export function trackContactSubmitted() {
    posthog.capture("contact_form_submitted")
}

export function trackAudiencePageViewed(audience: string) {
    posthog.capture("audience_page_viewed", { audience })
}

export function trackBlogPostViewed(slug: string, title: string) {
    posthog.capture("blog_post_viewed", { slug, title })
}

export function trackAIQuestionAsked(surface: "faq" | "widget") {
    posthog.capture("ai_question_asked", { surface })
}