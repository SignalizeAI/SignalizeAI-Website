"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";
import { Price } from "@/types/price";
import { supabase } from "@/utils/supabaseClient";

type PricingProps = {
  mode?: "teaser" | "full";
};

const teaserPlanOrder = ["Free", "Pro", "Team"];

const teaserDescriptions: Record<string, string> = {
  free: "Start with quick website checks and a small saved-analysis limit.",
  pro: "Move into batch analysis, larger saved capacity, and export-ready workflow.",
  team: "Run higher-volume research with broader limits for multi-user workflows.",
};

const teaserMeta: Record<
  string,
  {
    eyebrow: string;
    summary: string;
    badge?: string;
    eyebrowClassName: string;
    badgeClassName: string;
    cardClassName: string;
    surfaceClassName: string;
    iconClassName: string;
    textClassName: string;
    mutedTextClassName: string;
    borderClassName: string;
  }
> = {
  free: {
    eyebrow: "Starter",
    summary: "Single-site checks",
    badge: "Free",
    eyebrowClassName: "text-primary dark:text-accent",
    badgeClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    cardClassName:
      "border-gray-200 bg-white dark:border-white/10 dark:bg-[#0a0a0a]",
    surfaceClassName: "bg-gray-50 dark:bg-white/5",
    iconClassName:
      "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    textClassName: "text-slate-900 dark:text-white",
    mutedTextClassName: "text-slate-600 dark:text-white/65",
    borderClassName: "border-gray-200 dark:border-white/10",
  },
  pro: {
    eyebrow: "Best for reps",
    summary: "Batch + saved workflow",
    badge: "Popular",
    eyebrowClassName: "text-primary dark:text-accent",
    badgeClassName: "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    cardClassName:
      "border-gray-200 bg-[#f8fbff] shadow-[0_28px_70px_-42px_rgba(26,35,126,0.18)] dark:border-white/10 dark:bg-[#08111a]",
    surfaceClassName: "bg-white/80 dark:bg-white/[0.03]",
    iconClassName:
      "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent",
    textClassName: "text-slate-900 dark:text-white",
    mutedTextClassName: "text-slate-600 dark:text-white/70",
    borderClassName: "border-gray-200 dark:border-white/10",
  },
  team: {
    eyebrow: "For teams",
    summary: "Higher-volume research",
    badge: "Scale",
    eyebrowClassName: "text-cyan-300 dark:text-accent",
    badgeClassName: "bg-white/10 text-white dark:bg-accent/15 dark:text-accent",
    cardClassName:
      "border-slate-900/20 bg-slate-950 shadow-[0_32px_80px_-42px_rgba(15,23,42,0.7)] dark:border-accent/25 dark:bg-[#030712]",
    surfaceClassName: "bg-white/5",
    iconClassName: "bg-white/10 text-white dark:bg-accent/15 dark:text-accent",
    textClassName: "text-white",
    mutedTextClassName: "text-white/72",
    borderClassName: "border-white/10 dark:border-white/10",
  },
};

const teaserOfferMap: Record<string, string[]> = {
  free: ["AI analysis 5/day", "Save up to 3 analyses"],
  pro: [
    "AI analysis 50/day",
    "Batch analysis up to 10 URLs/run",
    "Save up to 200 analyses",
  ],
  team: [
    "AI analysis 500/day",
    "Batch analysis up to 50 URLs/run",
    "Save up to 5000 analyses",
  ],
};

const pricingHighlights = [
  "Full plan-by-plan comparison",
  "Billing and subscription actions",
  "Exact limits for batch, saves, and export",
  "Dedicated page without homepage clutter",
];

