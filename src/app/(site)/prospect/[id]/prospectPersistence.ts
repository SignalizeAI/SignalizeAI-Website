import type { ProspectOutreachAngles, ProspectRecord } from "./prospectTypes";

export type SessionUser = {
  accessToken: string;
  fullName: string;
  userId: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function parseRow<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to update saved prospect");
  }

  const rows = (await response.json()) as T[];
  return rows[0];
}

async function queryProspectByDomain(domain: string, accessToken: string): Promise<ProspectRecord | null> {
  const url = new URL("/rest/v1/saved_analyses", supabaseUrl);
  url.searchParams.set("domain", `eq.${domain}`);
  url.searchParams.set("select", "*");
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: supabaseAnonKey,
    },
  });

  if (!response.ok) return null;
  const rows = (await response.json()) as ProspectRecord[];
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

export async function updateProspectRow(
  prospectId: string,
  accessToken: string,
  payload: Record<string, unknown>,
): Promise<void> {
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

export async function saveProspectRecord(
  prospect: ProspectRecord,
  session: SessionUser,
): Promise<ProspectRecord> {
  if (!prospect.domain) {
    throw new Error("Prospect domain is required to save");
  }

  const existing = await queryProspectByDomain(prospect.domain, session.accessToken);
  if (existing) return existing;

  const url = new URL("/rest/v1/saved_analyses", supabaseUrl);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
      apikey: supabaseAnonKey,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      user_id: session.userId,
      domain: prospect.domain,
      url: prospect.url || "",
      title: prospect.title || prospect.domain,
      description: prospect.description || "",
      last_analyzed_at: new Date().toISOString(),
      prospect_status: "not_contacted",
      sales_readiness_score: prospect.sales_readiness_score || 0,
      what_they_do: prospect.what_they_do || "",
      target_customer: prospect.target_customer || "",
      value_proposition: prospect.value_proposition || "",
      best_sales_persona: prospect.best_sales_persona || "",
      best_sales_persona_reason: prospect.best_sales_persona_reason || "",
      recommended_outreach_goal: prospect.recommended_outreach_goal || "",
      recommended_outreach_angle: prospect.recommended_outreach_angle || "",
      ...(prospect.outreach_angles ? { outreach_angles: prospect.outreach_angles } : {}),
    }),
  });

  return parseRow<ProspectRecord>(response);
}

export async function deleteProspectRecord(
  prospectId: string,
  accessToken: string,
): Promise<void> {
  const url = new URL("/rest/v1/saved_analyses", supabaseUrl);
  url.searchParams.set("id", `eq.${prospectId}`);

  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: supabaseAnonKey,
      Prefer: "return=minimal",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to remove saved prospect");
  }
}

export async function updateSavedOutreachAngles(
  prospectId: string,
  accessToken: string,
  outreachAngles: ProspectOutreachAngles,
): Promise<void> {
  await updateProspectRow(prospectId, accessToken, { outreach_angles: outreachAngles });
}
