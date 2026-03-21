import type { ProspectRecord } from "./prospectTypes";

export async function fetchProspectRecord(
  id: string,
  accessToken: string
): Promise<ProspectRecord | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!baseUrl || !anonKey) return null;

  const url = new URL('/rest/v1/saved_analyses', baseUrl);
  url.searchParams.set('id', `eq.${id}`);
  url.searchParams.set('select', '*');
  url.searchParams.set('limit', '1');

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: anonKey,
    },
  });

  if (!response.ok) return null;
  const rows = (await response.json()) as ProspectRecord[];
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}
