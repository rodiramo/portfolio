// src/pages/Projects/ProjectDetail.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../theme.js";

const CASES = {
  navippon: {
    title: "Navippon",
    subtitle: "Japan travel guide — discovery, itineraries, culture",
    coverImage:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop",
    summary:
      "Navippon helps travelers plan and explore Japan with curated POIs, map-based discovery, and day-by-day itineraries that balance culture, food, and logistics.",
    role: "Design & Frontend",
    timeframe: "2024",
    team: "Solo + traveler feedback",
    tools: ["Figma", "React", "Node.js", "MongoDB", "Google Maps API"],
    responsibilities: [
      "UX flows for search, save, and itinerary building",
      "React UI with accessible, responsive components",
      "Maps for POIs, routes, and time estimates",
      "Collections, favorites, and offline notes",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1569807351045-0b5ef7c6de8e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=1200&auto=format&fit=crop",
    ],
    outcomes: [
      "MVP validated with 12 travelers",
      "Avg. session ~5m; repeat visits during planning",
    ],
    links: [
      { label: "Figma", href: "#" },
      { label: "Prototype", href: "#" },
    ],
  },
  jumping: {
    title: "Jumping",
    subtitle: "Jump-rope tracker with trends and calories",
    coverImage:
      "https://images.unsplash.com/photo-1599050751776-0a0b0f5f0b1e?q=80&w=1600&auto=format&fit=crop",
    summary:
      "A minimal tracker for jump-rope workouts: quick logging, streaks, and progress. Designed to reduce friction and make training feel rewarding.",
    role: "UI/UX & Frontend",
    timeframe: "2024",
    team: "Solo",
    tools: ["Figma", "React Native", "Firebase", "HealthKit"],
    responsibilities: [
      "Low-friction logging with auto-detection",
      "Session timelines, personal bests, and streaks",
      "Dark theme; haptics for feedback",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
    ],
    outcomes: ["Prototype tested with 6 users; logging <10s"],
    links: [{ label: "Prototype", href: "#" }],
  },
  robol: {
    title: "Robol Solutions",
    subtitle: "Marketing site — design system + developer handoff",
    coverImage:
      "https://images.unsplash.com/photo-1555421689-43cad7100751?q=80&w=1600&auto=format&fit=crop",
    summary:
      "I designed a compact design system in Figma (tokens, components, variants) and worked closely with developers to ship a clean, responsive marketing site fast.",
    role: "Product Designer",
    timeframe: "2023–2024",
    team: "Me (Design) + 2 Developers",
    tools: ["Figma", "Design tokens", "Auto-layout", "Component variants"],
    responsibilities: [
      "Brand tokens, typography, spacing",
      "Reusable components (nav, hero, cards, CTA)",
      "Responsive specs; states & breakpoints",
      "Async collaboration and handoff",
    ],
    gallery: [],
    outcomes: [
      "Devs reused components across 6 pages",
      "Faster iteration, consistent visuals, accessible contrast",
    ],
    links: [{ label: "Figma", href: "#" }],
  },
  topcarteras: {
    title: "Top Carteras",
    subtitle: "E-commerce UI for the Argentinian market",
    coverImage:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1600&auto=format&fit=crop",
    summary:
      "E-commerce experience tailored to local patterns: filters, PDP variants, and a straightforward cart/checkout, designed in Figma with componentized UI.",
    role: "Product Designer",
    timeframe: "2024",
    team: "Me + Client stakeholder",
    tools: ["Figma", "Variants", "Auto-layout", "Prototypes"],
    responsibilities: [
      "PLP filters & sorting, PDP with variants",
      "Cart/checkout steps with validation and progress",
      "Design documentation for handoff",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    ],
    outcomes: ["Cleaner browse-to-buy flow; fewer dev questions"],
    links: [{ label: "Figma", href: "#" }],
  },
};

