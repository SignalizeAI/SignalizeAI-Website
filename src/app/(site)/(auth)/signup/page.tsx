import { Metadata } from "next";
import AuthEntryClient from "../AuthEntryClient";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your SignalizeAI account.",
};

export default function SignUpPage() {
  return <AuthEntryClient mode="signup" />;
}
