// src/pages/About/About.jsx
import React, { useState, useEffect, useRef } from "react";
import { ArrowDownRight, GraduationCap, Briefcase, User } from "lucide-react";
import { useTheme } from "../../theme.js";
import { useTranslation } from "react-i18next";

const TimelineItem = ({ item, index, type, isVisible, isDarkMode }) => {
  const theme = useTheme(isDarkMode);
  const { t } = useTranslation("about");

  // Helper: prefer explicit field on item; else use i18n with item.i18nKey
  const resolve = (field) => {
    if (item && item[field] != null) return item[field];
    if (item && item.i18nKey) return t(`${item.i18nKey}.${field}`);
    return "";
  };

  const degreeOrPosition = resolve("degree") || resolve("position");
  const institutionOrCompany = resolve("institution") || resolve("company");
  const period = resolve("period");
  const description = resolve("description");

  // --- bring over the Skills glass variables ---
  const glassBg = isDarkMode ? "rgba(17,24,39,0.28)" : "rgba(255,255,255,0.42)";
  const borderCol = isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1.25rem",
        marginBottom: "1.5rem",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms cubic-bezier(.2,.6,.2,1)",
        transitionDelay: `${index * 0.12}s`,
      }}
    >
      {/* Dot + line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background:
              "radial-gradient(circle at 50% 50%, " +
              theme.colors.primary +
              ", " +
              theme.colors.primary +
              " 60%, transparent 70%)",
            outline: `2px solid ${theme.colors.primary}`,
            transform: isVisible ? "scale(1)" : "scale(0.6)",
            transition: "transform 380ms ease",
          }}
        />
        <div
          style={{
            width: 2,
            height: 90,
            borderRadius: 30,
            background: `linear-gradient(${theme.colors.primary}, ${theme.colors.primary}00)`,
            marginTop: 6,
            transform: isVisible ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
            transition: "transform 500ms ease",
          }}
        />
      </div>

      {/* Glass card */}
      <div
        style={{
          background: glassBg,
          border: `1px solid ${borderCol}`,
          borderRadius: 14,
          padding: "1rem",
          flex: 1,
          backdropFilter: "blur(12px) saturate(120%)",
          WebkitBackdropFilter: "blur(12px) saturate(120%)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: ".5rem",
            alignItems: "flex-start",
            marginBottom: ".35rem",
            flexWrap: "wrap",
          }}
        >
          <h4
            style={{
              fontSize: "1.02rem",
              fontWeight: 800,
              color: theme.colors.text.primary,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              letterSpacing: ".01em",
            }}
          >
            {type === "education" ? (
              <GraduationCap size={18} color={theme.colors.primary} />
            ) : (
              <Briefcase size={18} color={theme.colors.primary} />
            )}
            {degreeOrPosition}
          </h4>

          {period && (
            <span
              style={{
                fontSize: ".85rem",
                color: theme.colors.primary,
                fontWeight: 700,
                background: `${theme.colors.primary}1A`,
                border: `1px solid ${theme.colors.primary}40`,
                padding: ".2rem .6rem",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
              {period}
            </span>
          )}
        </div>

        {institutionOrCompany && (
          <p
            style={{
              fontSize: ".98rem",
              color: theme.colors.primary,
              fontWeight: 700,
              margin: ".35rem 0 .25rem",
            }}
          >
            {institutionOrCompany}
          </p>
        )}

        {description && (
          <p
            style={{
              fontSize: ".94rem",
              color: theme.colors.text.secondary,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const About = ({ isDarkMode = false }) => {
  const theme = useTheme(isDarkMode);
  const { t } = useTranslation("about");

  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const timelineRef = useRef(null);

  // Very translucent glass colors (so it never looks like a solid block)
  const glassBg = isDarkMode ? "rgba(17,24,39,0.28)" : "rgba(255,255,255,0.42)";
  const borderCol = isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const cardShadow = isDarkMode
    ? "0 12px 28px rgba(0,0,0,0.28)"
    : "0 14px 28px rgba(0,0,0,0.10)";

  // Soft radial glow behind the card (kept *very* subtle)
  const glow = theme.isDark
    ? "radial-gradient(600px 280px at 50% 40%, rgba(192, 237, 58, 0.09), transparent 60%)"
    : "radial-gradient(600px 280px at 50% 40%, rgba(172, 232, 135, 0.14), transparent 60%)";

  // --- Localized data (from about.json) ---
  const studies = t("studies", { returnObjects: true }) || [];
  const experience = t("experience", { returnObjects: true }) || [];

  const timelineData = [
    { type: "header", label: t("sections.education") },
    ...studies.map((s) => ({ ...s, category: "education" })),
    { type: "header", label: t("sections.experience") },
    ...experience.map((e) => ({ ...e, category: "experience" })),
  ];

  // reveal on view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = parseInt(entry.target.dataset.index, 10);
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, i]));
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
    );

    const nodes = timelineRef.current?.querySelectorAll(
      '[data-role="tl-item"]'
    );
    nodes?.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          background: glow,
          filter: "blur(6px)",
          zIndex: -10,
        }}
      />
      <section
        style={{
          background: glassBg,
          border: `1px solid ${borderCol}`,
          backdropFilter: "blur(1.7px)",
          boxShadow: cardShadow,
          borderRadius: 16,
          WebkitBackdropFilter: "blur(1px) saturate(120%)",
          padding: "clamp(16px, 2.2vw, 2rem)",
        }}
      >
        {/* Chip */}
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
            <User size={14} color={theme.colors.primary} />
          </span>
          <span
            style={{
              fontSize: ".9rem",
              fontWeight: 800,
              letterSpacing: ".02em",
            }}
          >
            {t("title")}
          </span>
        </div>

        {/* Intro (from i18n) */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.05rem)",
            lineHeight: 1.7,
            color: theme.colors.text.primary,
            margin: 0,
            marginBottom: "0.9rem",
          }}
        >
          {t("intro")}
        </p>

        {/* Toggle */}
        <div
          onClick={() => setIsOpen((v) => !v)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && setIsOpen((v) => !v)
          }
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".65rem",
            marginTop: ".2rem",
            marginBottom: isOpen ? "1.2rem" : 0,
            padding: ".25rem .9rem",
            borderRadius: 999,
            cursor: "pointer",
            userSelect: "none",
            border: `1.5px solid ${theme.colors.primary}`,
            backgroundColor: isOpen
              ? `${theme.colors.primary}22`
              : hover
              ? `${theme.colors.primary}1A`
              : "transparent",
            transition: "background-color .2s ease",
          }}
        >
          <span
            style={{
              margin: 0,
              fontSize: "0.85rem",
              fontWeight: 700,
              color: theme.colors.text.primary,
              letterSpacing: ".01em",
            }}
          >
            {t("journeyTitle")}
          </span>
          <ArrowDownRight
            size={22}
            style={{
              color: theme.colors.primary,
              transition: "transform .24s ease",
              transform: isOpen ? "rotate(-180deg)" : "rotate(45deg)",
            }}
          />
          {!isOpen && (
            <span
              style={{
                position: "absolute",
                transform: "translateY(165%)",
                backgroundColor: isDarkMode
                  ? "rgba(0,0,0,0.75)"
                  : "rgba(15,23,42,0.9)",
                color: "#fff",
                padding: ".35rem .6rem",
                borderRadius: 6,
                fontSize: ".85rem",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                opacity: hover ? 1 : 0,
                transition: "opacity .2s ease",
                pointerEvents: "none",
              }}
            >
              {t("journeyHint")}
            </span>
          )}
        </div>

        {/* Timeline */}
        <div
          style={{
            maxHeight: isOpen ? "9999px" : 0,
            overflow: "hidden",
            transition: "max-height .5s ease",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div
            ref={timelineRef}
            style={{
              position: "relative",
              paddingLeft: ".25rem",
              paddingTop: isOpen ? ".5rem" : 0,
            }}
          >
            {timelineData.map((item, index) =>
              item.type === "header" ? (
                <div
                  key={`h-${index}`}
                  style={{
                    margin: "1rem 0 .75rem",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: theme.colors.primary,
                    letterSpacing: ".02em",
                  }}
                >
                  {item.label}
                </div>
              ) : (
                <div key={index} data-role="tl-item" data-index={index}>
                  <TimelineItem
                    item={item} // already localized object
                    index={index}
                    type={item.category} // "education" | "experience"
                    isVisible={isOpen && visibleItems.has(index)}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* micro CSS */}
      <style>{`
        @media (max-width: 560px) {
          /* Stack the dot/line and card tighter on phones */
          [data-role="tl-item"] > div { gap: .9rem !important; }
        }
      `}</style>
    </div>
  );
};

export default About;
