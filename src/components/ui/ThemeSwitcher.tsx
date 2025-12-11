"use client";

import { useThemeContext } from "@/context/ThemeContext";

interface ThemeSwitcherProps {
  variant?: "desktop" | "mobile";
}

export function ThemeSwitcher({ variant = "desktop" }: ThemeSwitcherProps) {
  const { theme, themeConfig, cycleTheme, changeTheme, themes, themeKeys, mounted } =
    useThemeContext();

  // Prevent hydration mismatch
  if (!mounted) {
    return variant === "desktop" ? (
      <button className="theme-btn" aria-label="Change Theme" title="Change Theme">
        <span className="theme-icon">🎨</span>
        <span className="theme-label">Original</span>
      </button>
    ) : null;
  }

  if (variant === "mobile") {
    return (
      <div className="mobile-theme-section">
        <h3>Motyw Strony</h3>
        {themeKeys.map((themeKey) => {
          const config = themes[themeKey];
          return (
            <button
              key={themeKey}
              className={`theme-btn-mobile ${theme === themeKey ? "active" : ""}`}
              data-theme={themeKey}
              onClick={() => changeTheme(themeKey)}
            >
              <span>{config.icon}</span> {config.name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <button
      className="theme-btn"
      aria-label="Change Theme"
      title={`Current theme: ${themeConfig.name}`}
      onClick={cycleTheme}
    >
      <span className="theme-icon">{themeConfig.icon}</span>
      <span className="theme-label">{themeConfig.label}</span>
    </button>
  );
}
