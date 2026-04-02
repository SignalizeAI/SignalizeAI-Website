"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabaseClient } from "@/utils/supabaseClient";
import { notifyProspectContentUpdated } from "../prospect/[id]/prospectBridge";
import type { ProspectRecord } from "../prospect/[id]/prospectTypes";
import {
  exportSavedProspectsToCSV,
  exportSavedProspectsToExcel,
} from "./savedProspectsExport";
import {
  deleteSavedProspect,
  deleteSavedProspects,
  fetchSavedProspectsExportRows,
  fetchSavedProspectsPage,
} from "./savedProspectsData";

type LoadState = "loading" | "signed_out" | "ready" | "error";
const PAGE_SIZE = 15;

function applySignedOutView({
  clearSelection,
  setAccessToken,
  setDeletingIds,
  setExportingFormat,
  setProspects,
  setState,
  setTotalCount,
  setUserName,
}: {
  clearSelection: () => void;
  setAccessToken: (value: string | null) => void;
  setDeletingIds: (value: string[]) => void;
  setExportingFormat: (value: "csv" | "excel" | null) => void;
  setProspects: (value: ProspectRecord[]) => void;
  setState: (value: LoadState) => void;
  setTotalCount: (value: number) => void;
  setUserName: (value: string) => void;
}) {
  clearSelection();
  setDeletingIds([]);
  setExportingFormat(null);
  setAccessToken(null);
  setUserName("Your Name");
  setProspects([]);
  setTotalCount(0);
  setState("signed_out");
}

export function useSavedProspectsPage() {
  const [state, setState] = useState<LoadState>("loading");
  const [prospects, setProspects] = useState<ProspectRecord[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userName, setUserName] = useState("Your Name");
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [exportingFormat, setExportingFormat] = useState<"csv" | "excel" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [authVersion, setAuthVersion] = useState(0);
  const authVersionRef = useRef(0);
  const canBulkDelete = totalCount > 3;

  const clearSelection = () => {
    setSelectionMode(false);
    setSelectedIds([]);
  };

  useEffect(() => {
    let cancelled = false;
    const runVersion = authVersionRef.current;

    const load = async () => {
      try {
        const supabase = getSupabaseClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (cancelled || runVersion !== authVersionRef.current) return;
        if (!session?.access_token) {
          applySignedOutView({
            clearSelection,
            setAccessToken,
            setDeletingIds,
            setExportingFormat,
            setProspects,
            setState,
            setTotalCount,
            setUserName,
          });
          return;
        }

        setAccessToken(session.access_token);
        setUserName(
          session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            session.user.email ||
            "Your Name",
        );
        const result = await fetchSavedProspectsPage(session.access_token, {
          page,
          pageSize: PAGE_SIZE,
          search,
          status,
        });
        if (cancelled || runVersion !== authVersionRef.current) return;

        setProspects(result.rows);
        setTotalCount(result.totalCount);
        setState("ready");
      } catch (error) {
        console.error("Failed to load saved prospects", error);
        if (cancelled) return;
        setState("error");
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [authVersion, page, refreshKey, search, status]);

  useEffect(() => {
    const supabase = getSupabaseClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authVersionRef.current += 1;
      setAuthVersion(authVersionRef.current);

      if (!session?.access_token) {
        applySignedOutView({
          clearSelection,
          setAccessToken,
          setDeletingIds,
          setExportingFormat,
          setProspects,
          setState,
          setTotalCount,
          setUserName,
        });
        return;
      }

      setAccessToken(session.access_token);
      setUserName(
        session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email ||
          "Your Name",
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "SIGNALIZE_EXTENSION_PROSPECT_CONTENT_UPDATED") {
        return;
      }

      setRefreshKey((current) => current + 1);
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (selectionMode && !canBulkDelete) {
      setSelectionMode(false);
      setSelectedIds([]);
    }
  }, [canBulkDelete, selectionMode]);

  const handleExport = async (format: "csv" | "excel") => {
    if (!accessToken || state !== "ready") return;

    try {
      setExportingFormat(format);
      const rows = await fetchSavedProspectsExportRows(accessToken, { search, status });
      if (format === "csv") {
        exportSavedProspectsToCSV(rows, userName);
      } else {
        exportSavedProspectsToExcel(rows, userName);
      }
    } catch (error) {
      console.error("Failed to export saved prospects", error);
    } finally {
      setExportingFormat(null);
    }
  };

  const toggleSelectionMode = () => {
    if (selectionMode) {
      clearSelection();
      return;
    }
    setSelectionMode(true);
    setSelectedIds([]);
  };

  const toggleSelected = (prospectId: string) => {
    setSelectedIds((current) =>
      current.includes(prospectId)
        ? current.filter((id) => id !== prospectId)
        : [...current, prospectId],
    );
  };

  const toggleSelectAllVisible = () => {
    const visibleIds = prospects.map((prospect) => prospect.id).filter(Boolean) as string[];
    const allSelected =
      visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((current) => current.filter((id) => !visibleIds.includes(id)));
      return;
    }

    setSelectedIds((current) => Array.from(new Set([...current, ...visibleIds])));
  };

  const handleDelete = async (prospectId: string) => {
    if (!accessToken) return;

    try {
      setDeletingIds([prospectId]);
      await deleteSavedProspect(prospectId, accessToken);
      notifyProspectContentUpdated(prospectId);

      const nextTotal = Math.max(0, totalCount - 1);
      const lastPage = Math.max(1, Math.ceil(nextTotal / PAGE_SIZE));
      if (page > lastPage) {
        setPage(lastPage);
      } else {
        setRefreshKey((current) => current + 1);
      }
      setTotalCount(nextTotal);
    } catch (error) {
      console.error("Failed to delete saved prospect", error);
    } finally {
      setDeletingIds([]);
    }
  };

  const handleDeleteSelected = async () => {
    if (!accessToken || selectedIds.length === 0) return;

    try {
      setDeletingIds(selectedIds);
      await deleteSavedProspects(selectedIds, accessToken);
      selectedIds.forEach((prospectId) => notifyProspectContentUpdated(prospectId));

      const nextTotal = Math.max(0, totalCount - selectedIds.length);
      const lastPage = Math.max(1, Math.ceil(nextTotal / PAGE_SIZE));
      clearSelection();
      if (page > lastPage) {
        setPage(lastPage);
      } else {
        setRefreshKey((current) => current + 1);
      }
      setTotalCount(nextTotal);
    } catch (error) {
      console.error("Failed to delete selected saved prospects", error);
    } finally {
      setDeletingIds([]);
    }
  };

  const visibleIds = prospects.map((prospect) => prospect.id).filter(Boolean) as string[];
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  return {
    state,
    prospects,
    page,
    totalCount,
    pageSize: PAGE_SIZE,
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
    setPage: (value: number) => {
      clearSelection();
      setPage(value);
    },
    setSearch: (value: string) => {
      clearSelection();
      setPage(1);
      setSearch(value);
    },
    setStatus: (value: string) => {
      clearSelection();
      setPage(1);
      setStatus(value);
    },
    handleExport,
    handleDeleteSelected,
    handleDelete,
  };
}
