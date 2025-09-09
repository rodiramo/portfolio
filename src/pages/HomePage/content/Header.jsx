import React from "react";
import { useTheme } from "../../../theme.js";
import { MdOutlineWavingHand } from "react-icons/md";
import Me from "../../../components/Me.jsx";
// ---- BackgroundLayer.jsx (updated bits) ----
import Spline from "@splinetool/react-spline";

const BackgroundLayer = ({
  backgroundType = "image",
  imageSrc = "/assets/background.png",
  splineUrl,
  overflowHeight = "100px",
}) => {
  const theme = useTheme();
  const base = {
    position: "absolute",
    inset: 0,
    bottom: `-${overflowHeight}`,
    zIndex: 1,
    overflow: "visible",
    pointerEvents: "none", // so header UI stays clickable
  };

  if (backgroundType === "spline" && splineUrl) {
    return (
      <div style={base} className="bg-wrapper bg-spline">
        <div className="spline-holder">
          {/* Responsive inner box that caps at 100% width and keeps aspect ratio */}
          <div className="spline-inner">
            <Spline scene={splineUrl} />
          </div>
        </div>
        <div />
      </div>
    );
  }

  // fallback: responsive image
  return (
    <div style={base} className="bg-wrapper">
      <img
        src={imageSrc}
        alt=""
        className="bg-image"
        loading="eager"
        decoding="async"
      />
      <div
        className="bg-overlay"
        style={{ background: theme.colors.surface }}
      />
    </div>
  );
};

// Main header component
const Header = ({
  name = "Rocio Diaz Ramos",
  title = "Web Designer & Developer",
  description = "",
  headerHeight = "30vh",
  isDarkMode,
  overflowHeight = "100px",
  backgroundType = "image",
  splineUrl,
}) => {
  const theme = useTheme(isDarkMode);

  return (
    <div
      style={{
        maxWidth: "1200px",
        width: "100%",
        height: headerHeight,
        gap: "0.5rem",
        margin: "0.5rem",
        borderRadius: "10px",
        overflow: "visible",
        position: "relative",
        marginBottom: `-${overflowHeight}`,
      }}
      className="responsive-container"
    >
      <BackgroundLayer
        backgroundType={backgroundType}
        splineUrl={splineUrl}
        overflowHeight={overflowHeight}
      />
      {/* Optional overlay is baked into BackgroundLayer now */}
      <header
        className="bg-overlay"
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          borderRadius: "10px",
          background: theme.colors.surface,

          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            zIndex: 4,
          }}
        >
          <div
            style={{
              position: "relative",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Content */}
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "1rem",
                textAlign: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  marginTop: "-4rem",
                  justifyContent: "center",
                }}
              >
                <h1
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4rem)",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    margin: "0 0 0.5rem 0",
                    color: theme.colors.text.primary,
                  }}
                >
                  Hello{" "}
                  <span className="span-title">
                    <span className="wave">
                      {" "}
                      <MdOutlineWavingHand
                        size={45}
                        color={theme.colors.custom}
                      />
                    </span>
                  </span>
                  <br />
                  <span>
                    {" "}
                    I'm {name}{" "}
                    <span style={{ display: "inline-block" }}>
                      {" "}
                      <span className="span-title-me">
                        <Me />
                      </span>
                    </span>
                  </span>
                </h1>

                <h2
                  style={{
                    fontWeight: "500",
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
                    lineHeight: "1.6",
                    color: theme.colors.text.primary,
                    maxWidth: "72ch",
                    paddingInline: "1rem",
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>{" "}
        </div>
      </header>{" "}
      {/* CSS */}
      <style>{`
        /* Base background wrappers */
.bg-wrapper { 
  position: absolute; 
  inset: 0; 
  overflow: visible;
}

/* Fallback image background */
.bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: calc(100% + ${overflowHeight});
  object-fit: cover;          /* fill nicely on all screens */
  object-position: center 10%;/* tweak vertical focus */
  transform: translateZ(0);   /* mobile perf */
}

/* Readability overlay (optional) */
.bg-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;

}
.bg-wrapper .bg-overlay { z-index: 2; }
.bg-spline .bg-overlay { z-index: 0; }
.bg-spline .spline-holder { z-index: 1; }  /* spline on top of overlay */

/* make sure both are positioned so z-index takes effect */
.bg-overlay,
.bg-spline .spline-holder {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
/* === Spline background (responsive, no horizontal overflow) === */
.bg-spline {
  /* Design size of your Spline scene (for aspect ratio only) */
  --art-w: 1400;   /* px */
  --art-h: 900;    /* px */
  /* Lift the scene up a bit behind the text (negative moves up) */
  --lift: -28%;
}

/* Center a responsive box for Spline that never exceeds container width */
.bg-spline .spline-holder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: visible;
  pointer-events: none;  /* keep background non-interactive */
}

/* The responsive box:
   - width <= 100% (so no sideways overflow)
   - keeps aspect-ratio to avoid distortion
   - translated up to sit nicely behind the heading */
.bg-spline .spline-canvas,
.bg-spline canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
  pointer-events: none;
}

/* If your Spline component is *directly* inside .spline-holder,
   size the holder itself responsively. If you wrap Spline in another
   <div class="spline-inner">, you can move these rules to that element. */
.bg-spline .spline-holder {
  width: min(100%, 1100px);
  aspect-ratio: calc(var(--art-w) / var(--art-h));
  left: 50%;
  top: 50%;
  transform: translate(-50%, var(--lift));
  transform-origin: center;
}

/* ---------- Typing/wave misc you already had ---------- */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
.wave {
  animation: wave 2s ease-in-out infinite;
  transform-origin: 70% 70%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  40% { transform: rotate(14deg); }
  50% { transform: rotate(-4deg); }
  60% { transform: rotate(10deg); }
}

/* Responsive container tweaks */
.responsive-container {
  width: 100%;
  margin-inline: auto;
}

/* ---------- Breakpoints ---------- */
@media (max-width: 1200px) {
  .bg-spline .spline-holder { width: min(100%, 980px); }
  .bg-spline { --lift: -26%; }
}

@media (max-width: 1024px) {
  .bg-image { object-position: center 15%; }
  .bg-spline .spline-holder { width: min(100%, 860px); }
  .bg-spline { --lift: -24%; }
}

@media (max-width: 768px) {
  .responsive-container {
    width: 100% !important;
    margin: 0 !important;
    border-radius: 0 !important;
    margin-bottom: -50px !important; /* controlled overlap into next section */
  }
  .bg-image { object-position: center 10%; }
  .bg-spline .spline-holder { width: 92vw; }  /* always <= container width */
  .bg-spline { --lift: -20%; }
}

@media (max-width: 480px) {
  .responsive-container {
    width: 100% !important;
    margin: 0 !important;
    border-radius: 0 !important;
    margin-bottom: -30px !important;
  }
  .bg-image { object-position: center 5%; }
  .bg-spline .spline-holder { width: 100vw; } /* full width on phones */
  .bg-spline { --lift: -16%; }
}

      `}</style>
    </div>
  );
};

const HeaderDemo = ({ isDarkMode = false }) => {
  const theme = useTheme(isDarkMode);
  return (
    <div
      style={{
        height: "70vh",
        color: theme.colors.text.primary,
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header
        headerHeight="70vh"
        isDarkMode={isDarkMode}
        overflowHeight="150px"
        backgroundType="spline"
        splineUrl="https://prod.spline.design/xn1zgQ9bBGzrxogN/scene.splinecode"
      />
    </div>
  );
};

export default HeaderDemo;
