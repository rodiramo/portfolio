import React, { useState, useEffect } from "react";

// Base card component with image background support
const BaseCard = ({
  children,
  buttonConfig = null,
  width,
  height,
  pathData,
  additionalElements = null,
  rotation = 0,
  zIndex = 1,
  marginTop = 0,
  className = "",
  textScale = 1,
  backgroundImage = null,
  imageOpacity = 0.3,
  imageBlendMode = "overlay",
}) => {
  return (
    <div
      className={`svg-card ${className}`}
      style={{
        position: "relative",
        transform: `rotate(${rotation}deg)`,
        zIndex: zIndex,
        marginTop: `${marginTop}px`,
        marginBottom: "1rem",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        width: `${width}px`,
        height: `${height}px`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) translateY(-8px) scale(1.02)`;
        const svg = e.currentTarget.querySelector("svg");
        if (svg) {
          svg.style.filter = "drop-shadow(0 20px 40px rgba(0,0,0,0.15))";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) translateY(0px) scale(1)`;
        const svg = e.currentTarget.querySelector("svg");
        if (svg) {
          svg.style.filter = "drop-shadow(0 8px 24px rgba(0,0,0,0.1))";
        }
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: "block" }}
      >
        <defs>
          {/* Pattern for background image */}
          {backgroundImage && (
            <pattern
              id={`background-pattern-${Math.random()
                .toString(36)
                .substr(2, 9)}`}
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href={backgroundImage}
                x="0"
                y="0"
                width={width}
                height={height}
                preserveAspectRatio="xMidYMid slice"
                opacity={imageOpacity}
                style={{ mixBlendMode: imageBlendMode }}
              />
            </pattern>
          )}
        </defs>

        {/* Card background with optional image */}
        <path
          d={pathData}
          fill={
            backgroundImage
              ? `url(#background-pattern-${Math.random()
                  .toString(36)
                  .substr(2, 9)})`
              : "rgba(2, 52, 106, 0.64)"
          }
          stroke="rgba(0, 0, 0, 0.25)"
          strokeWidth="0"
        />

        {/* Dark overlay for better text contrast */}
        <path
          d={pathData}
          fill="rgba(2, 52, 106, 0.4)"
          stroke="rgba(0, 0, 0, 0.25)"
          strokeWidth="0"
        />

        {/* Card content overlay */}
        <path
          d={pathData}
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />

        {/* Additional elements (like circles) */}
        {additionalElements}
      </svg>

      {/* Alternative: CSS background image approach */}
      {backgroundImage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: imageOpacity,
            mixBlendMode: imageBlendMode,
            clipPath: `path('${pathData}')`,
            zIndex: 1,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: `${24 * textScale}px`,
          left: `${24 * textScale}px`,
          right: buttonConfig ? `${16 * textScale}px` : `${24 * textScale}px`,
          bottom: `${48 * textScale}px`,
          color: "white",
          zIndex: 3,
          fontSize: `${textScale}rem`,
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {children}
      </div>

      {/* Button */}
      {buttonConfig && (
        <button
          style={{
            position: "absolute",
            background: "rgba(255,255,255,0.9)",
            border: "2px solid rgba(255,255,255,1)",
            borderRadius: "30rem",
            padding: "0",
            color: "#6366F1",
            bottom: `${20 * textScale}px`,
            right: `${20 * textScale}px`,
            fontSize: `${1.2 * textScale}rem`,
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s ease",
            zIndex: 10,
            width: `${60 * textScale}px`,
            height: `${40 * textScale}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
          onClick={buttonConfig.onClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,1)";
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.9)";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
          }}
        >
          {buttonConfig.icon}
        </button>
      )}
    </div>
  );
};

// Large screen card component
const LargeCard = ({ children, buttonConfig, backgroundImage, ...props }) => {
  const pathData =
    "M606 16C625.33 16 641 31.67 641 51V234C641 253.33 625.33 269 606 269H396.104C376.774 269 361.104 284.67 361.104 304V320C361.104 339.33 345.433 355 326.104 355H53C33.67 355 18 339.33 18 320V51C18 31.67 33.67 16 53 16H606Z";

  return (
    <BaseCard
      width={667}
      height={376}
      pathData={pathData}
      textScale={1.3}
      buttonConfig={buttonConfig}
      backgroundImage={backgroundImage}
      {...props}
    >
      {children}
    </BaseCard>
  );
};

// Medium screen card component
const MediumCard = ({ children, buttonConfig, backgroundImage, ...props }) => {
  const pathData =
    "M321 16C340.33 16 356 31.67 356 51V250.206C356 269.536 340.33 285.206 321 285.206H239.042C219.768 285.206 204.145 300.83 204.145 320.103V320.103C204.145 339.376 188.521 355 169.248 355H53C33.67 355 18 339.33 18 320V51C18 31.67 33.67 16 53 16H321Z";

  return (
    <BaseCard
      width={380}
      height={376}
      pathData={pathData}
      textScale={1.1}
      buttonConfig={buttonConfig}
      backgroundImage={backgroundImage}
      {...props}
    >
      {children}
    </BaseCard>
  );
};

// Small screen card component
const SmallCard = ({ children, buttonConfig, backgroundImage, ...props }) => {
  const pathData =
    "M210 16C218.284 16 225 22.7157 225 31V93C225 97.9706 220.971 102 216 102H194C178.536 102 166 114.536 166 130V144V144C166 145.074 165.167 146 164.093 146H33C24.7157 146 18 139.284 18 131V31C18 22.7157 24.7157 16 33 16H210Z";

  const additionalElements = (
    <circle
      cx="205.5"
      cy="35.5"
      r="19.5"
      fill="rgba(255,255,255,0.2)"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="1"
    />
  );

  return (
    <BaseCard
      width={248}
      height={160}
      pathData={pathData}
      additionalElements={additionalElements}
      textScale={0.8}
      buttonConfig={buttonConfig}
      backgroundImage={backgroundImage}
      {...props}
    >
      {children}
    </BaseCard>
  );
};

// Hook to detect screen size
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("large");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setScreenSize("large");
      } else if (width >= 768) {
        setScreenSize("medium");
      } else {
        setScreenSize("small");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

// Responsive card that chooses the right variant
const ResponsiveCard = ({
  children,
  buttonConfig,
  variant = "auto",
  backgroundImage,
  ...props
}) => {
  const screenSize = useScreenSize();

  const getCardComponent = () => {
    if (variant !== "auto") {
      switch (variant) {
        case "large":
          return LargeCard;
        case "medium":
          return MediumCard;
        case "small":
          return SmallCard;
        default:
          return MediumCard;
      }
    }

    switch (screenSize) {
      case "large":
        return LargeCard;
      case "medium":
        return MediumCard;
      case "small":
        return SmallCard;
      default:
        return MediumCard;
    }
  };

  const CardComponent = getCardComponent();

  return (
    <CardComponent
      buttonConfig={buttonConfig}
      backgroundImage={backgroundImage}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

// Demo component with background images
const BackgroundImageDemo = () => {
  // Sample images for demonstration (using placeholder service)
  const sampleImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
  ];

  const cardData = [
    {
      title: "Mountain Landscapes",
      description:
        "Explore breathtaking mountain vistas and alpine adventures with our curated collection.",
      icon: "🏔️",
      action: () => console.log("Mountains clicked"),
    },
    {
      title: "Ocean Views",
      description:
        "Dive into the serene beauty of ocean scenes and coastal environments.",
      icon: "🌊",
      action: () => console.log("Ocean clicked"),
    },
    {
      title: "Urban Exploration",
      description:
        "Discover the dynamic energy and architectural wonders of city landscapes.",
      icon: "🏙️",
      action: () => console.log("Urban clicked"),
    },
    {
      title: "Forest Trails",
      description:
        "Immerse yourself in the tranquil beauty of woodland paths and natural forests.",
      icon: "🌲",
      action: () => console.log("Forest clicked"),
    },
    {
      title: "Desert Wandering",
      description:
        "Experience the vast beauty and solitude of desert landscapes.",
      icon: "🏜️",
      action: () => console.log("Desert clicked"),
    },
    {
      title: "Countryside",
      description:
        "Enjoy peaceful rural scenes and pastoral beauty in the countryside.",
      icon: "🌾",
      action: () => console.log("Countryside clicked"),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#0f0f23",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "2.5rem",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Cards with Background Images
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            marginBottom: "3rem",
            fontSize: "1.1rem",
          }}
        >
          Beautiful landscape backgrounds clipped to your custom SVG shapes
        </p>

        {/* Cards with background images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {cardData.map((card, index) => (
            <ResponsiveCard
              key={index}
              backgroundImage={sampleImages[index]}
              imageOpacity={0.6}
              imageBlendMode="overlay"
              buttonConfig={{
                icon: card.icon,
                onClick: card.action,
              }}
              rotation={index % 2 === 0 ? 1 : -1}
              zIndex={6 - index}
            >
              <h3
                style={{
                  fontWeight: "700",
                  fontSize: "1.5em",
                  marginBottom: "0.8rem",
                  letterSpacing: "-0.02em",
                  margin: "0 0 0.8rem 0",
                  textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: "1em",
                  lineHeight: "1.6",
                  margin: 0,
                  textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                  fontWeight: "500",
                }}
              >
                {card.description}
              </p>
            </ResponsiveCard>
          ))}
        </div>

        {/* Different blend modes showcase */}
        <h2
          style={{
            color: "white",
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Different Blend Modes
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <ResponsiveCard
            variant="medium"
            backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
            imageOpacity={0.8}
            imageBlendMode="normal"
            buttonConfig={{
              icon: "📷",
              onClick: () => console.log("Normal blend clicked"),
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1.4em",
                marginBottom: "0.8rem",
                letterSpacing: "-0.02em",
                margin: "0 0 0.8rem 0",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              Normal Blend
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.95)",
                fontSize: "0.95em",
                lineHeight: "1.5",
                margin: 0,
                textShadow: "0 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              Standard image overlay with normal blend mode.
            </p>
          </ResponsiveCard>

          <ResponsiveCard
            variant="medium"
            backgroundImage="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop"
            imageOpacity={0.7}
            imageBlendMode="multiply"
            buttonConfig={{
              icon: "🎨",
              onClick: () => console.log("Multiply blend clicked"),
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1.4em",
                marginBottom: "0.8rem",
                letterSpacing: "-0.02em",
                margin: "0 0 0.8rem 0",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              Multiply Blend
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.95)",
                fontSize: "0.95em",
                lineHeight: "1.5",
                margin: 0,
                textShadow: "0 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              Darker, more dramatic effect with multiply blend.
            </p>
          </ResponsiveCard>

          <ResponsiveCard
            variant="medium"
            backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
            imageOpacity={0.5}
            imageBlendMode="screen"
            buttonConfig={{
              icon: "✨",
              onClick: () => console.log("Screen blend clicked"),
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1.4em",
                marginBottom: "0.8rem",
                letterSpacing: "-0.02em",
                margin: "0 0 0.8rem 0",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              Screen Blend
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.95)",
                fontSize: "0.95em",
                lineHeight: "1.5",
                margin: 0,
                textShadow: "0 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              Lighter, more ethereal effect with screen blend.
            </p>
          </ResponsiveCard>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImageDemo;
