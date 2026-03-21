import { Metadata } from "next";
import AuthEntryClient from "../AuthEntryClient";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your SignalizeAI account.",
};

type SignInPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const popup = params?.popup;
  const isPopup = popup === "1" || popup === "true";

  return <AuthEntryClient mode="signin" isPopup={isPopup} />;
}
