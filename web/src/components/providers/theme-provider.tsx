"use client";

import { ContentThemeProvider } from "@/components/providers/content-theme-provider";

/** App theme provider — content area only; chrome stays dark. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ContentThemeProvider>{children}</ContentThemeProvider>;
}
