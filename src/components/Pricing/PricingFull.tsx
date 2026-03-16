"use client";

import { useState } from "react";
import type { Price } from "@/types/price";
import { pricingData } from "@/stripe/pricingData";
import PricingBox from "./PricingBox";
import useUserPlan from "./useUserPlan";

const orderedPricingData = ["Free", "Pro", "Team"]
  .map((plan) => pricingData.find((product) => product.nickname === plan))
  .filter((product): product is Price => Boolean(product));

const PricingFull = () => {
  const [hoveredOffer, setHoveredOffer] = useState<string | null>(null);
  const userPlan = useUserPlan(true);

  return (
    <div className="-mx-4 flex flex-wrap justify-center">
      {orderedPricingData.map((product) => (
        <PricingBox
          key={product.id}
          product={product}
          currentPlan={userPlan}
          isHighlighted={hoveredOffer === product.nickname || (hoveredOffer === null && product.nickname === "Pro")}
          onMouseEnter={() => setHoveredOffer(product.nickname)}
          onMouseLeave={() => setHoveredOffer(null)}
        />
      ))}
    </div>
  );
};

export default PricingFull;