const ProjectDetail = ({ isDarkMode = false }) => {
  const theme = useTheme(isDarkMode);
  const { slug } = useParams();
  const data = CASES[slug];

  if (!data) {
    return (
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginBottom: 12,
            padding: "8px 12px",
            borderRadius: 999,
            border: `1px solid ${theme.colors.border}`,
            color: theme.colors.text.primary,
            textDecoration: "none",
          }}
        >
          ← Back to home
        </Link>
        <h1 style={{ margin: 0, color: theme.colors.text.primary }}>
          Not found
        </h1>
        <p style={{ color: theme.colors.text.secondary }}>
          This project doesn’t exist.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: 12,
          padding: "8px 12px",
          borderRadius: 999,
          border: `1px solid ${theme.colors.border}`,
          color: theme.colors.text.primary,
          textDecoration: "none",
        }}
      >
        ← Back to home
      </Link>

      <h1
        style={{
          margin: 0,
          fontSize: "1.8rem",
          fontWeight: 800,
          color: theme.colors.text.primary,
        }}
      >
        {data.title}
      </h1>
      {data.subtitle && (
        <p
          style={{ margin: "4px 0 10px 0", color: theme.colors.text.secondary }}
        >
          {data.subtitle}
        </p>
      )}

      {data.coverImage && (
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 10,
            overflow: "hidden",
            border: `1px solid ${theme.colors.border}`,
            marginBottom: 12,
            background: theme.colors.secondary,
          }}
        >
          <img
            src={data.coverImage}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {data.summary && (
        <p
          style={{
            margin: "8px 0 12px 0",
            lineHeight: 1.6,
            color: theme.colors.text.primary,
          }}
        >
          {data.summary}
        </p>
      )}

      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}
      >
        {data.role && (
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 12,
              background: theme.colors.secondary,
              color: theme.colors.text.primary,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            Role: {data.role}
          </span>
        )}
        {data.timeframe && (
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 12,
              background: theme.colors.secondary,
              color: theme.colors.text.primary,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            When: {data.timeframe}
          </span>
        )}
        {data.team && (
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 12,
              background: theme.colors.secondary,
              color: theme.colors.text.primary,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            Team: {data.team}
          </span>
        )}
      </div>

      {data.tools?.length > 0 && (
        <>
          <h3
            style={{
              margin: "16px 0 6px 0",
              fontSize: 16,
              fontWeight: 800,
              color: theme.colors.text.primary,
            }}
          >
            Tools
          </h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {data.tools.map((t) => (
              <span
                key={t}
                style={{
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: "0.8rem",
                  background: theme.colors.secondary,
                  color: theme.colors.primary,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </>
      )}

      {data.responsibilities?.length > 0 && (
        <>
          <h3
            style={{
              margin: "16px 0 6px 0",
              fontSize: 16,
              fontWeight: 800,
              color: theme.colors.text.primary,
            }}
          >
            Responsibilities
          </h3>
          <ul
            style={{
              margin: "0 0 8px 18px",
              lineHeight: 1.6,
              color: theme.colors.text.secondary,
            }}
          >
            {data.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </>
      )}

      {data.gallery?.length > 0 && (
        <>
          <h3
            style={{
              margin: "16px 0 6px 0",
              fontSize: 16,
              fontWeight: 800,
              color: theme.colors.text.primary,
            }}
          >
            Gallery
          </h3>
          <div
            style={{
              display: "grid",
              gap: 8,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              marginBottom: 8,
            }}
          >
            {data.gallery.map((src, i) => (
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

      {data.outcomes?.length > 0 && (
        <>
          <h3
            style={{
              margin: "16px 0 6px 0",
              fontSize: 16,
              fontWeight: 800,
              color: theme.colors.text.primary,
            }}
          >
            Outcome
          </h3>
          <ul
            style={{
              margin: "0 0 8px 18px",
              lineHeight: 1.6,
              color: theme.colors.text.secondary,
            }}
          >
            {data.outcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </>
      )}

      {data.links?.length > 0 && (
        <div
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}
        >
          {data.links.map((l) => (
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
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
