import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Payment Success",
  description: "Your SignalizeAI payment was successful and your plan is being activated.",
};

export default function PaymentSuccessLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