const Pricing = ({ mode = "full" }: PricingProps) => {
  const [hoveredOffer, setHoveredOffer] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string>("free");
  const isTeaser = mode === "teaser";
  const teaserPlans = teaserPlanOrder
    .map((nickname) => pricingData.find((product) => product.nickname === nickname))
    .filter((product): product is Price => Boolean(product));

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
      className="relative z-20 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-16 pb-16 dark:from-[#000000] dark:via-[#02060b] dark:to-[#000000] lg:pt-28 lg:pb-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-24 h-64 bg-gradient-to-r from-primary/6 via-transparent to-accent/8 blur-3xl dark:from-primary/10 dark:to-accent/12" />
      <div className="container">
        <div className="mb-15">
          <SectionTitle
            subtitle="Pricing"
            title={
              isTeaser
                ? "Simple plans that scale with your research volume"
                : "Plans for every sales team"
            }
            paragraph={
              isTeaser
                ? "Start with quick website checks for free, then move into batch analysis, saved research, and export as your workflow gets heavier."
                : "Choose based on analysis volume, batch capacity, saved-analysis limits, and whether your team needs search, filtering, and export."
            }
            center
          />
        </div>

        {isTeaser ? (
          <div className="relative overflow-hidden rounded-[2.8rem] border border-slate-200/80 bg-white/75 px-4 py-6 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.22)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_35px_90px_-50px_rgba(0,0,0,0.75)] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.1),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_28%)]" />
            <div className="relative">
              <div className="-mx-4 flex flex-wrap justify-center">
                {teaserPlans.map((product, i) => {
                  const planName = product.nickname?.toLowerCase() || "free";
                  const meta = teaserMeta[planName];
                  const priceDisplay =
                    planName === "free"
                      ? "Free"
                      : `From ₹${(product.unit_amount / 100).toLocaleString("en-IN")}/mo`;

                  return (
                    <div key={i} className="w-full px-4 md:w-1/2 lg:w-1/3">
                      <div
                        className={`relative mb-8 h-full overflow-hidden rounded-[2rem] border p-8 shadow-lg transition duration-300 hover:-translate-y-1 ${meta.cardClassName}`}
                      >
                        {planName === "team" && (
                          <>
                            <div className="absolute left-0 top-0 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
                            <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-accent/20 blur-3xl" />
                          </>
                        )}
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <span className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${meta.eyebrowClassName}`}>
                              {meta.eyebrow}
                            </span>
                            <p className={`mt-2 text-sm font-semibold ${meta.mutedTextClassName}`}>
                              {meta.summary}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${meta.badgeClassName}`}
                          >
                            {meta.badge}
                          </span>
                        </div>
                        <h3 className={`mt-6 text-3xl font-black tracking-tight ${meta.textClassName}`}>
                          {priceDisplay}
                        </h3>
                        <p className={`mt-4 text-sm leading-7 ${meta.mutedTextClassName}`}>
                          {teaserDescriptions[planName]}
                        </p>

                        <div
                          className={`mt-6 rounded-[1.5rem] border p-5 ${meta.surfaceClassName} ${meta.borderClassName}`}
                        >
                          <div className="grid gap-3">
                            {teaserOfferMap[planName].map((offerText, offerIndex) => (
                              <div
                                key={offerIndex}
                                className={`flex items-start gap-3 text-sm leading-7 ${meta.mutedTextClassName}`}
                              >
                                <span className={`mt-1.5 flex h-5 w-5 items-center justify-center rounded-full ${meta.iconClassName}`}>
                                  <svg
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2.5}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </span>
                                <p>{offerText}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mx-auto mt-4 max-w-5xl overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a0a0a]">
                <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="relative overflow-hidden px-8 py-8 sm:px-10 sm:py-10">
                    <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />
                    <div className="relative">
                      <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                        Full comparison
                      </span>
                      <h3 className="mt-5 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Need the exact plan details before you choose?
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-white/65">
                        Open the dedicated pricing page for the full comparison,
                        billing flow, and plan-specific detail without crowding
                        the homepage.
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {pricingHighlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                          >
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 bg-slate-950 px-8 py-8 text-white dark:border-white/10 dark:bg-white dark:text-slate-950 lg:border-l lg:border-t-0 sm:px-10 sm:py-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60 dark:text-slate-500">
                      Next step
                    </p>
                    <h4 className="mt-4 text-2xl font-black tracking-tight">
                      Open pricing and choose with confidence
                    </h4>
                    <p className="mt-5 text-sm leading-7 text-white/70 dark:text-slate-600">
                      Use the pricing page when you want the full plan breakdown,
                      exact limits, and subscription flow in one place.
                    </p>
                    <Link
                      href="/pricing"
                      className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-slate-200 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
                    >
                      View all plans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
