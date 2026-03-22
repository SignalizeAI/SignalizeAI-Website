import CopyTextButton from "./CopyTextButton";
import { formatEmailBody } from "./prospectFormat";
import type { AngleId, ProspectRecord } from "./prospectTypes";

type ProspectEmailCardProps = {
  title: string;
  badge?: string;
  subject?: string;
  body?: string;
  prospect: ProspectRecord;
  userName: string;
  emphasized?: boolean;
  angleId?: AngleId;
};

export default function ProspectEmailCard({
  title,
  badge,
  subject,
  body,
  prospect,
  userName,
  emphasized = false,
  angleId,
}: ProspectEmailCardProps) {
  const paragraphs = formatEmailBody(body || "", prospect, userName);
  const emailText = [subject || "", ...paragraphs].filter(Boolean).join("\n\n");
  const badgeTone = badge?.startsWith("High")
    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/12 dark:text-emerald-200"
    : badge?.startsWith("Medium")
      ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/12 dark:text-amber-200"
      : badge?.startsWith("Low")
        ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/12 dark:text-rose-200"
        : "border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/8 dark:text-white/72";
  const tone = emphasized
    ? "border-sky-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50 text-slate-950 shadow-[0_24px_60px_-42px_rgba(14,165,233,0.45)] dark:border-cyan-400/28 dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(255,255,255,0.08))] dark:text-white dark:shadow-[0_28px_70px_-48px_rgba(34,211,238,0.45)]"
    : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]";
  const titleTone = emphasized
    ? "text-sky-700 dark:text-sky-200"
    : angleId === "pain_point" || angleId === "curiosity"
      ? "text-slate-700 dark:text-white/82"
      : "text-slate-700 dark:text-white/82";

  return (
    <article className={`rounded-[1.6rem] border p-5 ${tone}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className={`text-sm font-semibold ${titleTone}`}>{title}</div>
        <div className="flex items-center gap-2">
          {badge ? (
            <div className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${badgeTone}`}>
              {badge}
            </div>
          ) : null}
          <CopyTextButton value={emailText} tone={emphasized ? "inverse" : "default"} />
        </div>
      </div>
      <h3 className={`mt-4 text-lg font-semibold ${emphasized ? "text-slate-950 dark:text-white" : "text-slate-950 dark:text-white"}`}>{subject || "—"}</h3>
      <div className={`mt-4 space-y-4 text-sm leading-7 ${emphasized ? "text-slate-700 dark:text-white/84" : "text-slate-700 dark:text-white/76"}`}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="whitespace-pre-wrap">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
