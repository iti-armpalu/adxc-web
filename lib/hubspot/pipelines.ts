// Pipeline and stage IDs are portal-specific (not the display names you see
// in the HubSpot UI) so they live in env vars rather than hardcoded here.
// Get them from Settings > Objects > Deals > Pipelines — the ID is visible in
// the URL/edit view for each pipeline and stage.

const SALES_PIPELINE = {
    pipelineId: process.env.HUBSPOT_SALES_PIPELINE_ID ?? "",
    stageId: process.env.HUBSPOT_SALES_PIPELINE_STAGE_ID ?? "",
}

const DATA_PROVIDERS_PIPELINE = {
    pipelineId: process.env.HUBSPOT_DATA_PROVIDERS_PIPELINE_ID ?? "",
    stageId: process.env.HUBSPOT_DATA_PROVIDERS_PIPELINE_STAGE_ID ?? "",
}

// Early access deals use the Sales pipeline but start in their own stage.
const EARLY_ACCESS_PIPELINE = {
    pipelineId: process.env.HUBSPOT_SALES_PIPELINE_ID ?? "",
    stageId: process.env.HUBSPOT_EARLY_ACCESS_STAGE_ID ?? "",
}

/**
 * Maps a form's `source` tag (the same value passed as `source` to
 * upsertHubspotContact) to the pipeline + first stage a new deal should land in.
 *
 * - data_providers_form -> Data Providers Pipeline
 * - early_access_form   -> Sales Pipeline, early access stage
 * - everything else (contact_form, ai_platforms_form) -> Sales Pipeline, default first stage
 */
export function pipelineForFormSource(source: string) {
    if (source === "data_providers_form") return DATA_PROVIDERS_PIPELINE
    if (source === "early_access_form") return EARLY_ACCESS_PIPELINE
    return SALES_PIPELINE
}