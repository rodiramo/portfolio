import React from "react";
import { useTheme } from "../../../theme.js";
import { MdOutlineWavingHand } from "react-icons/md";
import Me from "../../../components/Me.jsx";

// Main header component
const Header = ({
  name = "Rocio Diaz Ramos",
  title = "Web Designer & Developer",
  description = "",
  headerHeight = "30vh",
  isDarkMode = false,
  overflowHeight = "100px",
}) => {
  const theme = useTheme(isDarkMode);

  return (
    <div
      style={{
        width: "98%",
        height: headerHeight,
        gap: "0.5rem",
        margin: "0.5rem",
        borderRadius: "10px",
        overflow: "visible", // Changed from "hidden" to "visible"
        position: "relative",
        marginBottom: `-${overflowHeight}`, // Negative margin to pull content up
      }}
      className="responsive-container"
    >
      {/* Background layer that extends beyond container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: `-${overflowHeight}`, // Extend background beyond container
          backgroundImage: "url('/assets/background.png')",
          backgroundSize: "150rem",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          borderRadius: "10px 10px 0 0", // Only round top corners
          zIndex: 1,
        }}
      />

      {/* Optional: Overlay for better text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "10px",
          zIndex: 2,
        }}
      />

      {/* Content Overlay */}
      <header
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          borderRadius: "10px",
          alignItems: "center",

          zIndex: 3,
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
                alignContent: "center",
                padding: "1rem",
                textAlign: "center",
                width: "100%",
                height: "100%",
              }}
            >
              {/* Main content */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <h1
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4rem)",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    margin: "0 0 0.5rem 0",
                    color: theme.colors.black,
                  }}
                >
                  Hello{" "}
                  <span className="span-title">
                    <span className="wave">
                      {"         "}
                      <MdOutlineWavingHand size={45} />
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
                    fontSize: "clamp(2rem, 2vw, 2rem)",
                    margin: "0 0 0.5rem 0",
                    color: theme.colors.primary,
                  }}
                >
                  {title}
                </h2>

                <p
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
                    lineHeight: "1.6",
                    color: theme.colors.text.primary,
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CSS for responsive behavior and animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .wave {
          animation: wave 2s ease-in-out infinite;
          transform-origin: 70% 70%;
          display: flex;
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

        @media (max-width: 768px) {
          .responsive-container {
            width: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
            margin-bottom: -50px !important; /* Smaller overflow on mobile */
          }
        }

        @media (max-width: 480px) {
          .responsive-container {
            width: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
            margin-bottom: -30px !important; /* Even smaller overflow on small mobile */
          }
        }
      `}</style>
    </div>
  );
};

// Updated Demo component with theme support
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
        fullWidth={true}
        overflowHeight="150px" // Customize how much it overflows
        backgroundImage="/your-3d-scene-export.png"
      />
    </div>
  );
};

export default HeaderDemo;
