"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/utils/supabaseClient";
import { fetchProspectRecord } from "./prospectData";
import { buildProspectPreviewPath, decodeProspectDraft } from "./prospectDraft";
import type { ProspectRecord } from "./prospectTypes";

type LoadState = "loading" | "signed_out" | "ready" | "missing";

export function useProspectPage(id: string, draft: string | null) {
  const [state, setState] = useState<LoadState>("loading");
  const [prospect, setProspect] = useState<ProspectRecord | null>(null);
  const [session, setSession] = useState<{
    accessToken: string;
    fullName: string;
    userId: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const draftProspect = decodeProspectDraft(draft);

    const load = async () => {
      const supabase = getSupabaseClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (cancelled) return;
      if (!session?.access_token) {
        setState("signed_out");
        return;
      }

      setSession({
        accessToken: session.access_token,
        fullName:
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email ||
          "Your Name",
        userId: session.user.id,
      });

      if (id === "preview" && draftProspect) {
        setProspect(draftProspect);
        setState("ready");
        return;
      }

      const record = await fetchProspectRecord(id, session.access_token);
      if (cancelled) return;

      if (!record) {
        if (draftProspect) {
          setProspect(draftProspect);
          setState("ready");
        } else {
          setState("missing");
        }
        return;
      }

      setProspect(record);
      setState("ready");
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [draft, id]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.data?.type !== "SIGNALIZE_EXTENSION_PROSPECT_STATUS_UPDATED") return;

      setProspect((current) => {
        if (!current?.id || event.data.savedId !== current.id) return current;
        return {
          ...current,
          prospect_status: event.data.status,
        };
      });
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!session?.accessToken || !prospect?.id) return;
    if (state !== "ready") return;

    let cancelled = false;

    const refreshProspect = async () => {
      if (document.hidden) return;
      const currentSavedId = prospect.id;
      if (!currentSavedId) return;

      const record = await fetchProspectRecord(currentSavedId, session.accessToken);
      if (cancelled) return;

      if (!record) {
        setProspect((current) => {
          if (!current?.id) return current;
          const unsavedProspect = {
            ...current,
            id: undefined,
            prospect_status: undefined,
          };
          window.history.replaceState({}, "", buildProspectPreviewPath(unsavedProspect));
          return unsavedProspect;
        });
        return;
      }

      setProspect((current) => {
        if (!current) return record;
        return JSON.stringify(current) === JSON.stringify(record) ? current : record;
      });
    };

    const intervalId = window.setInterval(() => {
      void refreshProspect();
    }, 2000);

    const handleFocus = () => {
      void refreshProspect();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, [prospect?.id, session?.accessToken, state]);

  return { state, prospect, setProspect, session };
}
