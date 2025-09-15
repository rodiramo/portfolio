// src/pages/Projects/Projects.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../theme.js";
import { FileText, ExternalLink, Github, FolderOpen } from "lucide-react";

/* --- tiny chip/tag --- */
const Tag = ({ theme, children }) => (
  <span
    style={{
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: "0.75rem",
      backgroundColor: theme.colors.secondary,
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.border}`,
      lineHeight: 1,
    }}
  >
    {children}
  </span>
);

/* --- buttons/links with icon --- */
const PrimaryLink = ({ theme, to, icon, children, ariaLabel }) => (
  <Link
    to={to}
    aria-label={ariaLabel || "View details"}
    style={{
      padding: "6px 10px",
      borderRadius: 10,
      fontSize: "0.85rem",
      backgroundColor: theme.colors.primary,
      color: theme.colors.text.inverse,
      textDecoration: "none",
      fontWeight: 700,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
    }}
  >
    {icon}
    {children}
  </Link>
);

const OutlineA = ({ theme, href, icon, children, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={ariaLabel}
    style={{
      padding: "6px 10px",
      borderRadius: 10,
      fontSize: "0.85rem",
      background: "transparent",
      color: theme.colors.text.primary,
      border: `1px solid ${theme.colors.border}`,
      textDecoration: "none",
      fontWeight: 600,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
    }}
  >
    {icon}
    {children}
  </a>
);

/* --- compact glass card --- */
const ProjectCard = ({
  theme,
  id,
  title,
  description,
  tech,
  coverText,
  slug,
  repoLink,
  liveLink,
  cardGlass,
  borderCol,
  isDarkMode,
}) => (
  <div id={id}>
    <div
      style={{
        padding: 12,
        borderRadius: 14,
        background: cardGlass,
        border: `1px solid ${borderCol}`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition:
          "transform .18s ease, box-shadow .18s ease, background .18s ease",
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 10px 22px rgba(0,0,0,.12)";
        e.currentTarget.style.background = isDarkMode
          ? "rgba(17,24,39,0.38)"
          : "rgba(255,255,255,0.72)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = cardGlass;
      }}
    >
      {/* Thumb */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          borderRadius: 10,
          backgroundColor: theme.colors.secondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <p
          style={{
            color: theme.colors.text.secondary,
            fontSize: "0.85rem",
            margin: 0,
          }}
        >
          {coverText || "Preview"}
        </p>
      </div>

      {/* Title */}
      <h3
        style={{
          margin: 0,
          fontSize: "1rem",
          fontWeight: 800,
          color: theme.colors.primary,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: 0,
          color: theme.colors.text.primary,
          lineHeight: 1.45,
          fontSize: "0.9rem",
        }}
      >
        {description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tech.map((t) => (
          <Tag key={t} theme={theme}>
            {t}
          </Tag>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 2 }}>
        <PrimaryLink
          theme={theme}
          to={`/projects/${slug}`}
          icon={<FileText size={16} />}
          ariaLabel={`View details for ${title}`}
        >
          Details
        </PrimaryLink>

        {liveLink && (
          <OutlineA
            theme={theme}
            href={liveLink}
            icon={<ExternalLink size={16} />}
            ariaLabel={`Open live site for ${title}`}
          >
            Live
          </OutlineA>
        )}

        {repoLink && (
          <OutlineA
            theme={theme}
            href={repoLink}
            icon={<Github size={16} />}
            ariaLabel={`Open GitHub repo for ${title}`}
          >
            GitHub
          </OutlineA>
        )}
      </div>
    </div>
  </div>
);

const Projects = ({ isDarkMode = false }) => {
  const theme = useTheme(isDarkMode);

  // Glass look to match Home/About
  const glassBg = isDarkMode ? "rgba(17,24,39,0.28)" : "rgba(255,255,255,0.42)";
  const borderCol = isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const cardGlass = isDarkMode
    ? "rgba(17,24,39,0.32)"
    : "rgba(255,255,255,0.56)";
  const cardShadow = isDarkMode
    ? "0 12px 28px rgba(0,0,0,0.28)"
    : "0 14px 28px rgba(0,0,0,0.10)";

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Glass wrapper */}
      <section
        style={{
          background: glassBg,
          border: `1px solid ${borderCol}`,
          borderRadius: 16,
          backdropFilter: "blur(1px) saturate(120%)",
          WebkitBackdropFilter: "blur(1px) saturate(120%)",
          boxShadow: cardShadow,
          padding: "clamp(16px, 2.2vw, 22px)",
        }}
      >
        {/* Chip header */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 9999,
            background: `${theme.colors.primary}10`,
            border: `1px solid ${theme.colors.primary}33`,
            color: theme.colors.text.primary,
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              display: "inline-grid",
              placeItems: "center",
              width: 22,
              height: 22,
              borderRadius: 9999,
              backgroundColor: `${theme.colors.primary}22`,
              border: `1px solid ${theme.colors.primary}55`,
            }}
          >
            <FolderOpen size={14} color={theme.colors.primary} />
          </span>
          <span
            style={{
              fontSize: ".9rem",
              fontWeight: 800,
              letterSpacing: ".02em",
            }}
          >
            Projects
          </span>
        </div>

        {/* Subtitle (optional) */}
        <p
          style={{
            margin: "0 0 12px 0",
            fontSize: "clamp(.95rem, 1.8vw, 1.05rem)",
            color: theme.colors.text.secondary,
          }}
        >
          A quick look at selected design & development work
        </p>

        {/* Grid */}
        <div style={gridStyle}>
          <ProjectCard
            theme={theme}
            id="navippon"
            title="Navippon"
            description="Travel guide app for Japan—discover attractions, plan itineraries, and explore with interactive maps."
            tech={["React", "Node.js", "MongoDB", "Google Maps API"]}
            coverText="Navippon preview"
            slug="navippon"
            liveLink="#"
            repoLink="#"
            cardGlass={cardGlass}
            borderCol={borderCol}
            isDarkMode={isDarkMode}
          />

          <ProjectCard
            theme={theme}
            id="jumping"
            title="Jumping"
            description="Jump-rope fitness tracker with session logs, calorie estimates, and adaptive training plans."
            tech={["React Native", "Firebase", "UI/UX", "HealthKit"]}
            coverText="Workout session / stats"
            slug="jumping"
            liveLink="#"
            // no repoLink for this one
            cardGlass={cardGlass}
            borderCol={borderCol}
            isDarkMode={isDarkMode}
          />

          <ProjectCard
            theme={theme}
            id="robol"
            title="Robol Solutions"
            description="Marketing site design in Figma and dev handoff—responsive layouts, token-based design system."
            tech={["Figma", "Design System", "Responsive", "Dev Handoff"]}
            coverText="Robol Solutions landing"
            slug="robol"
            liveLink="#"
            cardGlass={cardGlass}
            borderCol={borderCol}
            isDarkMode={isDarkMode}
          />

          <ProjectCard
            theme={theme}
            id="topcarteras"
            title="Top Carteras"
            description="E-commerce UI for Argentinian handbags—PLP, PDP, cart, and checkout optimized for conversion."
            tech={["Figma", "E-commerce UX", "Design System", "Checkout Flow"]}
            coverText="Top Carteras storefront"
            slug="topcarteras"
            liveLink="#"
            cardGlass={cardGlass}
            borderCol={borderCol}
            isDarkMode={isDarkMode}
          />
        </div>
      </section>
    </div>
  );
};

export default Projects;
