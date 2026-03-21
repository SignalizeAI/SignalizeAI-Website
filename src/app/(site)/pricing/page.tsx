import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Compare SignalizeAI plans for prospect volume, batch prospecting, saved prospects, search, filtering, and export.",
};

const PricingPage = () => {
  return (
    <main>
      <Pricing />
    </main>
  );
};

export default PricingPage;
