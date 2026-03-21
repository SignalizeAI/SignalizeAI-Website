import { Metadata } from "next";
import AuthEntryClient from "../AuthEntryClient";

export const runtime = "edge";

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
  const authStateParam = params?.auth_state;
  const isPopup = popup === "1" || popup === "true";
  const authState = typeof authStateParam === "string" ? authStateParam : undefined;

  return <AuthEntryClient mode="signin" isPopup={isPopup} authState={authState} />;
}
