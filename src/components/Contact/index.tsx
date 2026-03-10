"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { validateEmail } from "@/utils/validateEmail";

const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

const supportTopics = [
  {
    title: "Product support",
    body: "Questions about setup, quick website checks, batch analysis, or saved analyses.",
  },
  {
    title: "Privacy and permissions",
    body: "Clarify what SignalizeAI reads, what it stores, and how browser permissions are used.",
  },
  {
    title: "Teams and partnerships",
    body: "Reach out if your team needs higher-volume usage, rollout help, or partnership discussion.",
  },
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

const Contact = ({ variant = "home" }: { variant?: "home" | "page" }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const apiBaseUrl = (
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.signalizeai.org"
  ).replace(/\/$/, "");
  const contactUrl = `${apiBaseUrl}/api/contact`;
  const isPageVariant = variant === "page";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!fullName || !email || !message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(contactUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone: phone.length ? phone : null,
          message,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to send your message.");
      }

      setStatus("success");
      setFormData(initialFormState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message.",
      );
    }
  };

  return (
    <section
      id="contact"
      className={`relative ${isPageVariant ? "py-0" : "py-16 md:py-20 lg:py-[120px]"} bg-gray-50 dark:bg-[#000000]`}
    >
      {!isPageVariant && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-gray-50 dark:from-[#000000] dark:to-[#0a0a0a] z-0 pointer-events-none"></div>
      )}

      <div className="container relative z-10 px-4">
        {!isPageVariant && (
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-[#0a0a0a] sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                  Contact
                </span>
                <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Need help? Open the real contact page.
                </h2>
                <p className="mt-5 max-w-[560px] text-base leading-8 text-slate-600 dark:text-white/65">
                  The homepage should not try to be a support desk. Use the
                  dedicated contact page for the form, support lanes, and
                  product-specific questions.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    Open contact page
                  </Link>
                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                  >
                    Check docs first
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                {supportTopics.map((topic) => (
                  <div
                    key={topic.title}
                    className="rounded-[1.75rem] border border-gray-200 bg-gray-50/90 p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {topic.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">
                      {topic.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isPageVariant && (
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="ud-contact-content-wrapper">
              <div className="mb-12 flex flex-wrap justify-between lg:mb-0">
                <div className="mb-8 flex w-[330px] max-w-full">
                  <div className="mr-6 text-[32px] text-primary dark:text-accent">
                    <svg
                      width="29"
                      height="35"
                      viewBox="0 0 29 35"
                      className="fill-current"
                    >
                      <path d="M14.5 0.710938C6.89844 0.710938 0.664062 6.72656 0.664062 14.0547C0.664062 19.9062 9.03125 29.5859 12.6406 33.5234C13.1328 34.0703 13.7891 34.3437 14.5 34.3437C15.2109 34.3437 15.8672 34.0703 16.3594 33.5234C19.9688 29.6406 28.3359 19.9062 28.3359 14.0547C28.3359 6.67188 22.1016 0.710938 14.5 0.710938ZM14.9375 32.2109C14.6641 32.4844 14.2812 32.4844 14.0625 32.2109C11.3828 29.3125 2.57812 19.3594 2.57812 14.0547C2.57812 7.71094 7.9375 2.625 14.5 2.625C21.0625 2.625 26.4219 7.76562 26.4219 14.0547C26.4219 19.3594 17.6172 29.2578 14.9375 32.2109Z" />
                      <path d="M14.5 8.58594C11.2734 8.58594 8.59375 11.2109 8.59375 14.4922C8.59375 17.7188 11.2187 20.3984 14.5 20.3984C17.7812 20.3984 20.4062 17.7734 20.4062 14.4922C20.4062 11.2109 17.7266 8.58594 14.5 8.58594ZM14.5 18.4297C12.3125 18.4297 10.5078 16.625 10.5078 14.4375C10.5078 12.25 12.3125 10.4453 14.5 10.4453C16.6875 10.4453 18.4922 12.25 18.4922 14.4375C18.4922 16.625 16.6875 18.4297 14.5 18.4297Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-[14px] text-xl font-semibold text-slate-900 dark:text-white">
                      Team setup
                    </h3>
                    <p className="text-base text-slate-600 dark:text-white/60">
                      Remote-first with a distributed team
                    </p>
                  </div>
                </div>
                <div className="mb-8 flex w-[330px] max-w-full">
                  <div className="mr-6 text-[32px] text-primary dark:text-accent">
                    <svg
                      width="34"
                      height="25"
                      viewBox="0 0 34 25"
                      className="fill-current"
                    >
                      <path d="M30.5156 0.960938H3.17188C1.42188 0.960938 0 2.38281 0 4.13281V20.9219C0 22.6719 1.42188 24.0938 3.17188 24.0938H30.5156C32.2656 24.0938 33.6875 22.6719 33.6875 20.9219V4.13281C33.6875 2.38281 32.2656 0.960938 30.5156 0.960938ZM30.5156 2.875C30.7891 2.875 31.0078 2.92969 31.2266 3.09375L17.6094 11.3516C17.1172 11.625 16.5703 11.625 16.0781 11.3516L2.46094 3.09375C2.67969 2.98438 2.89844 2.875 3.17188 2.875H30.5156ZM30.5156 22.125H3.17188C2.51562 22.125 1.91406 21.5781 1.91406 20.8672V5.00781L15.0391 12.9922C15.5859 13.3203 16.1875 13.4844 16.7891 13.4844C17.3906 13.4844 17.9922 13.3203 18.5391 12.9922L31.6641 5.00781V20.8672C31.7734 21.5781 31.1719 22.125 30.5156 22.125Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-[14px] text-xl font-semibold text-slate-900 dark:text-white">
                      Direct email
                    </h3>
                    <p className="text-base text-primary dark:text-accent">
                      <a
                        href="mailto:support@signalizeai.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition-all"
                      >
                        support@signalizeai.org
                      </a>
                    </p>

                    <p className="mt-2 text-base text-primary dark:text-accent">
                      <a
                        href="mailto:privacy@signalizeai.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition-all"
                      >
                        privacy@signalizeai.org
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div
              className="wow fadeInUp rounded-[2rem] bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 px-6 py-8 shadow-xl dark:shadow-2xl sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]"
              data-wow-delay=".2s"
            >
              <h3 className="mb-3 text-2xl font-semibold text-slate-900 dark:text-white md:text-[28px] md:leading-[1.42]">
                {isPageVariant ? "Contact the team" : "Send a message"}
              </h3>
              <p className="mb-8 text-sm leading-7 text-slate-600 dark:text-white/60">
                {isPageVariant
                  ? "Include your browser, the kind of page you were analyzing, and what you expected to happen."
                  : "We usually reply fastest when the request includes the browser, URL type, and the exact issue or workflow you are asking about."}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <label
                    htmlFor="fullName"
                    className="mb-4 block text-sm font-medium text-slate-700 dark:text-white/70"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Adam Gelius"
                    autoComplete="name"
                    required
                    className="w-full border-0 border-b border-gray-300 dark:border-white/20 bg-transparent pb-3 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:border-primary dark:focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="email"
                    className="mb-4 block text-sm font-medium text-slate-700 dark:text-white/70"
                  >
                    Email*
                  </label>
                  <input
                    suppressHydrationWarning
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@yourmail.com"
                    autoComplete="email"
                    required
                    className="w-full border-0 border-b border-gray-300 dark:border-white/20 bg-transparent pb-3 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:border-primary dark:focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="phone"
                    className="mb-4 block text-sm font-medium text-slate-700 dark:text-white/70"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+885 1254 5211 552"
                    autoComplete="tel"
                    className="w-full border-0 border-b border-gray-300 dark:border-white/20 bg-transparent pb-3 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:border-primary dark:focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div className="mb-[30px]">
                  <label
                    htmlFor="message"
                    className="mb-4 block text-sm font-medium text-slate-700 dark:text-white/70"
                  >
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    autoComplete="on"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="type your message here"
                    required
                    className="w-full resize-none border-0 border-b border-gray-300 dark:border-white/20 bg-transparent pb-3 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:border-primary dark:focus:border-accent focus:outline-none transition-colors"
                  ></textarea>
                </div>
                <div className="mb-0">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-10 py-3.5 text-base font-semibold text-white dark:text-black transition duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </div>
                {status === "success" && (
                  <p
                    className="mt-4 text-sm text-primary dark:text-accent text-center"
                    role="status"
                    aria-live="polite"
                  >
                    Thanks! We received your message and will get back to you.
                  </p>
                )}
                {status === "error" && errorMessage && (
                  <p className="mt-4 text-sm text-red-500 text-center" role="alert">
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
