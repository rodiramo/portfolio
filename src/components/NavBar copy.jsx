import React from "react";
import { useTheme } from "../../../theme.js";
import { MdOutlineWavingHand } from "react-icons/md";
import Me from "../../../components/Me.jsx";

const Header = ({
  name = "Rocio Diaz Ramos",
  title = "Web Designer & Developer",
  description = "",
  headerHeight = "70vh",
  isDarkMode,
  overflowHeight = "150px",
  blurPx = 1, // stronger blur for clear glass effect
}) => {
  const theme = useTheme(isDarkMode);

  // Use fixed, very transparent RGBA colors so it can’t look opaque
  const glassBg = isDarkMode
    ? "rgba(17, 24, 39, 0.28)" // slate-900 @ 28%
    : "rgba(121, 42, 134, 0.42)"; // white @ 12%

  return (
    <div
      className="responsive-container"
      style={{
        maxWidth: "1400px",
        width: "100%",
        height: headerHeight,
        margin: "0 auto",
        borderRadius: 12,
        position: "relative",
        overflow: "visible",
        marginBottom: `-${overflowHeight}`,
      }}
    >
      <header
        style={{
          position: "relative",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          borderRadius: 12,
          background: glassBg, // << translucent
          backdropFilter: `blur(${blurPx}px) `,
          WebkitBackdropFilter: `blur(${blurPx}px))`,
          backgroundClip: "padding-box",
          willChange: "backdrop-filter",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform .3s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "1rem",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                marginTop: "-4rem",
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  margin: "0 0 0.5rem 0",
                  color: theme.colors.text.primary,
                }}
              >
                Hello{" "}
                <span className="span-title">
                  <span className="wave">
                    <MdOutlineWavingHand
                      size={45}
                      color={theme.colors.custom}
                    />
                  </span>
                </span>
                <br />
                <span>
                  I&apos;m {name}{" "}
                  <span style={{ display: "inline-block" }}>
                    <span className="span-title-me">
                      <Me />
                    </span>
                  </span>
                </span>
              </h1>

              <h2
                style={{
                  fontWeight: 500,
                  fontFamily: "Vibur, cursive",
                  fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                  margin: "0 0 0.5rem 0",
                  color: theme.colors.primary,
                }}
              >
                {title}
              </h2>

              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
                  lineHeight: 1.6,
                  color: theme.colors.text.primary,
                  maxWidth: "72ch",
                  paddingInline: "1rem",
                  margin: 0,
                }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(14deg); }
          50% { transform: rotate(-4deg); }
          60% { transform: rotate(10deg); }
        }
        .wave {
          animation: wave 2s ease-in-out infinite;
          transform-origin: 70% 70%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
        .responsive-container { width: 100%; margin-inline: auto; }
        @media (max-width: 768px) { .responsive-container { margin-bottom: -50px !important; } }
        @media (max-width: 480px) { .responsive-container { margin-bottom: -30px !important; } }
      `}</style>
    </div>
  );
};

export default Header;
