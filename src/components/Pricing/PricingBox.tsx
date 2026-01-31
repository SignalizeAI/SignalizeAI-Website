"use client";

import React, { useState, useEffect } from "react";
import OfferList from "./OfferList";
import { Price } from "@/types/price";
import { supabase } from "@/utils/supabaseClient";

interface PricingBoxProps {
  product: Price;
  currentPlan: string;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const PricingBox = ({ product, currentPlan, isHighlighted, onMouseEnter, onMouseLeave }: PricingBoxProps) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);

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

    if (currentPlanLower === planName) {
      return {
        disabled: true,
        text: "Current Plan",
        showSignIn: false,
      };
    }

    if (currentPlanLower === "team" && (planName === "pro" || planName === "free")) {
      return {
        disabled: true,
        text: "Already on Team plan",
        showSignIn: false,
      };
    }

    if (currentPlanLower === "pro" && planName === "free") {
      return {
        disabled: true,
        text: "Already a Pro member",
        showSignIn: false,
      };
    }

    if (planName === "free" && currentPlanLower === "free") {
      return {
        disabled: true,
        text: "Current Plan",
        showSignIn: false,
      };
    }

    if (planName !== "free" && !userEmail) {
      return {
        disabled: false,
        text: "Sign in to Subscribe",
        showSignIn: true,
      };
    }

    return {
      disabled: false,
      text: planName === "free" ? "Try Now" : "Subscribe Now",
      showSignIn: false,
    };
  };

  const handleSubscription = async (e: any) => {
    e.preventDefault();
    
    if (product.nickname === "Free") {
      // Free tier - just open Chrome Web Store
      window.open(product.url, '_blank');
      return;
    }

    // For paid plans, require sign-in
    if (!userEmail || !userId) {
      setShowSignIn(true);
      return;
    }

    // Build checkout URL with authenticated user data
    const baseUrl = product.url;
    const plan = product.nickname?.toLowerCase() || "pro";
    const successUrl = `${window.location.origin}/payment-success?plan=${plan}`;
    
    // Add user data to checkout
    const checkoutUrl = `${baseUrl}&checkout[email]=${encodeURIComponent(userEmail)}&checkout[custom][user_id]=${encodeURIComponent(userId)}`;
    
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

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3 flex flex-col items-stretch">
      <div
        className={`relative z-10 mb-10 overflow-hidden rounded-xl bg-white shadow-pricing-2 dark:bg-dark-2 flex flex-col h-full transition duration-300 hover:shadow-2xl ${
          isHighlighted
            ? "px-6 py-8 sm:p-10 lg:px-5 lg:py-8 xl:p-11 border-2 border-primary md:scale-105 lg:scale-110 relative z-20"
            : "px-6 py-8 sm:p-10 lg:px-5 lg:py-8 xl:p-11 border-2 border-transparent"
        }`}
        data-wow-delay=".1s"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {product.nickname === "Team" && (
          <>
            <p className="absolute right-4 top-4 inline-block sm:hidden rounded-full bg-primary px-4 py-1 text-xs font-medium text-white">
              Recommended
            </p>
            <p className="absolute -right-12.5 top-15 hidden sm:inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
              Recommended
            </p>
          </>
        )}
        <span className="mb-4 block text-lg font-medium text-dark dark:text-white">
          {product.nickname}
        </span>
        <h2 className="mb-8 text-3xl font-semibold text-dark dark:text-white xl:text-[36px] xl:leading-[1.21]">
          <span className="text-base font-medium">₹ </span>
          <span className="-ml-1 -tracking-[2px]">
            {(product.unit_amount / 100).toLocaleString("en-US", {
              currency: "INR",
            })}
          </span>
          <span className="text-sm font-normal text-body-color dark:text-dark-6 whitespace-nowrap">
            {" "}
            Per Month
          </span>
        </h2>

        <div className="mb-8.75 grow">
          <h3 className="mb-4 text-base font-medium text-dark dark:text-white">
            Features
          </h3>
          <div className="mb-8">
            {product?.offers.map((offer, i) => {
              const offerText = typeof offer === "string" ? offer : offer.text;
              const available = typeof offer === "string" ? true : (offer.available ?? true);
              return <OfferList key={i} text={offerText} available={available} />;
            })}
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={buttonConfig.showSignIn ? handleSignIn : handleSubscription}
            disabled={buttonConfig.disabled}
            className={`inline-block w-full rounded-md px-7 py-3 text-center text-base font-medium transition duration-300 cursor-pointer ${
              buttonConfig.disabled
                ? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {buttonConfig.text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;
