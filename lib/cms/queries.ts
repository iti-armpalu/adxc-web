import { sanityFetch } from "./client"
import type { AboutPageContent, AudiencePageContent, AgenciesPageContent, AIPlatformsPageContent, BlogPost, CardsOfferPageContent, BrandsPageContent, DataProvidersPageContent, BlogPostPreview, DataSourcesPageContent, HomeContent, PlatformPageContent, SiteSeoContent, SiteSettingsContent } from "./types"

const SEO_PROJECTION = `
      seo {
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle,
        ogDescription,
        ogImage
      }
`

// Section projections shared by more than one audience page.
const LOGOS = `{
        name,
        logo,
        showName
      }`

const DATA_PROVIDERS_PROJECTION = `
      dataProvidersLabel,
      dataProvidersLogos[] ${LOGOS},
      dataProvidersMoreText,
`

const INTEGRATIONS_PROJECTION = `
      integrationsHeadline,
      integrationsSubtext,
      integrationsLabel,
      integrationsLogos[] ${LOGOS},
      integrationsMoreText,
`

const CTA_PROJECTION = `
      ctaHeadline,
      ctaSubtext,
      ctaButtonLabel,
`

const PARTNERS_PROJECTION = `
      partnersLabel,
      partnersLogos[] ${LOGOS},
`

// Agencies' strip sits at the top of its page, so it has its own fields
// (see studio-adxc audiencePage.ts).
const TOP_PARTNERS_PROJECTION = `
      topPartnersLabel,
      topPartnersLogos[] ${LOGOS},
`

// All posts for listing page — no body field (keeps response lean)
export async function getPosts(): Promise<BlogPostPreview[]> {
  return sanityFetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      image
    }`
  )
}

// Single post by slug — includes body for rendering
export async function getPost(slug: string): Promise<BlogPost | null> {
  return sanityFetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      image,
      body
    }`,
    { slug }
  )
}

// All slugs for generateStaticParams
export async function getPostSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch(
    `*[_type == "post" && defined(slug.current)] {
      "slug": slug.current
    }`
  )
}

// Home page — singleton, fixed _id "home" (see studio structure.ts)
export async function getHome(): Promise<HomeContent | null> {
  return sanityFetch(
    `*[_type == "home" && _id == "home"][0] {
      heroHeadlineLine1,
      heroHeadlineLine2,
      heroHeadlineLine3,
      heroSubtext,
      partnersDataLabel,
      partnersDataLogos[] {
        name,
        logo,
        showName
      },
      partnersMoreText,
      partnersAccessLabel,
      partnersAccessLogos[] {
        name,
        logo,
        showName
      },
      platformHeadline,
      platformSubtext,
      platformSteps[] {
        title,
        description,
        image
      },
      problemSentenceOne,
      problemSentenceTwo,
      problemSentenceThree,
      problemPunchline,
      problemSolution,
      useCasesHeadline,
      useCasesSubtext,
      useCases[] {
        title,
        description,
        bullets
      },
      ctaHeadline,
      ctaSubtext,
      ctaButtonLabel,
      ${SEO_PROJECTION}
    }`
  )
}

// Audience pages are pinned singletons — _id: "audience-brands", etc.
// (see studio-adxc/structure.ts).
export async function getBrandsPage(): Promise<BrandsPageContent | null> {
  return sanityFetch(
    `*[_type == "audiencePage" && _id == "audience-brands"][0] {
      audience,
      heroLabel,
      heroHeadlineLine1,
      heroHeadlineLine2,
      heroHeadlineLine3,
      heroSubtext,
      ${DATA_PROVIDERS_PROJECTION}
      problemLabel,
      problemStat,
      problemStatLabel,
      problemSubtext,
      problemNote,
      howItWorksHeadline,
      howItWorksFeatures[] {
        icon,
        title,
        lead,
        description
      },
      ${INTEGRATIONS_PROJECTION}
      ${CTA_PROJECTION}
      ${PARTNERS_PROJECTION}
      ${SEO_PROJECTION}
    }`
  )
}

export async function getAgenciesPage(): Promise<AgenciesPageContent | null> {
  return sanityFetch(
    `*[_type == "audiencePage" && _id == "audience-agencies"][0] {
      audience,
      heroLabel,
      heroHeadlineLine1,
      heroHeadlineLine2,
      heroHeadlineLine3,
      heroSubtext,
      ${TOP_PARTNERS_PROJECTION}
      howItWorksHeadline,
      howItWorksFeatures[] {
        icon,
        title,
        lead,
        description
      },
      ${INTEGRATIONS_PROJECTION}
      ${CTA_PROJECTION}
      otherWaysHeadline,
      otherWays[] {
        title,
        description,
        linkLabel,
        linkHref
      },
      ${SEO_PROJECTION}
    }`
  )
}

