// src/components/ProfileSidebar.jsx
import React from "react";
import { Earth, Github, Linkedin, Figma, Mail } from "lucide-react";
import { useTheme } from "../theme.js";

/** Small, self-contained progress ring */
const CircleProgress = ({
  percentage,
  size = 40,
  stroke = 3.5,
  color,
  track,
}) => {
  const radius = (size - stroke * 1) / 2.5;
  const C = 2 * Math.PI * radius;
  const offset = C - (percentage / 100) * C;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={track}
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={C}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
    </div>
  );
};

/** Left column: avatar, name, location, languages + socials */
const ProfileSidebar = ({
  isDarkMode = false,
  role,
  name = "Rocio Diaz Ramos",
  locationText = "Europe/Hamburg",
  avatarSrc = "/assets/pfp.jpeg",
  languages = [],
  socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/rodiramo",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "www.linkedin.com/in/rocio-diaz-ramos",
    },
    { icon: Figma, label: "Figma", href: "https://www.figma.com/@rodira" },
    { icon: Mail, label: "Email", href: "mailto:ivemeyerrocio@example.com" },
  ],
}) => {
  const theme = useTheme(isDarkMode);

  // --- bring over the Skills glass variables ---
  const glassBg = isDarkMode ? "rgba(17,24,39,0.28)" : "rgba(255,255,255,0.42)";
  const borderCol = isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const cardGlass = isDarkMode
    ? "rgba(17,24,39,0.32)"
    : "rgba(255,255,255,0.56)";
  const cardShadow = isDarkMode
    ? "0 12px 28px rgba(0,0,0,0.28)"
    : "0 14px 28px rgba(0,0,0,0.10)";

  return (
    <div
      className="left-column"
      style={{
        // match Skills container styling
        position: "relative",
        background: glassBg,
        border: `1px solid ${borderCol}`,
        borderRadius: 16,
        backdropFilter: "blur(1px) saturate(120%)",
        WebkitBackdropFilter: "blur(1px) saturate(120%)",
        boxShadow: cardShadow,
        overflow: "hidden",
        // component specifics
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        padding: "clamp(20px, 3vw, 32px)",
        flexShrink: 0,
        color: theme.colors.text.primary,
      }}
    >
      {/* Profile Image */}
      <div
        className="profile-image"
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: `4px solid ${theme.colors.dark}`,
          backgroundColor: theme.colors.primary,
          backgroundImage: `url('${avatarSrc}')`,
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      />

      {/* Name + Role */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            marginTop: "0.5rem",
            fontWeight: 600,
            fontSize: "1.25rem",
            color: theme.colors.text.primary,
          }}
        >
          {name}
        </div>
        <div style={{ color: theme.colors.text.secondary }}>{role}</div>
      </div>

      {/* Location */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Earth size={18} style={{ color: theme.colors.primary }} />
          <span style={{ color: theme.colors.black, fontSize: "0.95rem" }}>
            {locationText}
          </span>
        </div>
      </div>

      {/* Languages */}
      <div
        className="languages-section"
        style={{
          textAlign: "center",
          maxWidth: 500,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          // optional inner card feel like Skills cards
          background: cardGlass,
          border: `1px solid ${borderCol}`,
          borderRadius: 14,
          padding: "0.75rem",
        }}
      >
        <div
          className="languages-list"
          style={{
            marginTop: "0.5rem",
            display: "flex",
            gap: "0.5rem",
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {languages.map((lang, idx) => (
            <div
              key={idx}
              className="language-item"
              style={{
                backgroundColor: `${theme.colors.primary}15`,
                display: "flex",
                alignItems: "center",
                borderRadius: 30,
                padding: "0.5rem 0.75rem",
                border: `1px solid ${theme.colors.primary}33`,
              }}
            >
              <CircleProgress
                percentage={lang.proficiency}
                size={25}
                color={theme.colors.primary}
                track={borderCol}
              />
              <div style={{ textAlign: "left", marginLeft: "0.5rem" }}>
                <div
                  style={{
                    color: theme.colors.text.primary,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                  }}
                >
                  {lang.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social icons */}
      <div
        className="socials"
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "0.6rem",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: 320,
        }}
      >
        {socialLinks.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target={s.href?.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              s.href?.startsWith("mailto:") ? undefined : "noopener noreferrer"
            }
            aria-label={s.label}
            title={s.label}
            className="social-btn"
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              border: `1.5px solid ${theme.colors.primary}`,
              background: theme.colors.surface,
              color: theme.colors.primary,
              transition: "all .2s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,.06)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.colors.primary;
              e.currentTarget.style.color = theme.colors.text.inverse;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.colors.surface;
              e.currentTarget.style.color = theme.colors.primary;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06)";
            }}
          >
            <s.icon size={18} />
          </a>
        ))}
      </div>

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 480px) {
          .profile-image { width: 120px !important; height: 120px !important; }
          .languages-section { width: 100% !important; }
          .languages-list { gap: 0.75rem !important; }
          .language-item { padding: 0.25rem 0 !important; gap: 0.75rem !important; }
        }
        @media (max-width: 360px) {
          .profile-image { width: 100px !important; height: 100px !important; }
          .languages-section { max-width: 180px !important; }
          .language-item > div:first-child { display: none !important; }
          .language-item > div:last-child { text-align: center !important; }
        }
      `}</style>
    </div>
  );
};

export default ProfileSidebar;
