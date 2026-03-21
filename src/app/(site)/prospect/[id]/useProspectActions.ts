"use client";

import { useEffect, useMemo, useState } from "react";
import {
  generateProspectFollowUps,
  generateProspectOutreach,
  updateProspectStatus,
} from "./prospectActions";
import { getRecommendedEmail } from "./prospectFormat";
import type { ProspectRecord } from "./prospectTypes";

type SessionState = {
  accessToken: string;
  fullName: string;
};

export function useProspectActions(
  prospect: ProspectRecord | null,
  setProspect: (value: ProspectRecord | null) => void,
  session: SessionState | null,
) {
  const [outreachOpen, setOutreachOpen] = useState(Boolean(prospect?.outreach_angles?.angles?.length));
  const [outreachLoading, setOutreachLoading] = useState(false);
  const [followUpsLoading, setFollowUpsLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState("");

  const canShowFollowUps = useMemo(
    () => Boolean(prospect?.outreach_angles?.angles?.length),
    [prospect?.outreach_angles?.angles],
  );

  useEffect(() => {
    if (prospect?.outreach_angles?.angles?.length) {
      setOutreachOpen(true);
    }
  }, [prospect?.outreach_angles]);

  const notifyProspectContentUpdated = (savedId: string) => {
    window.postMessage(
      {
        type: "SIGNALIZE_PROSPECT_CONTENT_UPDATED",
        savedId,
      },
      "*",
    );
  };

  const openOutreach = async () => {
    if (!prospect || !session) return;
    setError("");
    setOutreachOpen(true);
    setOutreachLoading(true);
    try {
      const outreachAngles = await generateProspectOutreach(prospect, session);
      setProspect({ ...prospect, outreach_angles: outreachAngles });
      notifyProspectContentUpdated(prospect.id);
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
      notifyProspectContentUpdated(prospect.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate follow-up emails");
    } finally {
      setFollowUpsLoading(false);
    }
  };

  const toggleOutreach = () => {
    setOutreachOpen((current) => !current);
  };

  const changeStatus = async (nextStatus: string) => {
    if (!prospect || !session || nextStatus === prospect.prospect_status) return;
    setError("");
    setStatusLoading(true);
    try {
      await updateProspectStatus(prospect.id, nextStatus, session);
      setProspect({ ...prospect, prospect_status: nextStatus });
      window.postMessage(
        {
          type: "SIGNALIZE_PROSPECT_STATUS_UPDATED",
          savedId: prospect.id,
          status: nextStatus,
        },
        "*",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update prospect status");
    } finally {
      setStatusLoading(false);
    }
  };

  return {
    error,
    outreachOpen,
    outreachLoading,
    openOutreach,
    toggleOutreach,
    canShowFollowUps,
    followUpsLoading,
    openFollowUps,
    statusLoading,
    changeStatus,
  };
}
