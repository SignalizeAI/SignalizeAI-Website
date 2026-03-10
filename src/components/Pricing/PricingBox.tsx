"use client";

import React, { useState, useEffect } from "react";
import OfferList from "./OfferList";
import { Price } from "@/types/price";
import { supabase } from "@/utils/supabaseClient";
import BrowserModal from "@/components/BrowserModal";

interface PricingBoxProps {
  product: Price;
  currentPlan: string;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const planDescriptions: Record<string, string> = {
  free: "For individual reps testing quick website checks and lightweight saved research.",
  pro: "For solo operators or small teams that need batch runs, saved analyses, and export.",
  team: "For higher-volume teams running larger research lists with broader saved-analysis capacity.",
};

const PricingBox = ({ product, currentPlan, isHighlighted, onMouseEnter, onMouseLeave }: PricingBoxProps) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUserEmail(session.user.email || null);
        setUserId(session.user.id || null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    }
  };

  const getButtonConfig = () => {
    const planName = product.nickname?.toLowerCase() || "";
    const currentPlanLower = currentPlan?.toLowerCase() || "free";

    if (planName !== "free" && currentPlanLower === planName) {
      return {
        disabled: true,
        text: "Current plan",
        showSignIn: false,
      };
    }

    if (currentPlanLower === "team" && (planName === "pro" || planName === "free")) {
      return {
        disabled: true,
        text: "Already on Team",
        showSignIn: false,
      };
    }

    if (currentPlanLower === "pro" && planName === "free") {
      return {
        disabled: true,
        text: "Already on Pro",
        showSignIn: false,
      };
    }

    if (planName !== "free" && !userEmail) {
      return {
        disabled: false,
        text: "Sign in to subscribe",
        showSignIn: true,
      };
    }

    return {
      disabled: false,
      text: planName === "free" ? "Choose browser" : "Subscribe now",
      showSignIn: false,
    };
  };

  const handleSubscription = async (e: any) => {
    e.preventDefault();

    if (product.nickname === "Free") {
      setInstallModalOpen(true);
      return;
    }

    // For paid plans, require sign-in
    if (!userEmail || !userId) {
      return;
    }

    // Build checkout URL with authenticated user data
    const baseUrl = product.url;
    const plan = product.nickname?.toLowerCase() || "pro";

    // Add user data and redirect to success page with plan
    const successUrl = encodeURIComponent(`${window.location.origin}/payment-success?plan=${plan}`);
    const checkoutUrl = `${baseUrl}&checkout[email]=${encodeURIComponent(userEmail)}&checkout[custom][user_id]=${encodeURIComponent(userId)}&checkout[success_url]=${successUrl}`;
    window.open(checkoutUrl, '_blank');
  };

  const handleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/?redirect=pricing`
        }
      });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const buttonConfig = getButtonConfig();
  const planName = product.nickname?.toLowerCase() || "free";
  const priceDisplay =
    planName === "free"
      ? "Free"
      : `₹${(product.unit_amount / 100).toLocaleString("en-IN")}/mo`;

  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3 flex flex-col items-stretch">
        <div
          className={`relative z-10 mb-10 overflow-hidden rounded-[2rem] bg-white dark:bg-[#0a0a0a] flex flex-col h-full transition duration-300 hover:shadow-2xl ${isHighlighted
            ? "px-8 py-10 sm:p-12 lg:px-8 lg:py-12 xl:p-12 border border-primary dark:border-accent shadow-xl dark:shadow-[0_0_30px_rgba(0,229,255,0.15)] md:scale-105 lg:scale-[1.03] relative z-20"
            : "px-8 py-10 sm:p-12 lg:px-8 lg:py-12 xl:p-12 border border-gray-200 dark:border-white/10"
            }`}
          data-wow-delay=".1s"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {isHighlighted && (
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          )}
          {product.nickname === "Team" && (
            <>
              <p className="absolute right-4 top-4 inline-block sm:hidden rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-semibold text-white dark:text-black">
                Recommended
              </p>
              <p className="absolute -right-8 top-[60px] hidden sm:inline-block rotate-45 rounded-md bg-gradient-to-r from-primary to-accent px-8 py-1.5 text-xs font-semibold text-white dark:text-black shadow-lg">
                Recommended
              </p>
            </>
          )}
          <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">
            {product.nickname}
          </span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white xl:text-[40px] xl:leading-[1.1]">
            {priceDisplay}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/65">
            {planDescriptions[planName]}
          </p>

          <div className="mb-8 mt-8 grow">
            <h3 className="mb-6 border-b border-gray-200 pb-4 text-base font-semibold text-slate-900 dark:border-white/10 dark:text-white">
              Included Features
            </h3>
            <div className="mb-8 text-slate-600 dark:text-white/70">
              {product?.offers.map((offer, i) => {
                const offerText = typeof offer === "string" ? offer : offer.text;
                const available = typeof offer === "string" ? true : (offer.available ?? true);
                return <OfferList key={i} text={offerText} available={available} />;
              })}
            </div>
          </div>
          <div className="w-full mt-auto">
            <button
              onClick={buttonConfig.showSignIn ? handleSignIn : handleSubscription}
              disabled={buttonConfig.disabled}
              className={`inline-block w-full rounded-full px-7 py-3.5 text-center text-sm font-semibold transition-all duration-300 ${buttonConfig.disabled
                ? "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-white/40"
                : isHighlighted
                  ? "bg-gradient-to-r from-primary to-accent text-white dark:text-black hover:scale-[1.02] hover:shadow-lg"
                  : "bg-gray-100 text-slate-900 hover:bg-gray-200 border border-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/10"
                }`}
            >
              {buttonConfig.text}
            </button>
          </div>
        </div>
      </div>
      <BrowserModal isOpen={installModalOpen} onClose={() => setInstallModalOpen(false)} />
    </>
  );
};

export default PricingBox;
