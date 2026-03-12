import type { Price } from "@/types/price";

export const formatMonthlyPrice = (product: Price, includeFrom = false) => {
  const planName = product.nickname?.toLowerCase() || "free";

  if (planName === "free") {
    return "$0/month";
  }

  const amount = product.unit_amount / 100;
  const prefix = includeFrom ? "From " : "";

  return `${prefix}$${amount.toLocaleString("en-US")}/month`;
};
