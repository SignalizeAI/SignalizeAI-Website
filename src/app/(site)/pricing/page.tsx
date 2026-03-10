import Breadcrumb from "@/components/Common/Breadcrumb";
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
      <Breadcrumb
        pageName="Pricing"
        pageDescription="Choose the right plan for analysis volume, batch workflows, saved research, and export needs."
      />
      <Pricing />
    </>
  );
};

export default PricingPage;
