import type { AngleId, ProspectRecord } from "./prospectTypes";

export function getStatusLabel(status?: string) {
  if (status === "contacted") return "Contacted";
  if (status === "follow_up") return "Follow-up due";
  return "Not contacted";
}

export function getStatusTone(status?: string) {
  if (status === "contacted") return "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300";
  if (status === "follow_up") return "bg-amber-500/12 text-amber-700 dark:text-amber-300";
  return "bg-slate-900/6 text-slate-700 dark:bg-white/8 dark:text-white/75";
}

export function getReadinessTone(score?: number) {
  if ((score || 0) >= 75) return { label: "High", bar: "bg-emerald-500" };
  if ((score || 0) >= 50) return { label: "Medium", bar: "bg-amber-500" };
  return { label: "Low", bar: "bg-rose-500" };
}

export function getRecommendedEmail(prospect: ProspectRecord) {
  const angles = prospect.outreach_angles?.angles || [];
  const preferred = angles.find((angle) => angle.id === prospect.outreach_angles?.recommended_angle_id);
  return preferred || angles[0] || null;
}

export function getSecondaryEmails(prospect: ProspectRecord) {
  const recommendedId = getRecommendedEmail(prospect)?.id;
  return (prospect.outreach_angles?.angles || []).filter((angle) => angle.id !== recommendedId);
}

export function getReplyChance(angleId?: AngleId, recommendedId?: AngleId) {
  if (!angleId) return "Medium reply chance";
  if (angleId === recommendedId) return "High reply chance";
  return angleId === "curiosity" ? "Low reply chance" : "Medium reply chance";
}

export function getCompanyDisplayName(prospect: ProspectRecord) {
  const source = prospect.title || prospect.domain || "";
  const normalizedDomain = String(prospect.domain || "")
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split("/")[0]
    .split(".")[0]
    .trim();
  const segments = source
    .split(/\s*[|>\-•:/]\s*/g)
    .map((part) => part.trim())
    .filter(Boolean);
  const matched = segments.find(
    (part) => part.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedDomain.toLowerCase().replace(/[^a-z0-9]/g, ""),
  );
  return matched || normalizedDomain || prospect.title || "there";
}

export function formatEmailBody(body: string, prospect: ProspectRecord, userName: string) {
  const cleaned = String(body || "")
    .replace(/^(hi|hello|hey|dear)\b[^\n]*,?\s*/i, "")
    .replace(/\n?(thanks|best|regards|cheers)[,\s]*[\s\S]*$/i, "")
    .trim();
  const sentences = cleaned.match(/[^.!?]+[.!?]?/g)?.map((part) => part.trim()).filter(Boolean) || [];
  const paragraphs =
    sentences.length <= 2 ? sentences : [sentences.slice(0, 2).join(" "), sentences.slice(2).join(" ")];

  return [`Hi ${getCompanyDisplayName(prospect)},`, ...paragraphs, `Thanks,\n${userName || "Your Name"}`];
}
