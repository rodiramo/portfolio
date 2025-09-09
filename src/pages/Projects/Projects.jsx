import React, { useState } from "react";
import { useTheme } from "../../theme.js";

const Tag = ({ theme, children }) => (
  <span
    style={{
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: "0.8rem",
      backgroundColor: theme.colors.secondary,
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.border}`,
    }}
  >
    {children}
  </span>
);

const PrimaryButton = ({ theme, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 12px",
      borderRadius: 10,
      fontSize: "0.9rem",
      backgroundColor: theme.colors.primary,
      color: theme.colors.text.inverse,
      border: "none",
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

const GhostButton = ({ theme, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 12px",
      borderRadius: 10,
      fontSize: "0.9rem",
      background: "transparent",
      color: theme.colors.text.primary,
      border: `1px solid ${theme.colors.border}`,
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

const CaseStudy = ({ theme, data }) => (
  <div
    style={{
      marginTop: 12,
      paddingTop: 12,
      borderTop: `1px solid ${theme.colors.border}`,
    }}
  >
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: 10,
        backgroundColor: theme.colors.secondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      <p style={{ color: theme.colors.text.secondary, fontSize: "0.9rem" }}>
        {data.coverText || "Case study cover"}
      </p>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
        gap: 8,
        marginBottom: 10,
      }}
    >
      <div>
        <div
          style={{ fontSize: "0.75rem", color: theme.colors.text.secondary }}
        >
          Role
        </div>
        <div style={{ fontSize: "0.95rem", color: theme.colors.text.primary }}>
          {data.role}
        </div>
      </div>
      <div>
        <div
          style={{ fontSize: "0.75rem", color: theme.colors.text.secondary }}
        >
          Timeline
        </div>
        <div style={{ fontSize: "0.95rem", color: theme.colors.text.primary }}>
          {data.timeline}
        </div>
      </div>
      <div>
        <div
          style={{ fontSize: "0.75rem", color: theme.colors.text.secondary }}
        >
          Team
        </div>
        <div style={{ fontSize: "0.95rem", color: theme.colors.text.primary }}>
          {data.team}
        </div>
      </div>
    </div>

    <div style={{ display: "grid", gap: 10 }}>
      {data.overview && (
        <section>
          <h4
            style={{
              margin: 0,
              marginBottom: 6,
              fontSize: "1rem",
              color: theme.colors.text.primary,
            }}
          >
            Overview
          </h4>
          <p
            style={{
              margin: 0,
              color: theme.colors.text.secondary,
              fontSize: "0.95rem",
              lineHeight: 1.55,
            }}
          >
            {data.overview}
          </p>
        </section>
      )}

      {data.challenges?.length > 0 && (
        <section>
          <h4
            style={{
              margin: 0,
              marginBottom: 6,
              fontSize: "1rem",
              color: theme.colors.text.primary,
            }}
          >
            Challenges
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              color: theme.colors.text.secondary,
              fontSize: "0.95rem",
              lineHeight: 1.55,
            }}
          >
            {data.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {data.highlights?.length > 0 && (
        <section>
          <h4
            style={{
              margin: 0,
              marginBottom: 6,
              fontSize: "1rem",
              color: theme.colors.text.primary,
            }}
          >
            Highlights
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              color: theme.colors.text.secondary,
              fontSize: "0.95rem",
              lineHeight: 1.55,
            }}
          >
            {data.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  </div>
);

const ProjectCard = ({
  theme,
  id,
  title,
  description,
  tech,
  coverText,
  caseStudy,
  liveLink,
  repoLink,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div id={id} style={{ marginBottom: 16 }}>
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: 8,
            fontSize: "1.25rem",
            fontWeight: 800,
            color: theme.colors.primary,
          }}
        >
          {title}
        </h3>

        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 10,
            backgroundColor: theme.colors.secondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <p style={{ color: theme.colors.text.secondary, fontSize: "0.9rem" }}>
            {coverText || "Project image"}
          </p>
        </div>

        <p
          style={{
            margin: 0,
            marginBottom: 10,
            color: theme.colors.text.primary,
            lineHeight: 1.55,
            fontSize: "0.95rem",
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 10,
          }}
        >
          {tech.map((t) => (
            <Tag key={t} theme={theme}>
              {t}
            </Tag>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noreferrer">
              <PrimaryButton theme={theme}>View Project</PrimaryButton>
            </a>
          )}
          <GhostButton theme={theme} onClick={() => setOpen((v) => !v)}>
            {open ? "Hide Case Study" : "View Case Study"}
          </GhostButton>
          {repoLink && (
            <a href={repoLink} target="_blank" rel="noreferrer">
              <GhostButton theme={theme}>GitHub</GhostButton>
            </a>
          )}
        </div>

        {open && <CaseStudy theme={theme} data={caseStudy} />}
      </div>
    </div>
  );
};

const Projects = () => {
  const theme = useTheme();

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      <h2
        style={{
          margin: 0,
          marginBottom: 16,
          fontSize: "1.75rem",
          fontWeight: 800,
          color: theme.colors.text.primary,
        }}
      >
        Projects
      </h2>

      {/* Navippon */}
      <ProjectCard
        theme={theme}
        id="navippon"
        title="Navippon"
        description="A travel guide app for exploring Japan—discover attractions, plan itineraries, and learn culture through curated content and interactive maps."
        tech={["React", "Node.js", "MongoDB", "Google Maps API"]}
        coverText="Navippon preview"
        liveLink="#"
        repoLink="#"
        caseStudy={{
          coverText: "City view / map feature",
          role: "Design & Frontend",
          timeline: "3 months (2024)",
          team: "Solo project",
          overview:
            "Responsive SPA with location search, saved spots, and day-by-day trip planning. Focused on quick discovery and smooth map interactions.",
          challenges: [
            "Smooth map interactions on mobile",
            "Editable itinerary data model",
            "Balancing info density vs. readability",
          ],
          highlights: [
            "Offline-ready saved itineraries",
            "Custom map markers & clusters",
            "Keyboard-first navigation and accessible contrast",
          ],
        }}
      />

      {/* Jumping */}
      <ProjectCard
        theme={theme}
        id="jumping"
        title="Jumping"
        description="A jump-rope fitness tracker that logs sessions, estimates calories, and recommends adaptable training plans."
        tech={["React Native", "Firebase", "UI/UX", "Health Kit"]}
        coverText="Workout session / stats"
        liveLink="#"
        repoLink="#"
        caseStudy={{
          coverText: "Session stats screen",
          role: "Design, Frontend & Integrations",
          timeline: "2 months (2024)",
          team: "Solo project",
          overview:
            "Mobile app with quick-start sessions, pacing feedback, and minimal UI for in-workout focus.",
          challenges: [
            "Real-time feedback without distraction",
            "Reliable cloud sync",
            "Legible charts at a glance",
          ],
          highlights: [
            "One-tap quick start & auto-pause",
            "Weekly trends analytics",
            "Anonymous auth with seamless device sync",
          ],
        }}
      />

      {/* Robol Solutions */}
      <ProjectCard
        theme={theme}
        id="robol"
        title="Robol Solutions Marketing Site"
        description="Led the visual design in Figma and coordinated closely with developers to ship responsive, pixel-accurate pages for a startup marketing site."
        tech={["Figma", "Design System", "Responsive", "Dev Handoff"]}
        coverText="Robol Solutions landing"
        liveLink="#"
        caseStudy={{
          coverText: "Design system & landing layout",
          role: "Lead Designer",
          timeline: "2023–2024",
          team: "Founder + 2 developers",
          overview:
            "Created a token-based design system and component library in Figma, then partnered with engineering to deliver consistent UI across pages.",
          challenges: [
            "Unifying a fragmented brand baseline",
            "Reducing handoff friction",
            "Maintaining performance on low-end mobile",
          ],
          highlights: [
            "Design tokens & reusable components (Figma Variables/Auto Layout)",
            "Detailed dev-ready specs and redlines",
            "Lighthouse targets ≥ 95 (perf/a11y/best practices)",
          ],
        }}
      />

      {/* Top Carteras */}
      <ProjectCard
        theme={theme}
        id="topcarteras"
        title="Top Carteras E-commerce UI"
        description="Argentinian handbags shop—designed end-to-end flows in Figma (home, listing, product, cart, checkout) and collaborated on implementation."
        tech={["Figma", "E-commerce UX", "Design System", "Checkout Flow"]}
        coverText="Top Carteras storefront"
        liveLink="#"
        caseStudy={{
          coverText: "PLP + PDP flows",
          role: "Product Designer",
          timeline: "2024",
          team: "Client + 1 developer",
          overview:
            "Focused on conversion, clarity for variants, and a smooth cart/checkout with localized content for Argentina.",
          challenges: [
            "Local payment & shipping nuances",
            "Image-heavy pages without jank",
            "Variant/stock clarity (sizes, colors)",
          ],
          highlights: [
            "PLP filters + Quick Add for speed",
            "PDP variant micro-interactions & size guide",
            "Trust patterns in checkout (badges, delivery promises)",
          ],
        }}
      />
    </div>
  );
};

export default Projects;
