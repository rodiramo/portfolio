// src/components/Header.jsx
import React from "react";
import { useTheme } from "../../theme.js";
import { MdOutlineWavingHand } from "react-icons/md";
import Me from "../../components/Me.jsx";
import { BriefcaseBusiness, MapPinHouse } from "lucide-react";
import { useTranslation } from "react-i18next";

/* Small chip + button helpers (inline styled) */
const Chip = ({ theme, children, style }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: "0.85rem",
      lineHeight: 1,
      background: theme.isDark
        ? "rgba(255,255,255,0.06)"
        : "rgba(15,23,42,0.06)",
      border: theme.isDark
        ? "1px solid rgba(255,255,255,0.14)"
        : "1px solid rgba(15,23,42,0.12)",
      color: theme.colors.text.primary,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </span>
);

const ActionBtn = ({ theme, kind = "primary", onClick, children }) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 10,
    fontSize: "0.95rem",
    lineHeight: 1,
    fontWeight: 700,
    cursor: "pointer",
    userSelect: "none",
    transition: "transform .15s ease, box-shadow .15s ease, opacity .2s",
    textDecoration: "none",
  };
  const styles =
    kind === "primary"
      ? {
          ...base,
          background: theme.colors.primary,
          color: theme.colors.text.inverse,
          border: "1px solid transparent",
        }
      : {
          ...base,
          background: "transparent",
          color: theme.colors.text.primary,
          border: `1px solid ${theme.colors.border}`,
        };
  return (
    <button
      onClick={onClick}
      style={styles}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </button>
  );
};

