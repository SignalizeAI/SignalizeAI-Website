"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { validateEmail } from "@/utils/validateEmail";
import { initialFormState } from "./contactContent";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.signalizeai.org"
).replace(/\/$/, "");

const useContactForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const topic = formData.topic.trim();
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
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          topic,
          phone: null,
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
        error instanceof Error ? error.message : "Unable to send your message.",
      );
    }
  };

  return { errorMessage, formData, handleChange, handleSubmit, status };
};

export default useContactForm;
