"use client";

import { useEffect, useState } from "react";
import type { Price } from "@/types/price";
import { getSupabaseClient } from "@/utils/supabaseClient";

const getButtonConfig = (product: Price, currentPlan: string, userEmail: string | null) => {
  const planName = product.nickname?.toLowerCase() || "";
  const currentPlanLower = currentPlan?.toLowerCase() || "free";

  if (planName !== "free" && currentPlanLower === planName) {
    return { disabled: true, text: "Current plan", showSignIn: false };
  }
  if (currentPlanLower === "team" && (planName === "pro" || planName === "free")) {
    return { disabled: true, text: "Already on Team", showSignIn: false };
  }
  if (currentPlanLower === "pro" && planName === "free") {
    return { disabled: true, text: "Already on Pro", showSignIn: false };
  }
  if (planName !== "free" && !userEmail) {
    return { disabled: false, text: "Sign in to subscribe", showSignIn: true };
  }
  return {
    disabled: false,
    text: planName === "free" ? "Choose browser" : "Subscribe now",
    showSignIn: false,
  };
};

const usePricingBoxState = (product: Price, currentPlan: string) => {
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();

    const applySession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUserEmail(session.user.email || null);
          setUserId(session.user.id || null);
          return;
        }
        setUserEmail(null);
        setUserId(null);
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    void applySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void applySession();
    });

    const handleFocus = () => {
      void applySession();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  const handleSubscription = async () => {
    if (product.nickname === "Free") {
      setInstallModalOpen(true);
      return;
    }
    if (!userEmail || !userId) {
      return;
    }
    const plan = product.nickname?.toLowerCase() || "pro";
    const successUrl = encodeURIComponent(`${window.location.origin}/payment-success?plan=${plan}`);
    const checkoutUrl = `${product.url}&checkout[email]=${encodeURIComponent(userEmail)}&checkout[custom][user_id]=${encodeURIComponent(userId)}&checkout[success_url]=${successUrl}`;
    window.open(checkoutUrl, "_blank");
  };

  const handleSignIn = async () => {
    try {
      const supabase = getSupabaseClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/pricing` },
      });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return {
    buttonConfig: getButtonConfig(product, currentPlan, userEmail),
    handleAction: getButtonConfig(product, currentPlan, userEmail).showSignIn ? handleSignIn : handleSubscription,
    installModalOpen,
    setInstallModalOpen,
  };
};

export default usePricingBoxState;