/* -------- Refined Glass Header (i18n-enabled) -------- */
const Header = ({
  // Props can override translations if passed
  name, // falls back to t("hero.name") if omitted
  title, // falls back to t("hero.role")
  description, // falls back to t("hero.description")
  headerHeight = "70vh",
  isDarkMode,
  overflowHeight = "120px",
  blurPx = 1,
  onPrimary = null, // e.g., () => scrollToSection('projects')
  onSecondary = null, // e.g., () => scrollToSection('contact')
}) => {
  const theme = useTheme(isDarkMode);
  const { t } = useTranslation("home");
  const who = t("hero.who", { defaultValue: "I'm " });
  // Safe fallbacks to i18n
  const greeting = t("hero.greeting", { defaultValue: "Hello" });
  const personName =
    name ?? t("hero.name", { defaultValue: "Rocio Diaz Ramos" });
  const role =
    title ?? t("hero.role", { defaultValue: "Web Designer & Developer" });
  const desc = description ?? t("hero.description", { defaultValue: "" });

  // Chips + CTAs
  const chipLocation = t("chips.location", { defaultValue: "Hamburg, DE" });
  const chipAvailable = t("chips.available", { defaultValue: "Available" });
  const ctaProjects = t("cta.viewProjects", { defaultValue: "View Projects" });
  const ctaContact = t("cta.contactMe", { defaultValue: "Contact Me" });

  // Very translucent glass colors (so it never looks like a solid block)
  const glassBg = theme.isDark
    ? "rgba(17, 24, 39, 0.18)"
    : "rgba(255, 255, 255, 0.12)";
  // Subtle border for glass panel
  const glassBorder = theme.isDark
    ? "1px solid rgba(255,255,255,0.14)"
    : "1px solid rgba(15,23,42,0.12)";
  // Soft radial glow behind the card (kept *very* subtle)
  const glow = theme.isDark
    ? "radial-gradient(600px 280px at 50% 40%, rgba(124,58,237,0.18), transparent 60%)"
    : "radial-gradient(600px 280px at 50% 40%, rgba(139,92,246,0.15), transparent 60%)";

  return (
    <div
      className="responsive-container"
      style={{
        position: "relative",
        maxWidth: 1500,
        width: "100%",
        height: headerHeight,
        margin: "0 auto",
        padding: "0 12px",
        borderRadius: 12,
        overflow: "visible",
        marginBottom: `-${overflowHeight}`,
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          background: glow,
          filter: "blur(6px)",
          zIndex: 0,
        }}
      />

      {/* Glass panel */}
      <header
        style={{
          position: "relative",
          height: "50vh",
          minHeight: 360,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: glassBg,
          border: glassBorder,
          backdropFilter: `blur(${blurPx}px) saturate(120%)`,
          WebkitBackdropFilter: `blur(${blurPx}px) saturate(120%)`,
          boxShadow: theme.isDark
            ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.20)"
            : "inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 20px rgba(0,0,0,0.06)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            padding: "16px",
            display: "grid",
            gap: 12,
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          {/* Chips */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chip theme={theme} style={{ background: "#875bff22" }}>
              <MapPinHouse size={16} /> {chipLocation}
            </Chip>
            <Chip theme={theme} style={{ background: "#bbff5b22" }}>
              <BriefcaseBusiness size={16} /> {chipAvailable}
            </Chip>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "6px 0 6px 0",
              color: theme.colors.text.primary,
              letterSpacing: "-0.02em",
            }}
          >
            {greeting}{" "}
            <span style={{ display: "inline-block" }}>
              <span className="wave span-title">
                <MdOutlineWavingHand size={42} color={theme.colors.custom} />
              </span>
            </span>
            <br />
            {who} {personName}{" "}
            <span style={{ display: "inline-block" }}>
              <span
                className="span-title-me"
                style={{ background: theme.colors.light }}
              >
                <Me isDarkMode={isDarkMode} />
              </span>
            </span>
          </h1>

          {/* Role */}
          <h2 style={{ color: theme.colors.text.primary }}>{role}</h2>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              zIndex: 4,
              bottom: -28,
              left: "50%",
              transform: "translateX(-50%)",
              background: "transparent",
              border: "none",
              display: "grid",
              placeItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
            className="scroll-indicator"
          >
            <div
              style={{
                width: 26,
                height: 40,
                borderRadius: 13,
                background: isDarkMode
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(15,23,42,0.07)",
                border: `2px solid ${theme.colors.primary}50`,
                display: "grid",
                placeItems: "center",
                position: "relative",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                className="scroll-chevron"
              >
                <polyline
                  points="6 9 12 15 18 9"
                  stroke={theme.colors.primary}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
              </svg>
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
              lineHeight: 1.6,
              color: theme.colors.text.primary,
              maxWidth: "72ch",
              margin: 0,
              opacity: 0.9,
              paddingInline: 8,
            }}
          >
            {desc}
          </p>

          {/* Actions (optional) */}
          {(onPrimary || onSecondary) && (
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              {onPrimary && (
                <ActionBtn theme={theme} kind="primary" onClick={onPrimary}>
                  {ctaProjects}
                </ActionBtn>
              )}
              {onSecondary && (
                <ActionBtn theme={theme} kind="ghost" onClick={onSecondary}>
                  {ctaContact}
                </ActionBtn>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Micro CSS (animations + small responsive tweak) */}
      <style>{`.scroll-chevron {z-index: 2; animation: floatDown 1.6s ease-in-out 1; cursor: inherit;}
.scroll-indicator:hover .scroll-chevron { animation: floatDown 1.6s ease-in-out 3; }
@keyframes floatDown { 0% { transform: translateY(-6px); opacity: .85; } 60% { transform: translateY(6px); opacity: .25; } 100% { transform: translateY(-6px); opacity: .85; } }
.span-title { background-color: #bbff5b; animation: floatDown 4s ease-in-out 1; transform-origin: 50% 10%; align-items: center; align-content: center; justify-content: center; height: 3rem; border-radius: 30rem; rotate: -10deg; display: inline-block; width: 6rem; }
.span-title-me { margin-left: 10px; animation: me 3s ease-in-out infinite; transform-origin: 20% 20%; display: flex !important; align-items: center; justify-content: center; height: 3rem; align-content: center; border-radius: 30rem; rotate: 10deg; display: inline-block; width: 6rem; }
@keyframes me { 0%,100%{ transform: rotate(0deg);} 10%,30%{ transform: rotate(2deg);} 20%{ transform: rotate(10deg);} 40%{ transform: rotate(14deg);} 50%{ transform: rotate(12deg);} 60%{ transform: rotate(10deg);} }
@keyframes wave { 0%,100%{ transform: rotate(0deg);} 10%,30%{ transform: rotate(14deg);} 20%{ transform: rotate(-8deg);} 40%{ transform: rotate(14deg);} 50%{ transform: rotate(-4deg);} 60%{ transform: rotate(10deg);} }
.wave { animation: wave 2s ease-in-out infinite; transform-origin: 70% 70%; display: inline-flex; align-items: center; justify-content: center; }
.responsive-container { width: 100%; margin-inline: auto; }
@media (max-width: 768px) { .responsive-container { margin-bottom: -54px !important;     height: 60vh !important;} }
@media (max-width: 480px) { .responsive-container { margin-bottom: -34px !important; } }`}</style>
    </div>
  );
};

export default Header;
