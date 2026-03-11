"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { completeAuthCallback } from "./authUtils";

const statusCopy = {
  loading: {
    title: "Authenticating...",
    description: "Please wait while we secure your session.",
  },
  success: {
    title: "Signed In Successfully",
    description: "This window will close automatically.",
  },
  error: {
    title: "Authentication Failed",
    description: "We couldn't verify your credentials. Please try again.",
  },
} as const;

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<keyof typeof statusCopy>("loading");

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await completeAuthCallback();
        setStatus("success");
        setTimeout(() => {
          if (window.opener) window.close();
          else window.location.href = "/pricing";
        }, 600);
      } catch (error) {
        console.error("Auth error:", error);
        setStatus("error");
      }
    };

    void handleAuth();
  }, []);

  return (
    <div className="bg-dark relative flex min-h-screen flex-col items-center justify-center overflow-hidden font-sans text-white">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center space-y-6 p-8 text-center">
        <div className="relative flex items-center justify-center">
          {status === "loading" && (
            <div className="border-primary border-t-accent h-16 w-16 animate-spin rounded-full border-4" />
          )}
          {status === "success" && (
            <div className="animate-in zoom-in border-accent flex h-16 w-16 items-center justify-center rounded-full border-2 bg-primary/30 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-accent h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === "error" && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-red-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-wide">
            {status === "success" ? <span className="text-accent">{statusCopy[status].title}</span> : statusCopy[status].title}
          </h2>
          <p className="text-sm text-gray-400">{statusCopy[status].description}</p>
        </div>
      </div>
    </div>
  );
}
