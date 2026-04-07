import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

function buildTheme(isDark = false) {
  return {
    colors: {
      primary: isDark ? " #bbff5b" : "#8B5CF6",
      light: isDark ? "#2D1B69" : "#e0d8f4ff",
      bg: isDark ? "#0F172A" : "#ddd5e8ff",
      dark: isDark ? "#7C3AED" : "#ae97e2ff",
      accent1: " #bbff5b",
      secondary: isDark ? "#1F2937" : "#F3F4F6",
      grey: isDark ? "#F3F4F6" : " #1F2937",
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

const ThemeCtx = createContext(null);

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
    [isDark],
  );

  return React.createElement(ThemeCtx.Provider, { value }, children);
}

export function useTheme(overrideIsDark) {
  const ctx = useContext(ThemeCtx);

  if (typeof overrideIsDark === "boolean") {
    return buildTheme(overrideIsDark);
  }

  if (ctx) return ctx;
  return {
    ...buildTheme(false),
    isDark: false,
    toggleTheme: () => {},
    setIsDark: () => {},
  };
}
