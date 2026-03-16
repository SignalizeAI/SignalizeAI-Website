"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { fetchPaymentData, notifyPaymentSuccess, type PaymentData } from "./paymentUtils";

const PageShell = ({ children }: { children: ReactNode }) => (
  <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white font-sans dark:bg-[#000000]">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-600 opacity-20 blur-[100px] dark:bg-[#3b82f6]" />
    </div>
    {children}
  </main>
);

const PaymentSuccessPage = () => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPayment = async () => {
      notifyPaymentSuccess();
      try {
        setPaymentData(await fetchPaymentData());
      } catch (err) {
        console.error("Error fetching payment details:", err);
        setError(err instanceof Error ? err.message : "Unable to load payment details. Your purchase was successful.");
      } finally {
        setLoading(false);
      }
    };

    void loadPayment();
  }, []);

  if (loading) {
    return (
      <PageShell>
        <div className="relative z-10 flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-[#00e5ff]" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying payment...</p>
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <div className="relative z-10 w-full max-w-md px-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/60 p-8 text-center shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/60">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
              <svg className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Payment Verification</h3>
            <p className="mb-6 text-sm text-slate-500 dark:text-white/40">{error}</p>
            <Link href="/" className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:bg-white/90">
              Return to Home
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/60 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/60">
          <div className="relative p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Payment Successful</h3>
            <p className="text-sm text-slate-500 dark:text-white/40">Welcome to SignalizeAI {paymentData?.plan}. Your account has been upgraded.</p>
          </div>
          <div className="border-y border-gray-200 bg-gray-50/50 px-8 py-6 dark:border-white/10 dark:bg-white/5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500 dark:text-white/40">Plan</span><span className="font-semibold text-slate-900 dark:text-white">{paymentData?.plan}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 dark:text-white/40">Amount Paid</span><span className="font-semibold text-slate-900 dark:text-white">${paymentData?.amount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 dark:text-white/40">Date</span><span className="font-medium text-slate-900 dark:text-white">{paymentData?.date}</span></div>
              {paymentData?.email && <div className="flex justify-between"><span className="text-slate-500 dark:text-white/40">Email</span><span className="max-w-[200px] truncate font-medium text-slate-900 dark:text-white">{paymentData.email}</span></div>}
            </div>
          </div>
          <div className="p-8">
            <button onClick={() => window.close()} className="group relative flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-white dark:text-black dark:shadow-none dark:hover:bg-white/90">
              Continue
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-white/40">
          Need help? <a href="mailto:support@signalizeai.org" className="underline hover:text-blue-600 dark:hover:text-[#00e5ff]">Contact Support</a>
        </p>
      </div>
    </PageShell>
  );
};

export default PaymentSuccessPage;
