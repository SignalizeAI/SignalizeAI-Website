import type { ProspectRecord } from "./prospectTypes";

const DRAFT_FIELDS = [
  "title",
  "domain",
  "url",
  "description",
  "sales_readiness_score",
  "what_they_do",
  "target_customer",
  "value_proposition",
  "best_sales_persona",
  "best_sales_persona_reason",
  "recommended_outreach_goal",
  "recommended_outreach_angle",
  "outreach_angles",
] as const;

type DraftField = (typeof DRAFT_FIELDS)[number];

export function decodeProspectDraft(draft: string | null): ProspectRecord | null {
  if (!draft) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(draft)) as Record<string, unknown>;
    const prospect = DRAFT_FIELDS.reduce<Partial<ProspectRecord>>((acc, field) => {
      const value = parsed[field as DraftField];
      if (value !== undefined && value !== null && value !== "") {
        acc[field] = value as never;
      }
      return acc;
    }, {});

    return Object.keys(prospect).length > 0 ? (prospect as ProspectRecord) : null;
  } catch (error) {
    console.warn("Failed to decode prospect draft:", error);
    return null;
  }
}

export function buildProspectPreviewPath(prospect: ProspectRecord): string {
  const draft = DRAFT_FIELDS.reduce<Record<string, unknown>>((acc, field) => {
    const value = prospect[field];
    if (value !== undefined && value !== null && value !== "") {
      acc[field] = value;
    }
    return acc;
  }, {});

  return `/prospect/preview?draft=${encodeURIComponent(JSON.stringify(draft))}`;
}
