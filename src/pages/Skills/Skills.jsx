// src/pages/Skills/Skills.jsx
import React, { useState, useMemo } from "react";
import { useTheme } from "../../theme.js";
import { Code2 } from "lucide-react";

/* --- CDN logo sources (ordered; will try next if one fails) --- */
const LOGO_SOURCES = {
  "React.js": [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.simpleicons.org/react",
  ],
  "Vue.js": [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    "https://cdn.simpleicons.org/vuedotjs",
  ],
  "HTML5/CSS3": [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "https://cdn.simpleicons.org/html5",
  ],
  JavaScript: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.simpleicons.org/javascript",
  ],
  "PWA Development": [
    "https://cdn.simpleicons.org/pwa",
    "https://cdn.simpleicons.org/webcomponentsdotorg",
  ],
  WordPress: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    "https://cdn.simpleicons.org/wordpress",
  ],
  "Node.js": [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "https://cdn.simpleicons.org/nodedotjs",
  ],
  "PHP Laravel": [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
    "https://cdn.simpleicons.org/laravel",
  ],
  MongoDB: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "https://cdn.simpleicons.org/mongodb",
  ],
  MySQL: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    "https://cdn.simpleicons.org/mysql",
  ],
  "API Integration": [
    "https://cdn.simpleicons.org/postman",
    "https://cdn.simpleicons.org/openapiinitiative",
  ],
  Firebase: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    "https://cdn.simpleicons.org/firebase",
  ],
  Figma: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    "https://cdn.simpleicons.org/figma",
  ],
  "Adobe Photoshop": [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
    "https://cdn.simpleicons.org/adobephotoshop",
  ],
  "Adobe Illustrator": [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
    "https://cdn.simpleicons.org/adobeillustrator",
  ],
  "Content Creation": [
    "https://cdn.simpleicons.org/adobecreativecloud",
    "https://cdn.simpleicons.org/canva",
  ],
  Spline: [
    "https://cdn.simpleicons.org/spline",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  ],
  Framer: ["https://cdn.simpleicons.org/framer"],
};

