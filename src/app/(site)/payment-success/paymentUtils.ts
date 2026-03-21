import { getSupabaseClient } from "@/utils/supabaseClient";

export interface PaymentData {
  amount: number;
  date: string;
  plan: string;
  email: string;
}

export const notifyPaymentSuccess = () => {
  if (window.opener) {
    window.opener.postMessage({ type: "PAYMENT_SUCCESS" }, "*");
  }

  if (typeof (window as any).chrome !== "undefined" && (window as any).chrome.runtime) {
    try {
      (window as any).chrome.runtime.sendMessage({ type: "PAYMENT_SUCCESS" }, () => {
        void (window as any).chrome.runtime.lastError;
      });
    } catch {
      // Extension context not available.
    }
  }
};

export const fetchPaymentData = async (): Promise<PaymentData> => {
  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    throw new Error("Not authenticated. Please sign in.");
  }

  const urlParams = new URLSearchParams(window.location.search);
  const planParam = (
    urlParams.get("plan") ||
    urlParams.get("plan_name") ||
    urlParams.get("variant") ||
    urlParams.get("product") ||
    ""
  ).toLowerCase();

  const planPricing: Record<string, number> = { pro: 999, team: 3999 };
  let normalizedPlan = "";
  if (planParam.includes("team")) normalizedPlan = "team";
  else if (planParam.includes("pro")) normalizedPlan = "pro";
  else if (planParam && planPricing[planParam]) normalizedPlan = planParam;

  let quotaPlan = "";
  try {
    const quotaRes = await fetch("https://api.signalizeai.org/quota", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (quotaRes.ok) {
      const quotaData = await quotaRes.json();
      if (quotaData?.plan && planPricing[quotaData.plan]) quotaPlan = quotaData.plan;
    }
  } catch {
    // Ignore quota lookup failures.
  }

  const plan = normalizedPlan || quotaPlan || "pro";
  return {
    amount: planPricing[plan] / 100,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    plan: plan.charAt(0).toUpperCase() + plan.slice(1),
    email: session.user.email || "",
  };
};
