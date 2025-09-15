// src/theme.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/** ---------- THEME BUILDER (your original palette, unchanged) ---------- */
function buildTheme(isDark = false) {
  return {
    colors: {
      primary: isDark ? " #bbff5b" : "#8B5CF6",
      light: isDark ? "#2D1B69" : "#e0d8f4ff",
      bg: isDark ? "#0F172A" : "#ddd5e8ff",
      dark: isDark ? "#7C3AED" : "#ae97e2ff",
      accent1: " #bbff5b",
      secondary: isDark ? "#1F2937" : "#F3F4F6",
      accent: isDark ? "#374151" : "#E5E7EB",
      surface: isDark ? "#111827" : "#FFFFFF",
      background: isDark ? "#0F172A" : "#FAFBFC",
      custom: isDark ? "#7C3AED" : "#0F172A",
      black: isDark ? "#fff" : "#000",
      text: {
        primary: isDark ? "#F9FAFB" : "#1F2937",
        secondary: isDark ? "#D1D5DB" : "#6B7280",
        inverse: isDark ? "#1F2937" : "#FFFFFF",
      },
      border: isDark ? "#374151" : "#E5E7EB",
      hover: isDark ? "#1F2937" : "#F9FAFB",
      active: "#8B5CF6",
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    spacing: {
      xs: "0.5rem",
      sm: "1rem",
      md: "1.5rem",
      lg: "2rem",
      xl: "3rem",
      "2xl": "4rem",
    },
    borderRadius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
      xl: "1.5rem",
      full: "9999px",
    },
  };
}

export const colorPalettes = [
  {
    name: "Purple Dream",
    primary: "#8B5CF6",
    secondary: "#A855F7",
    accent: "#EC4899",
    background: "#F8FAFC",
  },
  {
    name: "Ocean Breeze",
    primary: "#0EA5E9",
    secondary: "#06B6D4",
    accent: "#10B981",
    background: "#F0F9FF",
  },
  {
    name: "Sunset Glow",
    primary: "#F59E0B",
    secondary: "#EF4444",
    accent: "#F97316",
    background: "#FFFBEB",
  },
  {
    name: "Forest Green",
    primary: "#10B981",
    secondary: "#059669",
    accent: "#84CC16",
    background: "#F0FDF4",
  },
  {
    name: "Rose Gold",
    primary: "#F43F5E",
    secondary: "#EC4899",
    accent: "#F59E0B",
    background: "#FFF7ED",
  },
];

/** ---------- CONTEXT ---------- */
const ThemeCtx = createContext(null);

/** Provider with localStorage persistence + system-pref fallback */
export function ThemeProvider({
  children,
  defaultDark = false,
  persistKey = "theme:pref",
}) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return defaultDark;
    try {
      const saved = window.localStorage.getItem(persistKey);
      if (saved === "1" || saved === "0") return saved === "1";
      // fallback to system
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : defaultDark;
    } catch {
      return defaultDark;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(persistKey, isDark ? "1" : "0");
    } catch (err) {
      if (typeof console !== "undefined") {
        console.warn("[ThemeProvider] Failed to persist theme:", err);
      }
    }
  }, [isDark, persistKey]);

  const toggleTheme = () => setIsDark((v) => !v);

  const value = useMemo(
    () => ({
      ...buildTheme(isDark),
      isDark,
      setIsDark,
      toggleTheme,
    }),
    [isDark]
  );

  // IMPORTANT: no JSX here
  return React.createElement(ThemeCtx.Provider, { value }, children);
}

/** Hook — always call useContext (no conditional hooks), with override support */
export function useTheme(overrideIsDark) {
  const ctx = useContext(ThemeCtx);

  // If a boolean is passed, return a one-off theme (keeps your old API working).
  if (typeof overrideIsDark === "boolean") {
    return buildTheme(overrideIsDark);
  }

  // If provider exists, use it
  if (ctx) return ctx;

  // Fallback if no provider in tree
  return {
    ...buildTheme(false),
    isDark: false,
    toggleTheme: () => {},
    setIsDark: () => {},
  };
}
