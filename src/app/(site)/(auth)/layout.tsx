import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  description: "Manage your SignalizeAI account access and recovery.",
};

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}
