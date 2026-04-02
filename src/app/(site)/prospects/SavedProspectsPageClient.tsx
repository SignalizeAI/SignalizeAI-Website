"use client";

import Link from "next/link";
import SavedProspectsBulkActions from "./SavedProspectsBulkActions";
import SavedProspectCard from "./SavedProspectCard";
import SavedProspectsEmptyState from "./SavedProspectsEmptyState";
import SavedProspectsHeader from "./SavedProspectsHeader";
import SavedProspectsPagination from "./SavedProspectsPagination";
import SavedProspectsToolbar from "./SavedProspectsToolbar";
import { useSavedProspectsPage } from "./useSavedProspectsPage";

const shellClassName =
  "mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:max-w-[1400px] 2xl:max-w-[1600px]";

export default function SavedProspectsPageClient() {
  const {
    state,
    prospects,
    page,
    totalCount,
    pageSize,
    search,
    status,
    canBulkDelete,
    selectionMode,
    selectedIds,
    allVisibleSelected,
    deletingIds,
    exportingFormat,
    toggleSelectionMode,
    toggleSelected,
    toggleSelectAllVisible,
    setPage,
    setSearch,
    setStatus,
    handleExport,
    handleDeleteSelected,
    handleDelete,
  } = useSavedProspectsPage();

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (state === "loading") {
    return (
      <main className="flex min-h-[60vh] items-center justify-center py-32 text-slate-600 dark:text-white/70">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent dark:border-accent dark:border-t-transparent" />
          <p className="text-sm font-medium">Loading workspace...</p>
        </div>
      </main>
    );
  }

  if (state === "signed_out") {
    return (
      <main className={`${shellClassName} py-32 text-center sm:py-40`}>
        <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-slate-200 bg-white/70 p-12 shadow-[0_32px_80px_-48px_rgba(15,23,42,0.24)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Sign in to view your prospects
          </h1>
          <p className="mt-4 text-slate-600 dark:text-white/70">
            Access your saved prospect list, strategies, and outreach templates across all your devices.
          </p>
          <Link
            href="/signin"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-8 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Open sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 pb-16 pt-28 dark:from-[#050505] dark:via-[#0a0a0a] dark:to-[#111111] md:pb-20 md:pt-32">
      <div className={shellClassName}>
        <div className="space-y-8 rounded-[2.25rem] border border-slate-200 bg-slate-50/75 p-5 shadow-[0_30px_90px_-58px_rgba(15,23,42,0.28)] dark:border-white/10 dark:bg-white/[0.03] lg:p-8">
          <SavedProspectsHeader totalCount={totalCount} page={page} totalPages={totalPages} />

          <section className="rounded-[2rem] border border-slate-200 bg-white/40 p-4 dark:border-white/5 dark:bg-white/[0.01]">
            <SavedProspectsToolbar
              search={search}
              status={status}
              canBulkDelete={canBulkDelete}
              selectionMode={selectionMode}
              exportingFormat={exportingFormat}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
              onToggleSelectionMode={toggleSelectionMode}
              onExport={handleExport}
            />
          </section>

          {selectionMode ? (
            <SavedProspectsBulkActions
              selectedCount={selectedIds.length}
              allVisibleSelected={allVisibleSelected}
              deleting={deletingIds.length > 0}
              onToggleSelectAllVisible={toggleSelectAllVisible}
              onDeleteSelected={() => void handleDeleteSelected()}
              onCancel={toggleSelectionMode}
            />
          ) : null}

          <div className="min-h-[400px]">
            {prospects.length === 0 ? (
              <SavedProspectsEmptyState
                hasFilters={Boolean(search || status !== "all")}
                onReset={() => {
                  setSearch("");
                  setStatus("all");
                }}
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {prospects.map((prospect) => (
                  <SavedProspectCard
                    key={prospect.id || prospect.domain || prospect.title}
                    prospect={prospect}
                    selectionMode={selectionMode}
                    selected={prospect.id ? selectedIds.includes(prospect.id) : false}
                    deleting={Boolean(prospect.id && deletingIds.includes(prospect.id))}
                    onToggleSelect={toggleSelected}
                    onDelete={(prospectId) => void handleDelete(prospectId)}
                  />
                ))}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <footer className="mt-8 rounded-[2rem] border border-slate-200 bg-white/40 p-4 dark:border-white/5 dark:bg-white/[0.01]">
              <SavedProspectsPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </footer>
          )}
        </div>
      </div>
    </main>
  );
}
