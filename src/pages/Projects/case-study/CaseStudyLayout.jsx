// src/pages/Projects/case-study/CaseStudyLayout.jsx
import React from "react";
import { useTheme } from "../../../theme.js";

const Row = ({ style = {}, children }) => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", ...style }}>
    {children}
  </div>
);

const Chip = ({ children, theme }) => (
  <span
    style={{
      display: "inline-flex",
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: 12,
      background: theme.colors.secondary,
      color: theme.colors.text.primary,
      border: `1px solid ${theme.colors.border}`,
    }}
  >
    {children}
  </span>
);

const H = ({ theme, children }) => (
  <h3
    style={{
      margin: "20px 0 8px 0",
      fontSize: 18,
      fontWeight: 800,
      color: theme.colors.text.primary,
    }}
  >
    {children}
  </h3>
);

export default function CaseStudyLayout({
  isDarkMode = false,
  title,
  subtitle,
  coverImage,
  summary,
  role,
  timeframe,
  team,
  responsibilities = [],
  tools = [],
  gallery = [],
  outcomes = [],
  links = [], // [{label, href}]
  onBack,
}) {
  const theme = useTheme(isDarkMode);

  return (
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "16px",
        color: theme.colors.text.primary,
      }}
    >
      {/* Back & Title */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <button
          onClick={onBack || (() => window.history.back())}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: `1px solid ${theme.colors.border}`,
            background: theme.colors.surface,
            color: theme.colors.text.primary,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <div style={{ marginLeft: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{title}</h1>
          {subtitle && (
            <p
              style={{
                margin: "4px 0 0 0",
                color: theme.colors.text.secondary,
                fontSize: 14,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Cover */}
      {coverImage && (
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 12,
            overflow: "hidden",
            border: `1px solid ${theme.colors.border}`,
            marginBottom: 16,
            background: theme.colors.secondary,
          }}
        >
          <img
            src={coverImage}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {/* Summary & Meta */}
      {summary && (
        <p
          style={{
            margin: "8px 0 16px 0",
            lineHeight: 1.6,
            color: theme.colors.text.primary,
          }}
        >
          {summary}
        </p>
      )}

      <Row style={{ marginBottom: 8 }}>
        {role && <Chip theme={theme}>Role: {role}</Chip>}
        {timeframe && <Chip theme={theme}>When: {timeframe}</Chip>}
        {team && <Chip theme={theme}>Team: {team}</Chip>}
      </Row>

      {/* Tools */}
      {tools.length > 0 && (
        <>
          <H theme={theme}>Tools</H>
          <Row>
            {tools.map((t) => (
              <Chip key={t} theme={theme}>
                {t}
              </Chip>
            ))}
          </Row>
        </>
      )}

      {/* Responsibilities */}
      {responsibilities.length > 0 && (
        <>
          <H theme={theme}>Responsibilities</H>
          <ul style={{ margin: "6px 0 16px 18px", lineHeight: 1.6 }}>
            {responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <>
          <H theme={theme}>Gallery</H>
          <div
            style={{
              display: "grid",
              gap: 8,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            {gallery.map((src, i) => (
              <div
                key={i}
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `1px solid ${theme.colors.border}`,
                  background: theme.colors.secondary,
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Outcomes */}
      {outcomes.length > 0 && (
        <>
          <H theme={theme}>Outcome</H>
          <ul style={{ margin: "6px 0 16px 18px", lineHeight: 1.6 }}>
            {outcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </>
      )}

      {/* Links */}
      {links.length > 0 && (
        <Row style={{ marginTop: 12 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                background: theme.colors.primary,
                color: theme.colors.text.inverse,
                textDecoration: "none",
                fontWeight: 700,
                border: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </Row>
      )}
    </div>
  );
}
