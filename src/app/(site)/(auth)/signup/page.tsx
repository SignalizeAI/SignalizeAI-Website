import { Metadata } from "next";
import AuthEntryClient from "../AuthEntryClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your SignalizeAI account.",
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#000000]" />}>
      <AuthEntryClient mode="signup" />
    </Suspense>
  );
}
