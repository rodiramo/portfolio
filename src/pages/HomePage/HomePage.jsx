import { useTheme } from "../../theme.js";
import { MdOutlineWavingHand } from "react-icons/md";
import Me from "../../components/Me.jsx";
import { BriefcaseBusiness, MapPinHouse, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const Chip = ({ theme, children, style }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: "0.85rem",
      lineHeight: 1,
      background: theme.isDark
        ? "rgba(255,255,255,0.06)"
        : "rgba(15,23,42,0.06)",
      border: theme.isDark
        ? "1px solid rgba(255,255,255,0.14)"
        : "1px solid rgba(15,23,42,0.12)",
      color: theme.colors.text.primary,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </span>
);

const Header = ({
  name,
  title,
  description,
  headerHeight = "65vh",
  isDarkMode,
  overflowHeight = "120px",
}) => {
  const theme = useTheme(isDarkMode);
  const { t } = useTranslation("home");

  const greeting = t("hero.greeting", { defaultValue: "Hello" });
  const who = t("hero.who", { defaultValue: "I'm " });
  const personName =
    name ?? t("hero.name", { defaultValue: "Rocio Diaz Ramos" });
  const role =
    title ?? t("hero.role", { defaultValue: "Web Designer & Developer" });
  const desc = description ?? t("hero.description", { defaultValue: "" });

  const chipLocation = t("chips.location", { defaultValue: "Hamburg, DE" });
  const chipAvailable = t("chips.available", { defaultValue: "Available" });

  const borderCol = isDarkMode ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";

  const cardShadow = isDarkMode
    ? "0 12px 28px rgba(0,0,0,0.28)"
    : "0 14px 28px rgba(0,0,0,0.10)";

  const glow = theme.isDark
    ? "radial-gradient(1000px 300px at 50% 40%, rgba(124,58,237,0.18), transparent 60%)"
    : "radial-gradient(1000px 280px at 50% 40%, rgba(139,92,246,0.15), transparent 60%)";

  return (
    <div
      className="responsive-container"
      style={{
        position: "relative",
        maxWidth: 1500,
        width: "100%",
        height: headerHeight,
        margin: "0 auto",
        marginTop: 16,
        padding: "0 12px",
        overflow: "visible",
        marginBottom: `-${overflowHeight}`,
      }}
    >
      {/* Glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          background: glow,
          filter: "blur(6px)",
          zIndex: 0,
        }}
      />

      {/* Glass */}
      <header
        style={{
          position: "relative",
          height: "50vh",
          minHeight: 360,
          display: "flex",
          border: `1px solid ${borderCol}`,
          borderRadius: 16,
          backdropFilter: "blur(1px) saturate(120%)",
          WebkitBackdropFilter: "blur(1px) saturate(120%)",
          boxShadow: cardShadow,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            padding: "16px",
            display: "grid",
            gap: 12,
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          {/* Chips */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chip theme={theme} style={{ background: "#875bff22" }}>
              <MapPinHouse size={16} /> {chipLocation}
            </Chip>
            <Chip theme={theme} style={{ background: "#bbff5b22" }}>
              <BriefcaseBusiness size={16} /> {chipAvailable}
            </Chip>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "6px 0 6px 0",
              color: theme.colors.text.primary,
              letterSpacing: "-0.02em",
            }}
          >
            {greeting}{" "}
            <span style={{ display: "inline-block" }}>
              <span className="wave span-title">
                <MdOutlineWavingHand size={42} color={theme.colors.custom} />
              </span>
            </span>
            <br />
            {who} {personName}{" "}
            <span style={{ display: "inline-block" }}>
              <span
                className="span-title-me"
                style={{ background: theme.colors.light }}
              >
                <Me isDarkMode={isDarkMode} />
              </span>
            </span>
          </h1>

          {/* Role */}
          <h2 style={{ color: theme.colors.text.primary }}>{role}</h2>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              zIndex: 4,
              bottom: -28,
              left: "50%",
              transform: "translateX(-50%)",
              background: "transparent",
              border: "none",
              display: "grid",
              placeItems: "center",
              gap: 6,
            }}
            className="scroll-indicator"
          >
            <div
              style={{
                width: 26,
                height: 40,
                borderRadius: 13,
                border: `2px solid ${theme.colors.primary}50`,
                display: "grid",
                placeItems: "center",
                position: "relative",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
              }}
            >
              <ChevronDown
                size={15}
                strokeWidth={3}
                color={theme.colors.primary}
                className="scroll-chevron"
                style={{ opacity: 0.9 }}
              />
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
              lineHeight: 1.6,
              color: theme.colors.text.primary,
              maxWidth: "72ch",
              margin: 0,
              opacity: 0.9,
              paddingInline: 8,
            }}
          >
            {desc}
          </p>
        </div>
      </header>

      {/* Micro CSS (animations) */}

      <style>{` 
      
@keyframes floatDown {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(6px); }
}
.scroll-chevron {
  animation: floatDown 1.6s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  50%      { transform: rotate(12deg); }
}

.wave { 
  animation: wave 2s ease-in-out infinite; 
  transform-origin: 70% 70%; 
  display: inline-flex; 
  align-items: center; 
  justify-content: center; 
}

@keyframes tilt {
  0%, 100% { transform: rotate(0deg); }
  50%      { transform: rotate(8deg); }
}

.span-title-me {
  animation: tilt 3s ease-in-out infinite;
  transform-origin: 20% 20%;
}
.responsive-container {
  width: 100%;
  margin-inline: auto;
}

@media (max-width: 768px) {
  .responsive-container {
    margin-bottom: -54px !important;
    height: 60vh !important;
  }
}

@media (max-width: 480px) {
  .responsive-container {
    margin-bottom: -34px !important;
  }
}
`}</style>
    </div>
  );
};

export default Header;
