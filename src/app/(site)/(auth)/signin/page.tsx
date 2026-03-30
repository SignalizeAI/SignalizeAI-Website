import { Metadata } from "next";
import AuthEntryClient from "../AuthEntryClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your SignalizeAI account.",
};

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#000000]" />}>
      <AuthEntryClient mode="signin" />
    </Suspense>
  );
}
