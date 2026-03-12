import Link from "next/link";
import type { ChangeEvent, FormEvent } from "react";
import { inquiryOptions } from "./contactContent";
import type { SubmitStatus } from "./useContactForm";

type ContactFormProps = {
  formData: { fullName: string; email: string; topic: string; message: string };
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  status: SubmitStatus;
  errorMessage: string | null;
  isPageVariant: boolean;
};

const inputClassName =
  "min-h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-slate-900 transition-all duration-300 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-primary/15 hover:border-gray-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/30 dark:focus:border-accent dark:focus:bg-white/[0.06] dark:focus:ring-accent/15 dark:hover:border-white/20";

const ContactForm = ({
  errorMessage,
  formData,
  handleChange,
  handleSubmit,
  isPageVariant,
  status,
}: ContactFormProps) => (
  <div className="wow fadeInUp h-full flex flex-col rounded-[2rem] border border-gray-200 bg-white px-6 py-8 shadow-xl dark:border-white/10 dark:bg-[#111111] dark:shadow-2xl sm:px-8 sm:py-10 lg:px-8 lg:py-10">
    <h3 className="mb-3 text-2xl font-semibold text-slate-900 dark:text-white md:text-[28px] md:leading-[1.42]">
      {isPageVariant ? "Contact SignalizeAI" : "Send a message"}
    </h3>
    <p className="mb-8 text-sm leading-7 text-slate-600 dark:text-white/60">
      {isPageVariant
        ? "Tell us what you were trying to do and what happened. We'll get back to you as soon as possible."
        : "We usually reply fastest when the request includes the browser, URL type, and the exact issue or workflow you are asking about."}
    </p>
    <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
      {[
        ["fullName", "Your name", "Your name", "text", "name"],
        ["email", "Email", "you@company.com", "email", "email"],
      ].map(([name, label, placeholder, type, autoComplete]) => (
        <div key={name} className="mb-[22px]">
          <label htmlFor={name} className="mb-3 block text-sm font-medium text-slate-700 dark:text-white/70">
            {label}
          </label>
          <input
            suppressHydrationWarning={name === "email"}
            type={type}
            id={name}
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required
            className={inputClassName}
          />
        </div>
      ))}
      <div className="mb-[22px]">
        <label htmlFor="topic" className="mb-3 block text-sm font-medium text-slate-700 dark:text-white/70">
          What do you need help with?
        </label>
        <select id="topic" name="topic" value={formData.topic} onChange={handleChange} className={inputClassName}>
          {inquiryOptions.map((option) => (
            <option key={option} value={option} className="text-slate-900">
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-[30px]">
        <label htmlFor="message" className="mb-3 block text-sm font-medium text-slate-700 dark:text-white/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          autoComplete="on"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder={"What were you trying to do?\nWhat happened instead?\nWhat help do you need?"}
          required
          className={`${inputClassName} min-h-[140px] resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full transform-gpu items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-base font-semibold text-white transition duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none dark:text-black"
      >
        {status === "loading" ? "Sending..." : "Send Message ->"}
      </button>
      <div className="mt-auto pt-6 text-center">
        <p className="text-sm text-slate-600 dark:text-white/60">No spam. We only use your email to reply.</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/60">
          Prefer email?{" "}
          <a href="mailto:support@signalizeai.org" className="font-semibold text-primary hover:underline dark:text-accent">
            support@signalizeai.org
          </a>
        </p>
        <p className="text-sm text-slate-600 dark:text-white/60">We usually respond within 24 hours.</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/60">
          Looking for quick answers?{" "}
          <Link href="/docs" className="font-semibold text-primary hover:underline dark:text-accent">
            Read the docs -&gt;
          </Link>
        </p>
      </div>
      {status === "success" && (
        <p className="mt-4 text-center text-sm text-primary dark:text-accent" role="status" aria-live="polite">
          Thanks! We received your message and will get back to you.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="mt-4 text-center text-sm text-red-500" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  </div>
);

export default ContactForm;
