"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ContentTheme = "light" | "dark";

const STORAGE_KEY = "bol-news-theme";

type ContentThemeContextValue = {
  theme: ContentTheme;
  setTheme: (theme: ContentTheme) => void;
  mounted: boolean;
};

const ContentThemeContext = createContext<ContentThemeContextValue | null>(null);

export function ContentThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<ContentTheme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  const setTheme = useCallback((next: ContentTheme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, mounted }),
    [theme, setTheme, mounted],
  );

  return (
    <ContentThemeContext.Provider value={value}>
      {children}
    </ContentThemeContext.Provider>
  );
}

export function useContentTheme() {
  const context = useContext(ContentThemeContext);
  if (!context) {
    throw new Error("useContentTheme must be used within ContentThemeProvider");
  }
  return context;
}
