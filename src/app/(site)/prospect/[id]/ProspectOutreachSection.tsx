import { getRecommendedEmail, getReplyChance, getSecondaryEmails } from "./prospectFormat";
import ProspectEmailCard from "./ProspectEmailCard";
import type { ProspectRecord } from "./prospectTypes";

type ProspectOutreachSectionProps = {
  prospect: ProspectRecord;
  userName: string;
  error: string;
  outreachOpen: boolean;
  outreachLoading: boolean;
  followUpsLoading: boolean;
  canShowFollowUps: boolean;
  onGenerateOutreach: () => void;
  onToggleOutreach: () => void;
  onGenerateFollowUps: () => void;
};

export default function ProspectOutreachSection({
  prospect,
  userName,
  error,
  outreachOpen,
  outreachLoading,
  followUpsLoading,
  canShowFollowUps,
  onGenerateOutreach,
  onToggleOutreach,
  onGenerateFollowUps,
}: ProspectOutreachSectionProps) {
  const recommended = getRecommendedEmail(prospect);
  const secondary = getSecondaryEmails(prospect);
  const followUps = prospect.outreach_angles?.follow_ups?.emails || [];
  const visibilityButtonLabel = recommended
    ? outreachOpen
      ? "Hide emails"
      : "Show emails"
    : "Suggest outreach emails";
  const followUpButtonLabel = followUps.length > 0
    ? "Refresh follow-ups"
    : followUpsLoading
      ? "Generating..."
      : "Generate follow-ups";

  return (
    <section id="prospect-outreach" className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_-58px_rgba(15,23,42,0.42)] dark:border-white/10 dark:bg-white/5 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-accent">
            Outreach
          </div>
          <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">Suggested outreach emails</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {recommended ? (
            <button type="button" onClick={onGenerateOutreach} disabled={outreachLoading} className="inline-flex rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-55 dark:border-white/15 dark:text-white dark:hover:border-white/30">
              {outreachLoading ? "Refreshing..." : "Refresh emails"}
            </button>
          ) : null}
          {canShowFollowUps ? (
            <button type="button" onClick={onGenerateFollowUps} disabled={followUpsLoading} className="inline-flex rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-55 dark:border-white/15 dark:text-white dark:hover:border-white/30">
              {followUpButtonLabel}
            </button>
          ) : null}
          <button type="button" onClick={recommended ? onToggleOutreach : onGenerateOutreach} disabled={outreachLoading} className="inline-flex rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
            {outreachLoading && !recommended ? "Generating..." : visibilityButtonLabel}
          </button>
        </div>
      </div>
      {error ? <p className="mt-4 text-sm text-rose-600 dark:text-rose-300">{error}</p> : null}
      {recommended && outreachOpen ? (
        <div className="mt-6 space-y-5">
          {followUps.length > 0 ? (
            <div className="space-y-4 pt-1">
              <div className="grid gap-5 xl:grid-cols-3">
                {followUps.map((email) => (
                  <ProspectEmailCard key={email.id} title={email.label || "Follow-Up"} subject={email.subject} body={email.body} prospect={prospect} userName={userName} />
                ))}
              </div>
            </div>
          ) : null}
          <ProspectEmailCard title="Recommended Email" badge={getReplyChance(recommended.id, prospect.outreach_angles?.recommended_angle_id)} subject={recommended.variations?.[0]?.subject} body={recommended.variations?.[0]?.body} prospect={prospect} userName={userName} emphasized angleId={recommended.id} />
          <div className="grid gap-5 xl:grid-cols-2">
            {secondary.map((angle) => (
              <ProspectEmailCard key={angle.id} title={angle.label || "Suggested Email"} badge={getReplyChance(angle.id, prospect.outreach_angles?.recommended_angle_id)} subject={angle.variations?.[0]?.subject} body={angle.variations?.[0]?.body} prospect={prospect} userName={userName} angleId={angle.id} />
            ))}
          </div>
        </div>
      ) : !recommended ? (
        <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/66">
          Generate outreach here and we’ll save the emails back to this prospect automatically so they’re ready the next time you open it.
        </p>
      ) : null}
    </section>
  );
}
