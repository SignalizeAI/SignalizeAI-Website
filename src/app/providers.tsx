"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import ThemeSyncBridge from "@/components/ThemeSyncBridge";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="dark"
    >
      <ThemeSyncBridge />
      {children}
    </ThemeProvider>
  );
}
