"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabaseClient";

interface PaymentData {
  amount: number;
  date: string;
  orderId: string;
  plan: string;
  email: string;
}

const PaymentSuccessPage = () => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Notify extension/opener about payment success
    if (window.opener) {
      window.opener.postMessage({ type: "PAYMENT_SUCCESS" }, "*");
    }

    if (typeof (window as any).chrome !== "undefined" && (window as any).chrome.runtime) {
      try {
        (window as any).chrome.runtime.sendMessage({ type: "PAYMENT_SUCCESS" }, () => {
          void (window as any).chrome.runtime.lastError;
        });
      } catch (e) {
        // Extension context not available
      }
    }

    // Fetch payment details
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setError("Not authenticated. Please sign in.");
        setLoading(false);
        return;
      }

      const userEmail = session.user.email;
      
      // Fetch user's plan from backend
      const response = await fetch(`https://api.signalizeai.org/quota`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch payment details");
      }

      const data = await response.json();
      
      // Map plan to pricing
      const planPricing: Record<string, number> = {
        pro: 999,
        team: 3999,
      };

      const plan = data.plan || "pro";
      const amount = planPricing[plan.toLowerCase()] || 999;
      
      // Use order_id from API response or fallback to URL params
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = data.order_id || urlParams.get("order_id") || urlParams.get("checkout_id") || "Processing...";
      
      // Format the date from updated_at or use current date
      let formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      
      if (data.updated_at) {
        formattedDate = new Date(data.updated_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }

      setPaymentData({
        amount: amount / 100,
        date: formattedDate,
        orderId: orderId,
        plan: plan.charAt(0).toUpperCase() + plan.slice(1),
        email: userEmail || "",
      });

    } catch (err) {
      console.error("Error fetching payment details:", err);
      setError("Unable to load payment details. Your purchase was successful.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-black font-sans">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-black font-sans">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="relative z-10 w-full max-w-md px-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/60 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/60 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
              <svg className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Payment Verification</h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{error}</p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-black font-sans">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/60 p-0 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/60">
          
          <div className="relative p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Payment Successful
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome to SignalizeAI {paymentData?.plan}. Your account has been upgraded.
            </p>
          </div>

          <div className="bg-gray-50/50 px-8 py-6 dark:bg-white/5 border-t border-b border-gray-200 dark:border-white/10">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Plan</span>
                <span className="font-semibold text-gray-900 dark:text-white">{paymentData?.plan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Amount Paid</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${paymentData?.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Date</span>
                <span className="font-medium text-gray-900 dark:text-white">{paymentData?.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Order ID</span>
                <span className="font-mono text-xs text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded truncate max-w-[200px]">
                  {paymentData?.orderId}
                </span>
              </div>
              {paymentData?.email && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Email</span>
                  <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                    {paymentData?.email}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-8">
            <button
              onClick={() => window.close()}
              className="group relative flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Continue
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          Need help? <a href="mailto:support@signalizeai.com" className="hover:text-primary underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
