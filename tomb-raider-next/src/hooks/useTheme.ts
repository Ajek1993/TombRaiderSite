"use client";

import { useState, useEffect, useCallback } from "react";

export type Theme = "original" | "pink-gamer" | "matrix" | "blue-cyber";

export interface ThemeConfig {
  name: string;
  icon: string;
  label: string;
}

export const THEMES: Record<Theme, ThemeConfig> = {
  original: {
    name: "Original",
    icon: "🏺",
    label: "Original",
  },
  "pink-gamer": {
    name: "Pink Gamer Girl",
    icon: "💖",
    label: "Pink Gamer",
  },
  matrix: {
    name: "Matrix Green",
    icon: "💚",
    label: "Matrix",
  },
  "blue-cyber": {
    name: "Blue Cyber",
    icon: "💙",
    label: "Blue Cyber",
  },
};

export const THEME_KEYS = Object.keys(THEMES) as Theme[];
const STORAGE_KEY = "tomb-raider-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("original");
  const [mounted, setMounted] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (savedTheme && THEMES[savedTheme]) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    // Dispatch custom event for other components
    const event = new CustomEvent("themeChanged", {
      detail: { theme: newTheme },
    });
    document.dispatchEvent(event);
  }, []);

  const cycleTheme = useCallback(() => {
    const currentIndex = THEME_KEYS.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEME_KEYS.length;
    const nextTheme = THEME_KEYS[nextIndex];
    changeTheme(nextTheme);
  }, [theme, changeTheme]);

  // Keyboard shortcut: Ctrl/Cmd + Shift + T
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "T") {
        e.preventDefault();
        cycleTheme();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cycleTheme]);

  return {
    theme,
    themeConfig: THEMES[theme],
    changeTheme,
    cycleTheme,
    mounted,
  };
}
