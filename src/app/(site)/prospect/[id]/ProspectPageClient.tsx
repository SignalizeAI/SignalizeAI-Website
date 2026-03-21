"use client";

import Link from "next/link";
import ProspectHeader from "./ProspectHeader";
import ProspectOutreachSection from "./ProspectOutreachSection";
import ProspectSnapshotSection from "./ProspectSnapshotSection";
import ProspectStrategySection from "./ProspectStrategySection";
import { useProspectPage } from "./useProspectPage";
import { useProspectActions } from "./useProspectActions";

export default function ProspectPageClient({ id }: { id: string }) {
  const { state, prospect, setProspect, session } = useProspectPage(id);
  const actions = useProspectActions(prospect, setProspect, session);
  const shellClassName =
    "mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:max-w-[1400px] 2xl:max-w-[1600px]";

  if (state === "loading") {
    return <main className={`${shellClassName} py-32 text-center text-slate-600 dark:text-white/70`}>Loading prospect...</main>;
  }

  if (state === "signed_out") {
    return (
      <main className={`${shellClassName} py-32 text-center`}>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Sign in to view this prospect</h1>
        <p className="mt-4 text-slate-600 dark:text-white/70">This dashboard view is only available for your saved prospects.</p>
        <Link href="/signin" className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">Open sign in</Link>
      </main>
    );
  }

  if (state === "missing" || !prospect) {
    return <main className={`${shellClassName} py-32 text-center text-slate-600 dark:text-white/70`}>Prospect not found.</main>;
  }

  return (
    <main className="bg-gradient-to-b from-white via-slate-50 to-slate-100 pb-16 pt-28 dark:from-[#050505] dark:via-[#0a0a0a] dark:to-[#111111] md:pb-20 md:pt-32">
      <section className={shellClassName}>
        <div className="space-y-8 rounded-[2.25rem] border border-slate-200 bg-slate-50/75 p-5 shadow-[0_30px_90px_-58px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-white/[0.03] lg:p-8">
          <ProspectHeader
            prospect={prospect}
            statusLoading={actions.statusLoading}
            onStatusChange={(status) => void actions.changeStatus(status)}
          />
          <ProspectOutreachSection
            prospect={prospect}
            userName={session?.fullName || "Your Name"}
            error={actions.error}
            outreachOpen={actions.outreachOpen}
            outreachLoading={actions.outreachLoading}
            followUpsLoading={actions.followUpsLoading}
            canShowFollowUps={actions.canShowFollowUps}
            onGenerateOutreach={() => void actions.openOutreach()}
            onToggleOutreach={actions.toggleOutreach}
            onGenerateFollowUps={() => void actions.openFollowUps()}
          />
          <div className="grid items-stretch gap-8 xl:grid-cols-2">
            <div className="h-full">
              <ProspectSnapshotSection prospect={prospect} />
            </div>
            <div className="h-full">
              <ProspectStrategySection prospect={prospect} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
