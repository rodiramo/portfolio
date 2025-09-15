// src/pages/About/About.jsx
import React, { useState, useEffect, useRef } from "react";
import { ArrowDownRight, GraduationCap, Briefcase, User } from "lucide-react";
import { useTheme } from "../../theme.js";

/* ---------- Timeline item (glass card + subtle line) ---------- */
const TimelineItem = ({ item, index, type, isVisible, isDarkMode }) => {
  const theme = useTheme(isDarkMode);

  const glassBg = isDarkMode
    ? "rgba(17, 24, 39, 0.32)" // slate-900 @ 32%
    : "rgba(255, 255, 255, 0.52)"; // white @ 52%

  const borderCol = isDarkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";

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
            {item.degree || item.position}
          </h4>

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
            {item.period}
          </span>
        </div>

        <p
          style={{
            fontSize: ".98rem",
            color: theme.colors.primary,
            fontWeight: 700,
            margin: ".35rem 0 .25rem",
          }}
        >
          {item.institution || item.company}
        </p>
        <p
          style={{
            fontSize: ".94rem",
            color: theme.colors.text.secondary,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
};

/* ---------- About (frosted section wrapper to match Home) ---------- */
const About = ({ isDarkMode = false }) => {
  const theme = useTheme(isDarkMode);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const timelineRef = useRef(null);

  // data
  const studies = [
    {
      degree: "Tertiary Education in Web Development and Web Design",
      institution: "Davinci Institute of Technology",
      period: "2021 - 2025",
      description:
        "Mastered full-stack web development, UX/UI design, and digital marketing strategies. Built multiple responsive web apps with modern tools and frameworks.",
    },
    {
      degree: "Frontend Development Basics Bootcamp",
      institution: "SheCodes",
      period: "2021",
      description: "Intensive program covering HTML, CSS, and JavaScript.",
    },
  ];

  const experience = [
    {
      position: "Freelance Web Designer",
      company: "Jumping",
      period: "2024",
      description:
        "Designed and developed a custom website focused on UX, accessibility, and modern visuals. Delivered a responsive, polished site that boosted brand presence.",
    },
    {
      position: "Volunteer Web Designer",
      company: "Robol Solutions (Startup)",
      period: "2023 - 2024",
      description:
        "Created user-friendly interfaces and collaborated with developers to ship consistent, high-quality UI across pages and features.",
    },
  ];

  const timelineData = [
    { type: "header", label: "Education" },
    ...studies.map((s) => ({ ...s, category: "education" })),
    { type: "header", label: "Experience" },
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

  // frosted wrapper to match Home
  const sectionGlass = isDarkMode
    ? "rgba(17,24,39,0.28)"
    : "rgba(255,255,255,0.42)";
  const sectionBorder = isDarkMode
    ? "rgba(255,255,255,0.10)"
    : "rgba(0,0,0,0.08)";

  return (
    <div
      style={{
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
      }}
    >
      <section
        style={{
          background: sectionGlass,
          border: `1px solid ${sectionBorder}`,
          borderRadius: 16,
          backdropFilter: "blur(1px) saturate(120%)",
          WebkitBackdropFilter: "blur(1px) saturate(120%)",
          boxShadow: isDarkMode
            ? "0 20px 44px rgba(0,0,0,0.28)"
            : "0 20px 44px rgba(0,0,0,0.08)",
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
            About Me
          </span>
        </div>

        {/* Intro */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.05rem)",
            lineHeight: 1.7,
            color: theme.colors.text.primary,
            margin: 0,
            marginBottom: "0.9rem",
          }}
        >
          I'm a{" "}
          <span style={{ color: theme.colors.primary, fontWeight: 700 }}>
            Hamburg-based web developer and designer
          </span>{" "}
          who turns complex problems into simple, elegant digital solutions. I
          build modern interfaces and interactive experiences that blend
          creativity with{" "}
          <span style={{ color: theme.colors.primary, fontWeight: 700 }}>
            clean, functional design
          </span>
          . I’m always learning and love{" "}
          <span style={{ color: theme.colors.primary, fontWeight: 700 }}>
            solving problems
          </span>{" "}
          to create products that not only look beautiful but work seamlessly.
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
            padding: ".5rem .9rem",
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
              fontSize: "1.05rem",
              fontWeight: 700,
              color: theme.colors.text.primary,
              letterSpacing: ".01em",
            }}
          >
            My Journey
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
              Click to explore my education & experience
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
                    item={item}
                    index={index}
                    type={item.category}
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
