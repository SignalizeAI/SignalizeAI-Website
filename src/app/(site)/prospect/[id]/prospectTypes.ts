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
  id: string;
  title?: string;
  domain?: string;
  url?: string;
  description?: string;
  prospect_status?: string;
  sales_readiness_score?: number;
  what_they_do?: string;
  target_customer?: string;
  value_proposition?: string;
  sales_angle?: string;
  best_sales_persona?: string;
  best_sales_persona_reason?: string;
  recommended_outreach_persona?: string;
  recommended_outreach_goal?: string;
  recommended_outreach_angle?: string;
  recommended_outreach_message?: string;
  outreach_angles?: ProspectOutreachAngles | null;
}