export async function getDataProvidersPage(): Promise<DataProvidersPageContent | null> {
  return sanityFetch(
    `*[_type == "audiencePage" && _id == "audience-data-providers"][0] {
      audience,
      heroLabel,
      heroHeadlineLine1,
      heroHeadlineLine2,
      heroHeadlineLine3,
      heroSubtext,
      ${DATA_PROVIDERS_PROJECTION}
      statValue,
      statLabel,
      statSubtext,
      statNote,
      whyNowLabel,
      whyNowStats[] {
        value,
        label,
        sourceUrl
      },
      whyNowHeadline,
      whyNowNote,
      howItWorksHeadline,
      howItWorksFeatures[] {
        icon,
        title,
        lead,
        description
      },
      distributionHeadline,
      distributionSubtext,
      distributionNote,
      distributionLabel,
      distributionLogos[] ${LOGOS},
      distributionStatValue,
      distributionStatLabel,
      distributionImage,
      ctaLabel,
      ${CTA_PROJECTION}
      ${PARTNERS_PROJECTION}
      ${SEO_PROJECTION}
    }`
  )
}

export async function getAIPlatformsPage(): Promise<AIPlatformsPageContent | null> {
  return sanityFetch(
    `*[_type == "audiencePage" && _id == "audience-ai-platforms"][0] {
      audience,
      heroLabel,
      heroHeadlineLine1,
      heroHeadlineLine2,
      heroHeadlineLine3,
      heroSubtext,
      capabilitiesHeadline,
      capabilitiesSubtext,
      whyNowLabel,
      whyNowCards[] {
        value,
        label,
        labelSourceUrl,
        subtext,
        subtextSourceUrl
      },
      howItWorksHeadline,
      howItWorksSubtext,
      howItWorksFeatures[] {
        icon,
        title,
        lead,
        description
      },
      midPartnersLabel,
      midPartnersLogos[] ${LOGOS},
      midPartnersMoreText,
      ctaLabel,
      ${CTA_PROJECTION}
      ${SEO_PROJECTION}
    }`
  )
}

// Product — Platform. Singleton, fixed _id "product-platform".
export async function getPlatformPage(): Promise<PlatformPageContent | null> {
  return sanityFetch(
    `*[_type == "productPlatformPage" && _id == "product-platform"][0] {
      heroLabel,
      heroHeadlineLine1,
      heroHeadlineLine2,
      heroHeadlineLine3,
      heroSubtext,
      overviewHeadline,
      overviewSubtext,
      overviewNote,
      howItWorksHeadline,
      howItWorksSubtext,
      howItWorksSteps[] {
        icon,
        label,
        title,
        lead,
        description
      },
      patentHeadline,
      patentSubtext,
      audiencesHeadline,
      providersLabel,
      providersLogos[] {
        name,
        logo,
        showName
      },
      providersMoreText,
      ${SEO_PROJECTION}
    }`
  )
}

// Product — Data Sources. Singleton, fixed _id "product-data-sources".
export async function getDataSourcesPage(): Promise<DataSourcesPageContent | null> {
  return sanityFetch(
    `*[_type == "dataSourcesPage" && _id == "product-data-sources"][0] {
      heroHeadlineLine1,
      heroHeadlineLine2,
      heroHeadlineLine3,
      heroSubtext,
      providersHeadline,
      providers[] {
        name,
        logo,
        tagline,
        description,
        capabilities
      },
      moreProvidersText,
      ctaHeadlineLine1,
      ctaHeadlineLine2,
      ctaButtonLabel,
      partnerLabel,
      partnerHeadline,
      partnerSubtext,
      partnerButtonLabel,
      ${SEO_PROJECTION}
    }`
  )
}

export async function getAboutPage(): Promise<AboutPageContent | null> {
  return sanityFetch(
    `*[_type == "aboutPage" && _id == "about"][0] {
      heroHeadlineLine1,
      heroHeadlineLine2,
      heroHeadlineLine3,
      heroSubtext,
      teamHeadline,
      team[] {
        name,
        title,
        photo,
        linkedin
      },
      ${SEO_PROJECTION}
    }`
  )
}

// Site-wide SEO fallback — singleton, fixed _id "siteSeo"
export async function getSiteSeo(): Promise<SiteSeoContent | null> {
  return sanityFetch(
    `*[_type == "siteSeo" && _id == "siteSeo"][0] {
      defaultOgImage
    }`
  )
}
// Site-wide settings (footer copy) — singleton, fixed _id "siteSettings"
export async function getSiteSettings(): Promise<SiteSettingsContent | null> {
  return sanityFetch(
    `*[_type == "siteSettings" && _id == "siteSettings"][0] {
      footerDescription
    }`
  )
}

// Cards Offer — singleton, fixed _id "cards-offer".
export async function getCardsOfferPage(): Promise<CardsOfferPageContent | null> {
  return sanityFetch(
    `*[_type == "cardsOfferPage" && _id == "cards-offer"][0] {
      heroHeadline,
      heroSubtext,
      contactLead,
      contactTeamMember,
      contactEmail,
      formButtonLabel,
      formMicrocopy,
      providersLabel,
      providersLogos[] ${LOGOS},
      providersMoreText,
      integrationsLabel,
      integrationsLogos[] ${LOGOS},
      demoVideoUrl,
      demoHeadline,
      demoSubtext,
      demoThumbnail,
      ctaHeadline,
      ${SEO_PROJECTION}
    }`
  )
}
