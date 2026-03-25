import type { AngleId, FollowUpTone, ProspectOutreachAngles, ProspectRecord } from "./prospectTypes";

type SessionUser = {
  accessToken: string;
  fullName: string;
};

type OutreachResponse = {
  recommendedAngleId?: AngleId;
  angles?: Array<{
    id?: AngleId;
    label?: string;
    rationale?: string;
    variations?: Array<{ subject?: string; body?: string }>;
  }>;
};

type FollowUpResponse = {
  emails?: Array<{ id?: FollowUpTone; label?: string; subject?: string; body?: string }>;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.signalizeai.org";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function buildAnalysisPayload(prospect: ProspectRecord) {
  return {
    whatTheyDo: prospect.what_they_do || "",
    targetCustomer: prospect.target_customer || "",
    valueProposition: prospect.value_proposition || "",
    salesAngle: "",
    salesReadinessScore: prospect.sales_readiness_score || 0,
    bestSalesPersona: {
      persona: prospect.best_sales_persona || "",
      reason: prospect.best_sales_persona_reason || "",
    },
    recommendedOutreach: {
      goal: prospect.recommended_outreach_goal || "",
      angle: prospect.recommended_outreach_angle || "",
      message: "",
    },
  };
}

function buildMetaPayload(prospect: ProspectRecord) {
  return {
    title: prospect.title || prospect.domain || "",
    url: prospect.url || "",
    domain: prospect.domain || "",
    evidence: {
      metaDescription: prospect.description || "",
      headings: [],
      paragraphs: [],
    },
  };
}

async function postJson<T>(path: string, token: string, body: unknown): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function updateOutreachAngles(
  prospectId: string,
  accessToken: string,
  outreachAngles: ProspectOutreachAngles,
) {
  await updateProspectRow(prospectId, accessToken, { outreach_angles: outreachAngles });
}

async function updateProspectRow(
  prospectId: string,
  accessToken: string,
  payload: Record<string, unknown>,
) {
  const url = new URL("/rest/v1/saved_analyses", supabaseUrl);
  url.searchParams.set("id", `eq.${prospectId}`);

  const response = await fetch(url.toString(), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      apikey: supabaseAnonKey,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to update saved prospect");
  }
}

export async function updateProspectStatus(prospectId: string, status: string, session: SessionUser) {
  await updateProspectRow(prospectId, session.accessToken, { prospect_status: status });
}

export async function generateProspectOutreach(prospect: ProspectRecord, session: SessionUser) {
  const result = await postJson<OutreachResponse>("/outreach-messages", session.accessToken, {
    analysis: buildAnalysisPayload(prospect),
    meta: buildMetaPayload(prospect),
  });

  const outreachAngles = {
    ...(prospect.outreach_angles || {}),
    generated_at: new Date().toISOString(),
    recommended_angle_id: result.recommendedAngleId || "observation",
    angles: result.angles || [],
  };

  await updateOutreachAngles(prospect.id, session.accessToken, outreachAngles);
  return outreachAngles;
}

export async function generateProspectFollowUps(
  prospect: ProspectRecord,
  openingEmail: { subject?: string; body?: string },
  session: SessionUser,
) {
  const result = await postJson<FollowUpResponse>("/outreach-followups", session.accessToken, {
    analysis: buildAnalysisPayload(prospect),
    meta: buildMetaPayload(prospect),
    openingEmail,
  });

  const outreachAngles = {
    ...(prospect.outreach_angles || {}),
    generated_at:
      prospect.outreach_angles && "generated_at" in prospect.outreach_angles
        ? (prospect.outreach_angles as { generated_at?: string }).generated_at || new Date().toISOString()
        : new Date().toISOString(),
    follow_ups: { emails: result.emails || [] },
  };

  await updateOutreachAngles(prospect.id, session.accessToken, outreachAngles);
  return outreachAngles;
}
