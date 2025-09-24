// src/components/TopBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme.js";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Globe, Download, House } from "lucide-react";
import Logo from "./Logo.jsx";

export default function TopBar({ isDarkMode = false, setIsDarkMode }) {
  const theme = useTheme(isDarkMode);
  const { i18n, t } = useTranslation("common"); // use common for nav strings

  const toggleLang = () => {
    const next = i18n.language?.toLowerCase().startsWith("de") ? "en" : "de";
    i18n.changeLanguage(next);
  };
  const langLabel = i18n.language?.toLowerCase().startsWith("de") ? "DE" : "EN";

  const toggleDark = () => {
    // ensure we call the setter from App so DottedBg + theme update
    if (typeof setIsDarkMode === "function") setIsDarkMode((v) => !v);
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      aria-label="Utility top bar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
        // match NavBar translucent look:
      }}
    >
      {/* Left: Logo + Home */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Link
          to="/"
          aria-label={t("nav.home")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <Logo isDarkMode={isDarkMode} />
          <span
            className="backdrop-blur-md"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 999,
              background: `${theme.colors.surface}60`,
              border: `1.5px solid ${theme.colors.dark}`,
              color: theme.colors.text.primary,
              fontWeight: 800,
              fontSize: "0.8rem",
            }}
            title={t("nav.home")}
          >
            <House size={16} />
            {t("nav.home")}
          </span>
        </Link>
      </div>

      {/* Middle: language pill (styled like your nav’s pill) */}

      {/* Right: Dark mode + CV (same look as main nav) */}
      <div className="flex items-center justify-between">
        {" "}
        <div
          className="backdrop-blur-md"
          style={{
            marginRight: "0.75rem",
            backgroundColor: `${theme.colors.surface}95`,
            border: `1.5px solid ${theme.colors.primary}30`,
            borderRadius: "30rem",
            display: "flex",
            fontSize: "0.7rem",
            boxShadow:
              "0 1px 3px 0 rgba(83,36,103,0.02), 0 1px 2px 0 rgba(54,16,75,0.06)",
          }}
        >
          <div className="flex items-center justify-between p-1">
            <button
              onClick={toggleLang}
              aria-label={t("nav.language")}
              title={t("nav.language")}
              className="flex items-center transition-colors"
              style={{
                borderRadius: "50px",
                color: theme.colors.primary,
                padding: "6px 12px",
                backgroundColor: `${theme.colors.surface}40`,
                border: "none",
                outline: "none",
                fontWeight: 800,
              }}
            >
              <Globe size={16} style={{ marginRight: 6 }} />
              {langLabel}
            </button>
          </div>
        </div>
        <button
          onClick={toggleDark}
          className="flex items-center rounded-full transition-colors backdrop-blur-md"
          style={{
            outline: "none",
            border: "none",
            padding: 8,
            borderRadius: 50,
            marginRight: "0.75rem",
            backgroundColor: isDarkMode
              ? theme.colors.primary
              : `${theme.colors.surface}50`,
            color: isDarkMode
              ? theme.colors.text.inverse
              : theme.colors.text.primary,
          }}
          aria-label={t("nav.darkMode")}
          title={t("nav.darkMode")}
        >
          {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <a
          href="/cv.pdf"
          className="flex items-center rounded-full transition-all duration-200"
          style={{
            background: theme.colors.light,
            height: "fit-content",
            padding: 8,
            fontSize: "0.7rem",
            border: `1.5px solid ${theme.colors.dark}`,
            borderRadius: 50,
            color: theme.colors.text.primary,
            textDecoration: "none",
            fontWeight: 700,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(139,92,246,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          aria-label={t("nav.curriculum")}
          title={t("nav.curriculum")}
        >
          <Download size={16} style={{ marginRight: 6 }} />
          {t("nav.curriculum")}
        </a>
      </div>
    </div>
  );
}
