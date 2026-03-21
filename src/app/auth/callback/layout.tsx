import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Auth Callback",
  description: "Completing authentication for your SignalizeAI session.",
};

export default function AuthCallbackLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
