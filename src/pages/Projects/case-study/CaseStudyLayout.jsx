// src/pages/Projects/case-study/CaseStudyLayout.jsx
import React, { useState } from "react";
import { useTheme } from "../../../theme.js";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Github,
  Palette,
  Target,
  ListOrdered,
  Wrench,
  ListChecks,
  Images,
  Megaphone,
  ShoppingBag,
  BarChart3,
  Route,
  Users,
  Calendar,
} from "lucide-react";

/* ------------ tiny layout helpers ------------ */
const Row = ({ style = {}, children }) => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", ...style }}>
    {children}
  </div>
);

const Chip = ({ children, theme }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      background: theme.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      color: theme.colors.text.primary,
      border: `1px solid ${theme.colors.border}`,
      lineHeight: 1,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

/* ------------ headings with small subtitle ------------ */
const SectionTitle = ({ theme, icon: Icon, children, sub }) => (
  <div style={{ margin: "22px 0 12px 0" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 4,
      }}
    >
      {Icon && <Icon size={18} color={theme.colors.primary} />}
      <h3
        style={{
          margin: 0,
          fontSize: "clamp(18px, 2vw, 20px)",
          fontWeight: 900,
          color: theme.colors.text.primary,
          letterSpacing: ".01em",
        }}
      >
        {children}
      </h3>
    </div>
    {sub && (
      <p
        style={{
          margin: "2px 0 0 0",
          color: theme.colors.text.secondary,
          fontSize: "clamp(12px, 1.6vw, 14px)",
        }}
      >
        {sub}
      </p>
    )}
    <div
      aria-hidden
      style={{
        height: 2,
        width: 42,
        marginTop: 8,
        borderRadius: 2,
        background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primary}80)`,
      }}
    />
  </div>
);

/* ------------ pills for external links (matches Projects) ------------ */
const PillLink = ({ theme, href, label, icon, ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={ariaLabel || label}
    style={{
      padding: "8px 12px",
      borderRadius: 999,
      fontSize: "0.85rem",
      background: theme.colors.primary,
      color: theme.colors.text.inverse,
      textDecoration: "none",
      fontWeight: 800,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      border: "none",
      transition: "transform .15s ease, box-shadow .15s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow = "0 10px 18px rgba(0,0,0,.18)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {icon}
    {label}
  </a>
);

/* ------------ numbered steps list ------------ */
const StepList = ({ items = [], theme, tone = "neutral" }) => {
  const toneCol =
    tone === "danger"
      ? "#ef4444"
      : tone === "success"
      ? "#22c55e"
      : theme.colors.primary;

  const chipBg = `${toneCol}1A`;
  const chipBr = `${toneCol}40`;

  return (
    <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
      {items.map((txt, i) => (
        <li
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 10,
            alignItems: "start",
            margin: "10px 0",
            padding: 12,
            borderRadius: 12,
            background: theme.isDark
              ? "rgba(255,255,255,0.04)"
              : "rgba(0,0,0,0.04)",
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-grid",
              placeItems: "center",
              width: 28,
              height: 28,
              borderRadius: 999,
              fontWeight: 900,
              color: toneCol,
              background: chipBg,
              border: `1px solid ${chipBr}`,
            }}
          >
            {i + 1}
          </span>
          <span
            style={{
              color: theme.colors.text.primary,
              fontSize: "clamp(14px, 1.8vw, 16px)",
              lineHeight: 1.7,
            }}
          >
            {txt}
          </span>
        </li>
      ))}
    </ol>
  );
};

/* ------------ brand palette swatches ------------ */
const ColorSwatch = ({ token }) => (
  <div style={{ display: "grid", gap: 6, placeItems: "center" }}>
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        border: "1px solid rgba(0,0,0,.08)",
        background: token.value,
      }}
      title={token.name}
    />
    <small style={{ opacity: 0.8 }}>{token.name}</small>
  </div>
);

/* =================================================================== */
export default function CaseStudyLayout({
  isDarkMode = false,
  /* HERO */
  title,
  subtitle,
  coverImage,
  summary,
  /* META */
  role,
  timeframe,
  team,
  tools = [],
  teamMembers = [],
  /* CORE */
  responsibilities = [],
  problems = [],
  solutions = [],
  gallery = [],
  outcomes = [],
  links = [],
  /* FULL STORY (optional) */
  goals = [],
  process = [],
  brand = {},
  marketing = [],
  merchandising = [],
  metrics = [],
  nextSteps = [],
  /* UX */
  onBack,
}) {
  const theme = useTheme(isDarkMode);
  const { t } = useTranslation("projects");
  const [lightbox, setLightbox] = useState(null);
  // handle keyboard navigation for lightbox
  React.useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (typeof lightbox === "number") {
        if (e.key === "ArrowRight")
          setLightbox((prev) => (prev + 1 >= coverImage.length ? 0 : prev + 1));
        if (e.key === "ArrowLeft")
          setLightbox((prev) =>
            prev - 1 < 0 ? coverImage.length - 1 : prev - 1
          );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, coverImage.length]);

  const L = {
    back: t("case.back", { defaultValue: "Back" }),
    role: t("case.role", { defaultValue: "Role" }),
    when: t("case.when", { defaultValue: "When" }),
    team: t("case.team", { defaultValue: "Team" }),
    tools: t("case.tools", { defaultValue: "Tools" }),
    responsibilities: t("case.responsibilities", {
      defaultValue: "Responsibilities",
    }),
    gallery: t("case.gallery", { defaultValue: "Gallery" }),
    outcome: t("case.outcome", { defaultValue: "Outcome" }),
    links: t("case.links", { defaultValue: "Links" }),
    problems: t("case.problems", { defaultValue: "Problems" }),
    solutions: t("case.solutions", { defaultValue: "Solutions" }),
    goals: t("case.goals", { defaultValue: "Goals" }),
    process: t("case.process", { defaultValue: "Process" }),
    brandSys: t("case.brand", { defaultValue: "Brand System" }),
    marketing: t("case.marketing", { defaultValue: "Marketing" }),
    merchandising: t("case.merchandising", { defaultValue: "Merchandising" }),
    metrics: t("case.metrics", { defaultValue: "Results" }),
    next: t("case.next", { defaultValue: "Next Steps" }),
    teamMembersLabel: t("case.teamMembers", { defaultValue: "Team" }),
  };

  /* glass vars */
  const wrapGlass = isDarkMode
    ? "rgba(17,24,39,0.28)"
    : "rgba(255,255,255,0.42)";
  const borderCol = isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const cardGlass = isDarkMode
    ? "rgba(17,24,39,0.32)"
    : "rgba(255,255,255,0.56)";

  const linkIcon = (kind) =>
    kind === "repo" ? (
      <Github size={16} />
    ) : kind === "doc" ? (
      <FileText size={16} />
    ) : (
      <ExternalLink size={16} />
    );

  return (
    <div
      style={{
        maxWidth: 1500,
        margin: "0 auto",
        marginTop: "5rem",
        padding: "16px 16px 28px",
        color: theme.colors.text.primary,
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
      }}
    >
      {/* Back button */}
      <div
        style={{
          position: "fixed",
          left: "4rem",
          bottom: "max(12px, env(safe-area-inset-bottom))",
          transform: "translateX(-50%)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <button
          onClick={onBack || (() => window.history.back())}
          style={{
            pointerEvents: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 999,
            border: `1px solid ${theme.colors.border}`,
            background: `${theme.colors.surface}CC`,
            backdropFilter: "blur(8px) saturate(120%)",
            WebkitBackdropFilter: "blur(8px) saturate(120%)",
            color: theme.colors.text.primary,
            cursor: "pointer",
            fontWeight: 800,
            boxShadow: isDarkMode
              ? "0 12px 22px rgba(0,0,0,.28)"
              : "0 12px 22px rgba(0,0,0,.12)",
            transition: "transform .15s ease, box-shadow .15s ease",
          }}
          aria-label={L.back}
          title={L.back}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 14px 26px rgba(0,0,0,.28)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = isDarkMode
              ? "0 12px 22px rgba(0,0,0,.28)"
              : "0 12px 22px rgba(0,0,0,.12)";
          }}
        >
          <ArrowLeft size={16} />
          {L.back}
        </button>
      </div>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          borderRadius: 18,
          background: wrapGlass,
          border: `1px solid ${borderCol}`,
          padding: 16,
          overflow: "hidden",
          boxShadow: isDarkMode
            ? "0 16px 34px rgba(0,0,0,.28)"
            : "0 16px 34px rgba(0,0,0,.10)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(900px 360px at 50% 0%, ${theme.colors.primary}22, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        {/* Title */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1
            style={{
              margin: "2px 0 4px 0",
              fontSize: "clamp(26px, 5vw, 40px)",
              lineHeight: 1.12,
              fontWeight: 900,
              letterSpacing: "-0.01em",
              color: theme.colors.text.primary,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                margin: 0,
                color: theme.colors.text.secondary,
                fontSize: "clamp(13px, 2vw, 16px)",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Cover: big main + right column thumbnails, with lightbox */}
        {Array.isArray(coverImage) && coverImage.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 10,
              marginTop: 14,
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {/* Left main */}
            <div
              style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${theme.colors.border}`,
                aspectRatio: "16/9",
              }}
              onClick={() => setLightbox(0)}
            >
              <img
                src={coverImage[0]}
                alt="cover-main"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "zoom-in",
                  display: "block",
                }}
                loading="lazy"
                decoding="async"
              />

              {links?.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    pointerEvents: "auto",
                  }}
                >
                  {links.map((l) => (
                    <PillLink
                      key={l.href}
                      theme={theme}
                      href={l.href}
                      label={l.label}
                      ariaLabel={`${l.label} – ${title}`}
                      icon={linkIcon(l.kind)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right thumbs */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {coverImage.slice(1, 4).map((src, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    borderRadius: 14,
                    overflow: "hidden",
                    border: `1px solid ${theme.colors.border}`,
                    aspectRatio: "4/3",
                  }}
                  onClick={() => setLightbox(i + 1)}
                >
                  <img
                    src={src}
                    alt={`cover-thumb-${i}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "zoom-in",
                      display: "block",
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : coverImage ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: 14,
              overflow: "hidden",
              border: `1px solid ${theme.colors.border}`,
              marginTop: 14,
              background: theme.colors.secondary,
            }}
          >
            <img
              src={coverImage}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
              decoding="async"
            />
            {links?.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {links.map((l) => (
                  <PillLink
                    key={l.href}
                    theme={theme}
                    href={l.href}
                    label={l.label}
                    ariaLabel={`${l.label} – ${title}`}
                    icon={linkIcon(l.kind)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* Summary + meta */}
        {(summary ||
          role ||
          timeframe ||
          team ||
          tools.length > 0 ||
          teamMembers.length > 0) && (
          <div style={{ marginTop: 16 }}>
            {summary && (
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.8,
                  color: theme.colors.text.primary,
                  opacity: 0.95,
                  background: cardGlass,
                  border: `1px solid ${borderCol}`,
                  borderRadius: 14,
                  padding: 14,
                  fontSize: "clamp(14px, 1.9vw, 17px)",
                }}
              >
                {summary}
              </p>
            )}

            {(role || timeframe || team) && (
              <div
                style={{
                  marginTop: 12,
                  background: cardGlass,
                  border: `1px solid ${borderCol}`,
                  borderRadius: 14,
                  padding: 10,
                }}
              >
                <Row>
                  {role && (
                    <Chip theme={theme}>
                      <Wrench size={14} />
                      {L.role}: {role}
                    </Chip>
                  )}
                  {timeframe && (
                    <Chip theme={theme}>
                      <Calendar size={14} />
                      {L.when}: {timeframe}
                    </Chip>
                  )}
                  {team && (
                    <Chip theme={theme}>
                      <Users size={14} />
                      {L.team}: {team}
                    </Chip>
                  )}
                </Row>
              </div>
            )}

            {(tools.length > 0 || teamMembers.length > 0) && (
              <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                {tools.length > 0 && (
                  <div
                    style={{
                      background: cardGlass,
                      border: `1px solid ${borderCol}`,
                      borderRadius: 14,
                      padding: 12,
                    }}
                  >
                    <SectionTitle theme={theme} icon={Wrench}>
                      {L.tools}
                    </SectionTitle>
                    <Row>
                      {tools.map((tItem) => (
                        <Chip key={tItem} theme={theme}>
                          {tItem}
                        </Chip>
                      ))}
                    </Row>
                  </div>
                )}

                {teamMembers.length > 0 && (
                  <div
                    style={{
                      background: cardGlass,
                      border: `1px solid ${borderCol}`,
                      borderRadius: 14,
                      padding: 12,
                    }}
                  >
                    <SectionTitle theme={theme} icon={Users}>
                      {L.teamMembersLabel}
                    </SectionTitle>
                    <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
                      {teamMembers.map((m, i) => (
                        <li key={i}>
                          <strong>{m.name}</strong>
                          {m.role ? ` — ${m.role}` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* CONTENT */}
      <section
        style={{
          marginTop: 18,
          borderRadius: 18,
          width: "100%",
          background: wrapGlass,
          border: `1px solid ${borderCol}`,
          padding: 18,
          backdropFilter: "blur(8px) saturate(120%)",
          WebkitBackdropFilter: "blur(8px) saturate(120%)",
          boxShadow: isDarkMode
            ? "0 16px 34px rgba(0,0,0,.22)"
            : "0 16px 34px rgba(0,0,0,.08)",
        }}
      >
        {goals.length > 0 && (
          <>
            <SectionTitle theme={theme} icon={Target}>
              {L.goals}
            </SectionTitle>
            <ul
              style={{
                margin: "6px 0 16px 18px",
                lineHeight: 1.7,
                fontSize: "clamp(14px,1.6vw,16px)",
              }}
            >
              {goals.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </>
        )}

        {process.length > 0 && (
          <>
            <SectionTitle
              theme={theme}
              icon={ListOrdered}
              sub={t("case.processSub", {
                defaultValue: "From discovery to launch",
              })}
            >
              {L.process}
            </SectionTitle>
            <ol
              style={{
                margin: "6px 0 16px 18px",
                lineHeight: 1.8,
                fontSize: "clamp(14px,1.6vw,16px)",
              }}
            >
              {process.map((p, i) => (
                <li key={i} style={{ marginBottom: 8 }}>
                  <strong>{p.title}</strong>
                  {p.note ? (
                    <>
                      {" "}
                      — <span style={{ opacity: 0.95 }}>{p.note}</span>
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          </>
        )}

        {(brand.logo || brand.palette?.length || brand.typefaces?.length) && (
          <>
            <SectionTitle theme={theme} icon={Palette}>
              {L.brandSys}
            </SectionTitle>
            <div style={{ display: "grid", gap: 12 }}>
              {brand.logo && (
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    background: cardGlass,
                    border: `1px solid ${borderCol}`,
                    borderRadius: 14,
                    padding: 12,
                  }}
                >
                  <img
                    src={brand.logo}
                    alt="Brand logo"
                    style={{ width: 64, height: 64, objectFit: "contain" }}
                  />
                  <div style={{ opacity: 0.9 }}>
                    <div style={{ fontWeight: 800 }}>Logo</div>
                    {brand.guideLink && (
                      <a
                        href={brand.guideLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Brand Guidelines
                      </a>
                    )}
                  </div>
                </div>
              )}

              {brand.palette?.length > 0 && (
                <div
                  style={{
                    background: cardGlass,
                    border: `1px solid ${borderCol}`,
                    borderRadius: 14,
                    padding: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>
                    Palette
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(72px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {brand.palette.map((c) => (
                      <ColorSwatch key={c.name} token={c} />
                    ))}
                  </div>
                </div>
              )}

              {brand.typefaces?.length > 0 && (
                <div
                  style={{
                    background: cardGlass,
                    border: `1px solid ${borderCol}`,
                    borderRadius: 14,
                    padding: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>
                    Typography
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
                    {brand.typefaces.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {responsibilities.length > 0 && (
          <>
            <SectionTitle
              theme={theme}
              icon={ListChecks}
              sub={t("case.respSub", {
                defaultValue: "What I owned or contributed",
              })}
            >
              {L.responsibilities}
            </SectionTitle>
            <ul
              style={{
                margin: "6px 0 16px 18px",
                lineHeight: 1.8,
                fontSize: "clamp(14px, 1.6vw, 16px)",
              }}
            >
              {responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </>
        )}

        {(problems.length > 0 || solutions.length > 0) && (
          <div style={{ display: "grid", gap: 16, marginTop: 8 }}>
            {problems.length > 0 && (
              <div>
                <SectionTitle
                  theme={theme}
                  sub={t("case.problemsSub", {
                    defaultValue: "Key pain points to address",
                  })}
                >
                  {L.problems}
                </SectionTitle>
                <StepList items={problems} theme={theme} tone="danger" />
              </div>
            )}
            {solutions.length > 0 && (
              <div>
                <SectionTitle
                  theme={theme}
                  sub={t("case.solutionsSub", {
                    defaultValue: "Design & product responses",
                  })}
                >
                  {L.solutions}
                </SectionTitle>
                <StepList items={solutions} theme={theme} tone="success" />
              </div>
            )}
          </div>
        )}

        {(marketing.length > 0 || merchandising.length > 0) && (
          <>
            {marketing.length > 0 && (
              <>
                <SectionTitle theme={theme} icon={Megaphone}>
                  {L.marketing}
                </SectionTitle>
                <ul
                  style={{
                    margin: "6px 0 16px 18px",
                    lineHeight: 1.8,
                    fontSize: "clamp(14px,1.6vw,16px)",
                  }}
                >
                  {marketing.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </>
            )}

            {merchandising.length > 0 && (
              <>
                <SectionTitle theme={theme} icon={ShoppingBag}>
                  {L.merchandising}
                </SectionTitle>
                <div
                  className="cs-merch"
                  style={{
                    display: "grid",
                    gap: 10,
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  }}
                >
                  {merchandising.map((src, i) => (
                    <div
                      key={i}
                      style={{
                        aspectRatio: "1/1",
                        borderRadius: 14,
                        overflow: "hidden",
                        border: `1px solid ${theme.colors.border}`,
                        background: theme.colors.secondary,
                        transition: "transform .15s ease, box-shadow .15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 12px 22px rgba(0,0,0,.18)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {gallery.length > 0 && (
          <>
            <SectionTitle
              theme={theme}
              icon={Images}
              sub={t("case.gallerySub", {
                defaultValue: "Screens and work samples",
              })}
            >
              {L.gallery}
            </SectionTitle>

            <div
              className="cs-gallery"
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              {gallery.map((src, i) => {
                const span2 = i % 4 === 0;
                return (
                  <div
                    key={i}
                    className={`cs-gallery-item${span2 ? " span-2" : ""}`}
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: span2 ? "16/9" : "4/3",
                      borderRadius: 14,
                      overflow: "hidden",
                      border: `1px solid ${theme.colors.border}`,
                      background: theme.colors.secondary,
                      transition: "transform .15s ease, box-shadow .15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 22px rgba(0,0,0,.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      loading="lazy"
                      decoding="async"
                      onClick={() => setLightbox({ src })}
                    />
                  </div>
                );
              })}
            </div>

            <style>{`
              @media (min-width: 900px) {
                .cs-gallery .span-2 { grid-column: span 2; }
              }
            `}</style>
          </>
        )}

        {outcomes.length > 0 && (
          <>
            <SectionTitle
              theme={theme}
              icon={BarChart3}
              sub={t("case.outcomeSub", {
                defaultValue: "Results, validation, and impact",
              })}
            >
              {L.outcome}
            </SectionTitle>
            <ul
              style={{
                margin: "6px 0 0 18px",
                lineHeight: 1.8,
                fontSize: "clamp(14px, 1.6vw, 16px)",
              }}
            >
              {outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </>
        )}

        {metrics.length > 0 && (
          <>
            <SectionTitle theme={theme} icon={BarChart3}>
              {L.metrics}
            </SectionTitle>
            <ul
              style={{
                margin: "6px 0 16px 18px",
                lineHeight: 1.8,
                fontSize: "clamp(14px,1.6vw,16px)",
              }}
            >
              {metrics.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </>
        )}

        {nextSteps.length > 0 && (
          <>
            <SectionTitle theme={theme} icon={Route}>
              {L.next}
            </SectionTitle>
            <ul
              style={{
                margin: "6px 0 0 18px",
                lineHeight: 1.8,
                fontSize: "clamp(14px,1.6vw,16px)",
              }}
            >
              {nextSteps.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* Lightbox for cover + gallery */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            cursor: "zoom-out",
          }}
        >
          <img
            src={
              typeof lightbox === "number" ? coverImage[lightbox] : lightbox.src
            }
            alt="preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              borderRadius: 12,
            }}
          />
        </div>
      )}
    </div>
  );
}