function Logo({ name, size = 18, accent }) {
  const [index, setIndex] = useState(0);
  const srcs = LOGO_SOURCES[name] || [];
  const src = srcs[index];

  if (!src) {
    return (
      <span
        aria-hidden
        title={name}
        style={{
          width: size,
          height: size,
          display: "inline-grid",
          placeItems: "center",
          borderRadius: "50%",
          border: `1.5px solid ${accent || "#999"}`,
          fontSize: size * 0.55,
          lineHeight: 1,
          color: accent || "#999",
        }}
      >
        {name?.[0] || "?"}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setIndex((i) => i + 1)}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}

const Skills = ({ isDarkMode = false }) => {
  const theme = useTheme(isDarkMode);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hovered, setHovered] = useState(null);

  const categories = useMemo(
    () => [
      {
        id: "frontend",
        title: "Web Development",
        accent: theme.colors.primary,
        skills: [
          {
            name: "React.js",
            level: 85,
            description: "Component-based development",
          },
          {
            name: "Vue.js",
            level: 75,
            description: "Progressive JavaScript framework",
          },
          {
            name: "HTML5/CSS3",
            level: 90,
            description: "Responsive web layouts",
          },
          {
            name: "JavaScript",
            level: 80,
            description: "Interactive web experiences",
          },
          {
            name: "PWA Development",
            level: 80,
            description: "Progressive Web Apps",
          },
          {
            name: "WordPress",
            level: 75,
            description: "CMS customization & theming",
          },
        ],
      },
      {
        id: "backend",
        title: "Backend & APIs",
        accent: theme.colors.dark,
        skills: [
          { name: "Node.js", level: 85, description: "Server-side JavaScript" },
          {
            name: "PHP Laravel",
            level: 80,
            description: "Web application framework",
          },
          {
            name: "MongoDB",
            level: 90,
            description: "NoSQL modeling & indexing",
          },
          {
            name: "MySQL",
            level: 75,
            description: "Relational schema & queries",
          },
          {
            name: "API Integration",
            level: 85,
            description: "OAuth, payments, 3rd-party APIs",
          },
          {
            name: "Firebase",
            level: 70,
            description: "Auth, Firestore, Functions",
          },
        ],
      },
      {
        id: "design",
        title: "Design & Creative",
        accent: theme.colors.accent1,
        skills: [
          {
            name: "Figma",
            level: 90,
            description: "UI/UX design & prototyping",
          },
          {
            name: "Adobe Photoshop",
            level: 85,
            description: "Digital graphics & banners",
          },
          {
            name: "Adobe Illustrator",
            level: 80,
            description: "Vector graphics & logos",
          },
          {
            name: "Content Creation",
            level: 80,
            description: "Marketing & social assets",
          },
          { name: "Spline", level: 65, description: "3D scenes & animations" },
          {
            name: "Framer",
            level: 55,
            description: "Interactive prototyping (learning)",
          },
        ],
      },
    ],
    [theme]
  );

  const active = categories[activeCategory];

  // frosted section wrapper (to match Home/About)
  const glassBg = isDarkMode ? "rgba(17,24,39,0.28)" : "rgba(255,255,255,0.42)";
  const borderCol = isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const cardGlass = isDarkMode
    ? "rgba(17,24,39,0.32)"
    : "rgba(255,255,255,0.56)";
  const cardShadow = isDarkMode
    ? "0 12px 28px rgba(0,0,0,0.28)"
    : "0 14px 28px rgba(0,0,0,0.10)";

  const containerStyle = {
    maxWidth: 1200,
    width: "100%",
    margin: "0 auto",
    color: theme.colors.text.primary,
  };

  const sectionWrapStyle = {
    background: glassBg,
    border: `1px solid ${borderCol}`,
    borderRadius: 16,
    backdropFilter: "blur(1px) saturate(120%)",
    WebkitBackdropFilter: "blur(1px) saturate(120%)",
    boxShadow: cardShadow,
    padding: "clamp(16px, 2.2vw, 22px)",
  };

  const chipStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px",
    borderRadius: 9999,
    background: `${theme.colors.primary}10`,
    border: `1px solid ${theme.colors.primary}33`,
    color: theme.colors.text.primary,
    marginBottom: "0.75rem",
  };

  const chipIconStyle = {
    display: "inline-grid",
    placeItems: "center",
    width: 22,
    height: 22,
    borderRadius: 9999,
    backgroundColor: `${theme.colors.primary}22`,
    border: `1px solid ${theme.colors.primary}55`,
  };

  const subtitleStyle = {
    marginTop: ".35rem",
    marginBottom: "1rem",
    fontSize: "clamp(.95rem, 1.8vw, 1.05rem)",
    maxWidth: "60ch",
    color: theme.colors.text.secondary,
  };

  const tabsWrapStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    marginBottom: "1rem",
    overflowX: "auto",
  };

  const tabStyle = (isActive, accent) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: ".55rem .9rem",
    borderRadius: 999,
    border: `1.5px solid ${isActive ? `${accent}` : borderCol}`,
    background: isActive ? `${accent}` : cardGlass,
    color: isActive ? theme.colors.text.inverse : theme.colors.text.primary,
    fontWeight: 800,
    fontSize: ".92rem",
    cursor: "pointer",
    transition:
      "transform .15s ease, box-shadow .15s ease, background .2s ease",
    boxShadow: isActive ? "0 6px 14px rgba(0,0,0,0.12)" : "none",
  });

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: ".9rem",
  };

  const cardStyle = {
    border: `1px solid ${borderCol}`,
    borderRadius: 14,
    padding: ".9rem",
    background: cardGlass,
    backdropFilter: "blur(8px) saturate(120%)",
    WebkitBackdropFilter: "blur(8px) saturate(120%)",
    transition:
      "transform .15s ease, box-shadow .15s ease, background .15s ease",
  };

  const headRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: ".6rem",
    marginBottom: ".6rem",
  };

  const progressTrackStyle = {
    width: "100%",
    height: 6,
    background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: ".55rem",
  };

  const dotRowStyle = {
    display: "flex",
    justifyContent: "center",
    gap: ".5rem",
    marginTop: "1rem",
  };

  const dotStyle = (on) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: on ? active.accent : borderCol,
    border: "none",
    opacity: 0.9,
    cursor: "pointer",
  });

  return (
    <div style={containerStyle}>
      <section style={sectionWrapStyle}>
        {/* Chip */}
        <div style={chipStyle}>
          <span style={chipIconStyle}>
            <Code2 size={14} color={theme.colors.primary} />
          </span>
          <span
            style={{
              fontSize: ".9rem",
              fontWeight: 800,
              letterSpacing: ".02em",
            }}
          >
            Skills
          </span>
        </div>

        {/* Title + subtitle */}
        <p style={subtitleStyle}>
          Explore my expertise across development and design
        </p>

        {/* Tabs */}
        <nav style={tabsWrapStyle} aria-label="Skill categories">
          {categories.map((cat, i) => {
            const isActive = i === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(i)}
                style={tabStyle(isActive, cat.accent)}
                onMouseEnter={(e) =>
                  !isActive &&
                  (e.currentTarget.style.transform = "translateY(-1px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {cat.title}
              </button>
            );
          })}
        </nav>

        {/* Panel header (mini icon + title) */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".6rem",
            paddingBottom: ".6rem",
            marginBottom: ".6rem",
          }}
        >
          <Logo
            name={active.skills[0]?.name || "React.js"}
            size={20}
            accent={active.accent}
          />
          <h3
            style={{
              margin: 0,
              fontSize: "1.12rem",
              fontWeight: 800,
              color: theme.colors.text.primary,
            }}
          >
            {active.title}
          </h3>
        </header>

        {/* Skills Grid */}
        <div style={gridStyle}>
          {active.skills.map((s) => (
            <div
              key={s.name}
              style={cardStyle}
              onMouseEnter={(e) => {
                setHovered(s.name);
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,.12)";
                e.currentTarget.style.background = isDarkMode
                  ? "rgba(17,24,39,0.38)"
                  : "rgba(255,255,255,0.72)";
              }}
              onMouseLeave={(e) => {
                setHovered(null);
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = cardGlass;
              }}
            >
              <div style={headRowStyle}>
                <Logo name={s.name} size={18} accent={active.accent} />
                <span style={{ fontWeight: 800, fontSize: ".95rem" }}>
                  {s.name}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: ".85rem",
                    opacity: 0.9,
                  }}
                >
                  {s.level}%
                </span>
              </div>

              <div
                role="progressbar"
                aria-valuenow={s.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${s.name} proficiency`}
                style={progressTrackStyle}
              >
                <div
                  style={{
                    width: `${s.level}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${active.accent}, ${active.accent} 60%)`,
                    borderRadius: 999,
                    transition: "width 800ms ease",
                  }}
                />
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: ".85rem",
                  color: theme.colors.text.secondary,
                  opacity: hovered === s.name ? 0.95 : 0.78,
                  transition: "opacity .15s ease",
                }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pager Dots */}
        <div style={dotRowStyle}>
          {categories.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to ${categories[i].title}`}
              onClick={() => setActiveCategory(i)}
              style={dotStyle(i === activeCategory)}
            />
          ))}
        </div>
      </section>

      {/* micro CSS */}
      <style>{`
        @media (max-width: 560px) {
          /* tighten grid on phones */
          section > div[style*="grid"] { gap: .75rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Skills;
