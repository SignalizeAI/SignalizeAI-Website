"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";

const Pricing = () => {
  const [hoveredOffer, setHoveredOffer] = useState<string | null>(null);

  return (
    <section
      id="pricing"
      className="dark:bg-dark relative z-20 overflow-hidden bg-white pt-12 pb-12 lg:pt-24 lg:pb-24"
    >
      <div className="container">
        <div className="mb-15">
          <SectionTitle
            // subtitle="Pricing"
            title="Plans for every sales team"
            paragraph="Start fast with SignalizeAI. Sign in securely with Google to save and export your insights backed by enterprise-grade infrastructure."
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {pricingData.map((product, i) => (
            <PricingBox
              key={i}
              product={product}
              isHighlighted={
                hoveredOffer === product.nickname ||
                (hoveredOffer === null && product.nickname === "Team")
              }
              onMouseEnter={() => setHoveredOffer(product.nickname)}
              onMouseLeave={() => setHoveredOffer(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
