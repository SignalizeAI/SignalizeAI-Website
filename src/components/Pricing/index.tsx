"use client";

import { useState } from "react";
import type { Price } from "@/types/price";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import PricingTeaser from "./PricingTeaser";
import useUserPlan from "./useUserPlan";
import { pricingData } from "@/stripe/pricingData";

type PricingProps = {
  mode?: "teaser" | "full";
};

const Pricing = ({ mode = "full" }: PricingProps) => {
  const [hoveredOffer, setHoveredOffer] = useState<string | null>(null);
  const isTeaser = mode === "teaser";
  const userPlan = useUserPlan(!isTeaser);
  const orderedPricingData = ["Free", "Pro", "Team"]
    .map((plan) => pricingData.find((product) => product.nickname === plan))
    .filter((product): product is Price => Boolean(product));

  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pb-16 pt-16 dark:from-[#000000] dark:via-[#02060b] dark:to-[#000000] lg:pb-28 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-24 h-64 bg-gradient-to-r from-primary/6 via-transparent to-accent/8 blur-3xl dark:from-primary/10 dark:to-accent/12" />
      <div className="container">
        <div className="mb-15">
          <SectionTitle
            subtitle="Pricing"
            title={isTeaser ? "Simple plans that scale with your research volume" : "Plans for every sales team"}
            paragraph={
              isTeaser
                ? "Start with quick website checks for free, then move into batch analysis, saved research, and export as your workflow gets heavier."
                : "Choose based on analysis volume, batch capacity, saved-analysis limits, and whether your team needs search, filtering, and export."
            }
            center
          />
        </div>

        {isTeaser ? (
          <PricingTeaser />
        ) : (
          <div className="-mx-4 flex flex-wrap justify-center">
            {orderedPricingData.map((product, index) => (
              <PricingBox
                key={index}
                product={product}
                currentPlan={userPlan}
                isHighlighted={hoveredOffer === product.nickname || (hoveredOffer === null && product.nickname === "Pro")}
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
