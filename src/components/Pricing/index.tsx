"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";
import { supabase } from "@/utils/supabaseClient";

type PricingProps = {
  mode?: "teaser" | "full";
};

const Pricing = ({ mode = "full" }: PricingProps) => {
  const [hoveredOffer, setHoveredOffer] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string>("free");
  const isTeaser = mode === "teaser";

  useEffect(() => {
    if (isTeaser) {
      return;
    }
    checkUserPlan();
  }, [isTeaser]);

  const checkUserPlan = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setUserPlan("free");
        return;
      }

      const userEmail = session.user.email;

      const response = await fetch(`https://api.signalizeai.org/quota`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserPlan(data.plan || "free");
      } else {
        setUserPlan("free");
      }
    } catch (error) {
      console.error("Error checking user plan:", error);
      setUserPlan("free");
    }
  };

  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-gray-50 dark:bg-[#000000] pt-16 pb-16 lg:pt-28 lg:pb-28"
    >
      <div className="container">
        <div className="mb-15">
          <SectionTitle
            subtitle="Pricing"
            title={
              isTeaser
                ? "See the plan structure, then open the full pricing page"
                : "Plans for every sales team"
            }
            paragraph={
              isTeaser
                ? "The homepage should show the shape of the offering, not the entire buying flow. Use the pricing page for full limits, feature comparison, and plan selection."
                : "Choose based on analysis volume, batch capacity, saved-analysis limits, and whether your team needs search, filtering, and export."
            }
            center
          />
        </div>

        {isTeaser ? (
          <>
            <div className="-mx-4 flex flex-wrap justify-center">
              {pricingData.map((product, i) => {
                const planName = product.nickname?.toLowerCase() || "free";
                const priceDisplay =
                  planName === "free"
                    ? "Free"
                    : `From ₹${(product.unit_amount / 100).toLocaleString("en-IN")}/mo`;

                return (
                  <div key={i} className="w-full px-4 md:w-1/2 lg:w-1/3">
                    <div className="mb-8 h-full rounded-[2rem] border border-gray-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[#0a0a0a]">
                      <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">
                        {product.nickname}
                      </span>
                      <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        {priceDisplay}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/65">
                        {planName === "free"
                          ? "For trying quick website checks and getting a feel for the workflow."
                          : planName === "pro"
                            ? "For users who need batch analysis, saved work, and a more serious outbound workflow."
                            : "For higher-volume teams that need more room, more organization, and broader operational use."}
                      </p>

                      <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 dark:border-white/10">
                        {product.offers.slice(0, 3).map((offer, offerIndex) => {
                          const offerText =
                            typeof offer === "string" ? offer : offer.text;

                          return (
                            <p
                              key={offerIndex}
                              className="text-sm leading-7 text-slate-700 dark:text-white/70"
                            >
                              {offerText}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mx-auto mt-4 max-w-3xl rounded-[2rem] border border-gray-200 bg-white px-8 py-8 text-center shadow-lg dark:border-white/10 dark:bg-[#0a0a0a]">
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Open pricing for the real comparison
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/65">
                Full limits, plan details, and subscription actions belong on
                the dedicated pricing page, not in the middle of the homepage.
              </p>
              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Open pricing page
              </Link>
            </div>
          </>
        ) : (
          <div className="-mx-4 flex flex-wrap justify-center">
            {pricingData.map((product, i) => (
              <PricingBox
                key={i}
                product={product}
                currentPlan={userPlan}
                isHighlighted={
                  hoveredOffer === product.nickname ||
                  (hoveredOffer === null && product.nickname === "Team")
                }
                onMouseEnter={() => setHoveredOffer(product.nickname)}
                onMouseLeave={() => setHoveredOffer(null)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
