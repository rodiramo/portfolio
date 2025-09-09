import React, { useState, useEffect, useRef } from "react";
import { ArrowDownRight, GraduationCap, Briefcase } from "lucide-react";
import { useTheme } from "../../theme.js";

const TimelineItem = ({ item, index, type, isVisible, isDarkMode }) => {
  const theme = useTheme(isDarkMode);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "2rem",
        marginBottom: "3rem",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.6s ease-out",
        transitionDelay: `${index * 0.2}s`,
      }}
    >
      {/* Dot + line */}
      <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div
          style={{
            width: 20,
            height: 12,
            borderRadius: 999,
            backgroundColor: `${theme.colors.primary}60`,
            border: `3px solid ${theme.colors.primary}`,
            transform: isVisible ? "scale(1)" : "scale(0.5)",
            transition: "transform 0.4s ease-out",
            transitionDelay: `${index * 0.2 + 0.2}s`,
          }}
        />
        <div
          style={{
            width: 1.7,
            height: 100,
            borderRadius: 30,
            backgroundColor: theme.colors.primary,
            marginTop: -12,
            transform: isVisible ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
            transition: "transform 0.5s ease-out",
            transitionDelay: `${index * 0.2 + 0.4}s`,
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: 15,
          padding: "1.5rem",
          flex: 1,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: ".5rem",
            gap: ".5rem",
            flexWrap: "wrap",
          }}
        >
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: theme.colors.text.primary,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            {type === "education" ? (
              <GraduationCap
                size={18}
                style={{ color: theme.colors.primary }}
              />
            ) : (
              <Briefcase size={18} style={{ color: theme.colors.primary }} />
            )}
            {item.degree || item.position}
          </h4>

          <span
            style={{
              fontSize: ".9rem",
              color: theme.colors.primary,
              fontWeight: 600,
              backgroundColor: theme.colors.secondary,
              padding: ".25rem .75rem",
              borderRadius: 15,
            }}
          >
            {item.period}
          </span>
        </div>

        <p
          style={{
            fontSize: "1rem",
            color: theme.colors.primary,
            fontWeight: 600,
            margin: ".5rem 0",
          }}
        >
          {item.institution || item.company}
        </p>
        <p
          style={{
            fontSize: ".95rem",
            color: theme.colors.text.secondary,
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
};

const About = ({ isDarkMode = false }) => {
  const theme = useTheme(isDarkMode);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const timelineRef = useRef(null);

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
        "Designed and developed a custom website with a focus on UX, accessibility, and modern visuals. Delivered a responsive, polished site that boosted brand presence.",
    },
    {
      position: "Volunteer Web Designer",
      company: "Robol Solutions (Startup)",
      period: "2023 - 2024",
      description:
        "Created user-friendly interfaces for early-stage products. Helped strengthen brand identity and digital presence through design-driven solutions.",
    },
  ];

  const timelineData = [
    { type: "header", label: "Education" },
    ...studies.map((s) => ({ ...s, category: "education" })),
    { type: "header", label: "Experience" },
    ...experience.map((e) => ({ ...e, category: "experience" })),
  ];

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
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
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
        backgroundColor: theme.colors.secondary,
        minHeight: "100vh",
        paddingTop: "clamp(2rem, 8vw, 10rem)",
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        display: "block",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "clamp(2rem, 4vw, 2.5rem)",
          fontWeight: 800,
          fontFamily: "Vibur, cursive",
          margin: "0 0 .75rem 0",
          paddingBottom: "1rem",
          borderBottom: `1px solid ${theme.colors.border}`,
          color: theme.colors.text.primary,
          lineHeight: 1.1,
          textAlign: "left",
        }}
      >
        About Me
      </h1>

      {/* Intro */}
      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 1.1rem)",
          lineHeight: 1.7,
          color: theme.colors.text.primary,
          margin: 0,
          marginBottom: "1.25rem",
          maxWidth: "70ch",
          textAlign: "left",
        }}
      >
        I'm a{" "}
        <span style={{ color: theme.colors.primary, fontWeight: 700 }}>
          Hamburg-based web developer and designer
        </span>{" "}
        passionate about turning complex challenges into simple, elegant digital
        solutions. I build modern interfaces and interactive experiences that
        blend creativity with{" "}
        <span style={{ color: theme.colors.primary, fontWeight: 700 }}>
          clean, functional design
        </span>
        . I’m always learning and love{" "}
        <span style={{ color: theme.colors.primary, fontWeight: 700 }}>
          solving problems
        </span>{" "}
        to create products that look beautiful and work seamlessly.
      </p>

      {/* Timeline toggle */}
      <div
        onClick={() => setIsOpen((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: ".75rem",
          marginTop: "1rem",
          marginBottom: isOpen ? "2rem" : 0,
          padding: ".52rem 1rem",
          borderRadius: 30,
          cursor: "pointer",
          userSelect: "none",
          border: `1.5px solid ${theme.colors.primary}`,
          backgroundColor: isOpen
            ? `${theme.colors.primary}20`
            : hover
            ? `${theme.colors.primary}30`
            : "transparent",
          transition: "background-color .2s ease",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "1.2rem",
            fontWeight: 600,
            color: theme.colors.black,
          }}
        >
          My Journey
        </h2>
        <ArrowDownRight
          size={24}
          style={{
            color: theme.colors.primary,
            transition: "transform .2s ease",
            transform: isOpen ? "rotate(-180deg)" : "none",
          }}
        />
        {!isOpen && (
          <span
            style={{
              position: "absolute",
              transform: "translateY(160%)",
              backgroundColor: theme.colors.black,
              color: "#fff",
              padding: ".35rem .6rem",
              borderRadius: 6,
              fontSize: ".85rem",
              fontStyle: "italic",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              opacity: hover ? 1 : 0,
              transition: "opacity .2s ease",
              pointerEvents: "none",
            }}
          >
            Click to explore my education and experience
          </span>
        )}
      </div>

      {/* Timeline */}
      <div
        style={{
          maxHeight: isOpen ? "unset" : 0,
          overflow: "hidden",
          transition: "max-height .4s ease",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          ref={timelineRef}
          style={{
            position: "relative",
            paddingLeft: "1rem",
            paddingTop: isOpen ? "1rem" : 0,
          }}
        >
          {timelineData.map((item, index) =>
            item.type === "header" ? (
              <div
                key={`h-${index}`}
                style={{
                  margin: "1.25rem 0 1.25rem",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: theme.colors.primary,
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

          {/* End marker */}
          {isOpen && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                marginTop: "-.5rem",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: theme.colors.primary,
                  border: `2px solid ${theme.colors.secondary}`,
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  color: theme.colors.text.secondary,
                  fontStyle: "italic",
                }}
              >
                The journey continues…
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
