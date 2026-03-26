"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notifyProspectContentUpdated, notifyProspectStatusUpdated } from "./prospectBridge";
import { buildProspectPreviewPath } from "./prospectDraft";
import { deleteProspectRecord, type SessionUser } from "./prospectPersistence";
import {
  generateProspectFollowUps,
  generateProspectOutreach,
  saveProspect,
  updateProspectStatus,
} from "./prospectActions";
import { getRecommendedEmail } from "./prospectFormat";
import type { ProspectRecord } from "./prospectTypes";

export function useProspectActions(
  prospect: ProspectRecord | null,
  setProspect: (value: ProspectRecord | null) => void,
  session: SessionUser | null,
) {
  const router = useRouter();
  const [outreachOpen, setOutreachOpen] = useState(Boolean(prospect?.outreach_angles?.angles?.length));
  const [outreachLoading, setOutreachLoading] = useState(false);
  const [followUpsLoading, setFollowUpsLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (prospect?.outreach_angles?.angles?.length) {
      setOutreachOpen(true);
    }
  }, [prospect?.outreach_angles]);

  const openOutreach = async () => {
    if (!prospect || !session) return;
    setError("");
    setOutreachOpen(true);
    setOutreachLoading(true);
    try {
      const outreachAngles = await generateProspectOutreach(prospect, session);
      setProspect({ ...prospect, outreach_angles: outreachAngles });
      if (prospect.id) {
        notifyProspectContentUpdated(prospect.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate outreach emails");
      setOutreachOpen(false);
    } finally {
      setOutreachLoading(false);
    }
  };

  const openFollowUps = async () => {
    if (!prospect || !session) return;
    setError("");
    if (prospect.outreach_angles?.follow_ups?.emails?.length) return;
    const openingEmail = getRecommendedEmail(prospect)?.variations?.[0];
    if (!openingEmail) return;
    setFollowUpsLoading(true);
    try {
      const outreachAngles = await generateProspectFollowUps(prospect, openingEmail, session);
      setProspect({ ...prospect, outreach_angles: outreachAngles });
      if (prospect.id) {
        notifyProspectContentUpdated(prospect.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate follow-up emails");
    } finally {
      setFollowUpsLoading(false);
    }
  };

  const toggleOutreach = () => setOutreachOpen((current) => !current);

  const changeStatus = async (nextStatus: string) => {
    if (!prospect?.id || !session || nextStatus === prospect.prospect_status) return;
    setError("");
    setStatusLoading(true);
    try {
      await updateProspectStatus(prospect.id, nextStatus, session);
      setProspect({ ...prospect, prospect_status: nextStatus });
      notifyProspectStatusUpdated(prospect.id, nextStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update prospect status");
    } finally {
      setStatusLoading(false);
    }
  };

  const saveCurrentProspect = async () => {
    if (!prospect || !session || prospect.id) return;
    setError("");
    setSaveLoading(true);
    try {
      const savedProspect = await saveProspect(prospect, session);
      setProspect(savedProspect);
      router.replace(`/prospect/${savedProspect.id}`);
      notifyProspectContentUpdated(savedProspect.id!);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save prospect");
    } finally {
      setSaveLoading(false);
    }
  };

  const unsaveCurrentProspect = async () => {
    if (!prospect?.id || !session) return;
    setError("");
    setSaveLoading(true);
    try {
      const savedId = prospect.id;
      await deleteProspectRecord(savedId, session.accessToken);
      const previewProspect = {
        ...prospect,
        id: undefined,
        prospect_status: undefined,
      };
      setProspect(previewProspect);
      router.replace(buildProspectPreviewPath(previewProspect));
      notifyProspectContentUpdated(savedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unsave prospect");
    } finally {
      setSaveLoading(false);
    }
  };

  return {
    error,
    isSaved: Boolean(prospect?.id),
    outreachOpen,
    outreachLoading,
    openOutreach,
    toggleOutreach,
    canShowFollowUps: Boolean(prospect?.outreach_angles?.angles?.length),
    followUpsLoading,
    openFollowUps,
    saveLoading,
    saveCurrentProspect,
    unsaveCurrentProspect,
    statusLoading,
    changeStatus,
  };
}
