// src/pages/Projects/Projects.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../theme.js";
import { FolderOpen, BookOpen, ArrowUpRight, GitBranch } from "lucide-react";
import { useTranslation } from "react-i18next";

/* --- tiny chip/tag --- */
const Tag = ({ theme, children }) => (
  <span
    style={{
      padding: "6px 12px",
      borderRadius: 999,
      fontSize: "0.78rem",
      backgroundColor: theme.colors.secondary,
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.border}`,
      lineHeight: 1,
      fontWeight: 700,
    }}
  >
    {children}
  </span>
);

/* --- buttons/links with icon (pill) --- */
const PrimaryLink = ({ theme, to, icon, children, ariaLabel }) => (
  <Link
    to={to}
    aria-label={ariaLabel}
    style={{
      padding: "10px 14px",
      borderRadius: 999,
      fontSize: "0.9rem",
      backgroundColor: theme.colors.primary,
      color: theme.colors.text.inverse,
      textDecoration: "none",
      fontWeight: 800,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      transition: "transform .12s ease, box-shadow .12s ease, opacity .2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,.12)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
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
      padding: "10px 14px",
      borderRadius: 999,
      fontSize: "0.9rem",
      background: "transparent",
      color: theme.colors.text.primary,
      border: `1.5px solid ${theme.colors.border}`,
      textDecoration: "none",
      fontWeight: 800,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      transition: "transform .12s ease, box-shadow .12s ease, opacity .2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,.10)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {icon}
    {children}
  </a>
);

/* --- compact glass card --- */
const ProjectCard = ({
  theme,
  card,
  cardGlass,
  borderCol,
  isDarkMode,
  labels,
}) => (
  <div id={card.id} className="proj-card" style={{ height: "100%" }}>
    <div
      style={{
        padding: 14,
        borderRadius: 16,
        background: cardGlass,
        border: `1px solid ${borderCol}`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        height: "100%",
        transition:
          "transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease",
        backdropFilter: "blur(10px) saturate(120%)",
        WebkitBackdropFilter: "blur(10px) saturate(120%)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 26px rgba(0,0,0,.12)";
        e.currentTarget.style.background = isDarkMode
          ? "rgba(17,24,39,0.38)"
          : "rgba(255,255,255,0.72)";
        e.currentTarget.style.borderColor = `${theme.colors.primary}55`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = cardGlass;
        e.currentTarget.style.borderColor = borderCol;
      }}
    >
      {/* Thumb */}
      <div
        className="proj-thumb"
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          borderRadius: 12,
          backgroundColor: theme.colors.secondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: `1px solid ${theme.colors.border}`,
          flexShrink: 0, // keep fixed height
        }}
      >
        {card.coverSrc ? (
          <img
            src={card.coverSrc}
            alt={card.coverAlt || card.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(100%)",
              transform: "scale(1)",
              transition: "filter .35s ease, transform .35s ease",
              display: "block",
            }}
          />
        ) : (
          <p
            style={{
              color: theme.colors.text.secondary,
              fontSize: "0.9rem",
              margin: 0,
              fontWeight: 600,
            }}
          >
            {card.coverText || labels.preview}
          </p>
        )}
      </div>

      {/* Title */}
      <h3
        className="proj-title"
        style={{
          margin: 0,
          fontSize: "1.05rem",
          fontWeight: 900,
          color: theme.colors.primary,
          lineHeight: 1.2,
          letterSpacing: ".01em",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
        }}
        title={card.title}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className="proj-desc"
        style={{
          margin: 0,
          color: theme.colors.text.primary,
          lineHeight: 1.5,
          fontSize: "0.95rem",
          opacity: 0.95,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3, // keep heights consistent
          WebkitBoxOrient: "vertical",
        }}
        title={card.description}
      >
        {card.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(card.tech || []).map((t) => (
          <Tag key={t} theme={theme}>
            {t}
          </Tag>
        ))}
      </div>

      {/* Spacer pushes actions to the bottom */}
      <div style={{ marginTop: "auto" }} />

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {card.slug && (
          <PrimaryLink
            theme={theme}
            to={`/projects/${card.slug}`}
            icon={<BookOpen size={16} />}
            ariaLabel={`${labels.viewDetailsAria} ${card.title}`}
          >
            {labels.details}
          </PrimaryLink>
        )}

        {card.liveLink && (
          <OutlineA
            theme={theme}
            href={card.liveLink}
            icon={<ArrowUpRight size={16} />}
            ariaLabel={`${labels.openLiveAria} ${card.title}`}
          >
            {labels.live}
          </OutlineA>
        )}

        {card.repoLink && (
          <OutlineA
            theme={theme}
            href={card.repoLink}
            icon={<GitBranch size={16} />}
            ariaLabel={`${labels.openRepoAria} ${card.title}`}
          >
            Repo
          </OutlineA>
        )}
      </div>
    </div>
  </div>
);

const Projects = ({ isDarkMode = false }) => {
  const theme = useTheme(isDarkMode);
  const { t } = useTranslation("projects");

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
    gap: 18,
    alignItems: "stretch", // ensure equal-height cards
  };

  // Localized labels and cards
  const labels = {
    sectionTitle: t("sectionTitle", { defaultValue: "Projects" }),
    subtitle: t("subtitle", {
      defaultValue: "A quick look at selected design & development work",
    }),
    details: t("buttons.details", { defaultValue: "Details" }),
    live: t("buttons.live", { defaultValue: "Live" }),
    preview: t("labels.preview", { defaultValue: "Preview" }),
    viewDetailsAria: t("aria.viewDetailsFor", {
      defaultValue: "View details for",
    }),
    openLiveAria: t("aria.openLiveFor", { defaultValue: "Open live site for" }),
    openRepoAria: t("aria.openRepoFor", {
      defaultValue: "Open GitHub repo for",
    }),
  };

  const cards = t("cards", { returnObjects: true }) || [];

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
          padding: "clamp(16px, 2.2vw, 24px)",
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
            marginBottom: "0.85rem",
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
              fontSize: ".92rem",
              fontWeight: 900,
              letterSpacing: ".02em",
            }}
          >
            {labels.sectionTitle}
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            margin: "0 0 14px 0",
            fontSize: "clamp(.98rem, 1.8vw, 1.08rem)",
            color: theme.colors.text.secondary,
            maxWidth: "65ch",
          }}
        >
          {labels.subtitle}
        </p>

        {/* Grid */}
        <div style={gridStyle}>
          {cards.map((card) => (
            <ProjectCard
              key={card.id}
              theme={theme}
              card={card}
              cardGlass={cardGlass}
              borderCol={borderCol}
              isDarkMode={isDarkMode}
              labels={labels}
            />
          ))}
        </div>
      </section>

      {/* image hover: grayscale -> color + slight zoom */}
      <style>{`
        .proj-card:hover .proj-thumb img {
          filter: none !important;
          transform: scale(1.03) !important;
        }
      `}</style>
    </div>
  );
};

export default Projects;
