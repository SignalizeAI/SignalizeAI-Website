import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pricing Page | SignalizeAI",
  description: "This is pricing page description",
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb pageName="Subscription" />
      <Pricing />
    </>
  );
};

export default PricingPage;
