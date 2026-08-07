export type AngleId = "observation" | "pain_point" | "curiosity";

export type FollowUpTone = "reminder" | "value_add" | "breakup";

export interface ProspectOutreachAngles {
  generated_at?: string;
  recommended_angle_id?: AngleId;
  angles?: Array<{
    id?: AngleId;
    label?: string;
    rationale?: string;
    variations?: Array<{ subject?: string; body?: string }>;
  }>;
  follow_ups?: {
    emails?: Array<{
      id?: FollowUpTone;
      label?: string;
      subject?: string;
      body?: string;
    }>;
  };
}

export interface ProspectRecord {
  id?: string;
  /**
   * Change detection, embedded from prospect_changes via its foreign key.
   * `watch_enabled` and `last_checked_at` say whether the account is being
   * monitored at all; `prospect_changes` is a count, not the rows, because the
   * list only needs to know that something moved.
   */
  watch_enabled?: boolean | null;
  last_checked_at?: string | null;
  prospect_changes?: Array<{ count: number }>;
  title?: string;
  domain?: string;
  url?: string;
  created_at?: string;
  description?: string;
  prospect_status?: string;
  sales_readiness_score?: number;
  what_they_do?: string;
  target_customer?: string;
  value_proposition?: string;
  best_sales_persona?: string;
  best_sales_persona_reason?: string;
  recommended_outreach_goal?: string;
  recommended_outreach_angle?: string;
  outreach_angles?: ProspectOutreachAngles | null;
}
