"use client";

import { useExtensionStatus } from "@/app/providers";

/**
 * Backward compatibility hook.
 * Shared via ExtensionStatusProvider in providers.tsx to prevent duplication.
 */
export function useExtensionInstallState() {
  const { installed, browser } = useExtensionStatus();
  return { installed, browser };
}
