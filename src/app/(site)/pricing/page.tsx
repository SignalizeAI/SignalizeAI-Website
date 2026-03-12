import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | SignalizeAI",
  description:
    "Compare SignalizeAI plans for analysis volume, batch runs, saved analyses, search, filtering, and export.",
};

const PricingPage = () => {
  return (
    <>
      <Pricing />
    </>
  );
};

export default PricingPage;
