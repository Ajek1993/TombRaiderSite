"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTheme, Theme, ThemeConfig, THEMES, THEME_KEYS } from "@/hooks/useTheme";

interface ThemeContextType {
  theme: Theme;
  themeConfig: ThemeConfig;
  changeTheme: (theme: Theme) => void;
  cycleTheme: () => void;
  mounted: boolean;
  themes: typeof THEMES;
  themeKeys: typeof THEME_KEYS;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider
      value={{
        ...themeState,
        themes: THEMES,
        themeKeys: THEME_KEYS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
