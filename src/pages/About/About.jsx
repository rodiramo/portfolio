import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Github,
  Linkedin,
  Figma,
  Mail,
  ArrowUpLeft,
  Earth,
  ArrowDownRight,
  GraduationCap,
  Briefcase,
} from "lucide-react";

import { useTheme } from "../../theme.js";

const TimelineItem = ({ item, index, type, isVisible, isDarkMode }) => {
  const theme = useTheme(isDarkMode);

  return (
    <div
      className={`timeline-item ${isVisible ? "visible" : ""}`}
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
      {/* Timeline Line and Dot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: theme.colors.primary,
            border: `3px solid ${theme.colors.secondary}`,
            boxShadow: `0 0 0 3px ${theme.colors.primary}20`,
            zIndex: 2,
            transform: isVisible ? "scale(1)" : "scale(0.5)",
            transition: "transform 0.4s ease-out",
            transitionDelay: `${index * 0.2 + 0.2}s`,
          }}
        />
        {/* Line */}
        <div
          style={{
            width: "2px",
            height: "100px",
            backgroundColor: theme.colors.border,
            marginTop: "0.5rem",
            transform: isVisible ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
            transition: "transform 0.5s ease-out",
            transitionDelay: `${index * 0.2 + 0.4}s`,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          backgroundColor: theme.colors.light,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: "15px",
          padding: "1.5rem",
          flex: 1,
          boxShadow: isVisible
            ? "0 4px 20px rgba(0,0,0,0.08)"
            : "0 2px 10px rgba(0,0,0,0.05)",
          transition: "box-shadow 0.4s ease-out",
          transitionDelay: `${index * 0.2 + 0.1}s`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.5rem",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: theme.colors.text.primary,
              margin: "0",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
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
              fontSize: "0.9rem",
              color: theme.colors.primary,
              fontWeight: "500",
              backgroundColor: theme.colors.secondary,
              padding: "0.25rem 0.75rem",
              borderRadius: "15px",
            }}
          >
            {item.period}
          </span>
        </div>
        <p
          style={{
            fontSize: "1rem",
            color: theme.colors.primary,
            fontWeight: "500",
            margin: "0.5rem 0",
          }}
        >
          {item.institution || item.company}
        </p>
        <p
          style={{
            fontSize: "0.95rem",
            color: theme.colors.text.secondary,
            lineHeight: "1.5",
            margin: "0",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
};

const About = ({ isDarkMode = false }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false); // Added missing state
  const timelineRef = useRef(null);
  const theme = useTheme(isDarkMode);

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Figma, label: "Figma", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:your.email@example.com" },
  ];

  const languages = [
    { name: "Español", proficiency: 100, level: "Native" },
    { name: "English", proficiency: 90, level: "Fluent" },
    { name: "Deutsch", proficiency: 75, level: "Advanced" },
  ];

  const studies = [
    {
      degree: "Tertiary Education in Web Development and Web Design",
      institution: "Davinci Institute of Technology",
      period: "2021 - 2025",
      description:
        "Specialized in web development, marketing strategies, and user experience design.",
    },
    {
      degree: "Frontend Development Basics Bootcamp",
      institution: "SheCodes",
      period: "2021",
      description: "Intensive program covering HTML, JavaScript, and CSS.",
    },
  ];

  const experience = [
    {
      position: "Freelance Web Designer",
      company: "Jumping",
      period: "2024",
      description:
        "Commissioned to design and develop a custom website, focusing on user experience and modern design principles.",
    },
    {
      position: "Volunteer Web Designer",
      company: "Robol Solutions (Startup)",
      period: "2023 - 2024",
      description:
        "Volunteered as web designer for an early-stage startup, contributing to their digital presence and brand identity through web design.",
    },
    {
      position: "Student Developer",
      company: "Academic Projects",
      period: "2021 - 2025",
      description:
        "Developed various web applications and projects as part of coursework, including responsive websites, interactive interfaces, and collaborative team projects.",
    },
  ];

  // All timeline items combined and sorted by year (most recent first)
  const timelineData = [
    ...studies.map((item) => ({ ...item, type: "education" })),
    ...experience.map((item) => ({ ...item, type: "experience" })),
  ].sort((a, b) => {
    const yearA = parseInt(a.period.split(" - ")[0] || a.period);
    const yearB = parseInt(b.period.split(" - ")[0] || b.period);
    return yearB - yearA;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const timelineItems = timelineRef.current?.querySelectorAll(
      ".timeline-item-wrapper"
    );
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Circle progress component
  const CircleProgress = ({ percentage, size = 40 }) => {
    const radius = (size - 4) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.colors.border}
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.colors.primary}
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.5s ease-in-out",
            }}
          />
        </svg>
      </div>
    );
  };

  // Toggle function for timeline
  const toggleTimeline = () => {
    setIsTimelineExpanded(!isTimelineExpanded);
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.secondary,
        minHeight: "100vh",
        paddingTop: "15rem",
        maxWidth: "1200px",
        width: "100%",
        display: "flex",
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        {/* Main Layout - Two Columns */}
        <div
          className="main-layout"
          style={{
            display: "flex",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column */}
          <div
            className="left-column"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "20px",
              paddingLeft: "3rem",
              paddingRight: "3rem",
              flexShrink: 0,
            }}
          >
            {/* Profile Image */}
            <div
              className="profile-image"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: `4px solid ${theme.colors.accent1}`,
                backgroundColor: theme.colors.primary,
                backgroundImage: "url('/assets/pfp.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "left",
              }}
            />
            {/* Name */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  marginTop: "0.5rem",
                  fontWeight: "600",
                  fontSize: "1.25rem",
                  color: theme.colors.text.primary,
                }}
              >
                Rocio Diaz Ramos
              </div>
            </div>
            {/* Location */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <Earth size={18} style={{ color: theme.colors.primary }} />
                <span
                  style={{
                    color: theme.colors.black,
                    fontSize: "0.95rem",
                  }}
                >
                  Europe/Hamburg
                </span>
              </div>
            </div>

            {/* Languages */}
            <div
              className="languages-section"
              style={{
                textAlign: "center",
                borderTop: `1px solid ${theme.colors.border}`,
                paddingTop: "1rem",
                maxWidth: "250px",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div
                className="languages-list"
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexDirection: "row-reverse",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className="language-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.5rem 0",
                    }}
                  >
                    <CircleProgress percentage={lang.proficiency} size={40} />
                    <div style={{ textAlign: "left", flex: 1 }}>
                      <div
                        style={{
                          color: theme.colors.text.primary,
                          fontSize: "0.9rem",
                          fontWeight: "500",
                        }}
                      >
                        {lang.name}
                      </div>
                      <div
                        style={{
                          color: theme.colors.text.secondary,
                          fontSize: "0.75rem",
                        }}
                      >
                        {lang.level}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            className="right-column"
            style={{ flex: 1, paddingRight: "3rem" }}
          >
            {/* Title */}
            <h1
              className="main-title"
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                fontFamily: "Vibur, cursive",
                margin: "0 0 0.5rem 0",
                paddingBottom: "1rem",
                borderBottom: `1px solid ${theme.colors.border}`,
                color: theme.colors.text.primary,
                lineHeight: "1.1",
              }}
            >
              About Me
            </h1>

            {/* About Description */}
            <div className="about-description">
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.7",
                  paddingTop: "1rem",
                  color: theme.colors.text.primary,
                  margin: "0",
                  marginBottom: "1rem",
                }}
              >
                I'm a{" "}
                <span
                  style={{ color: theme.colors.primary, fontWeight: "600" }}
                >
                  Hamburg-based web developer and designer
                </span>{" "}
                with a passion for turning complex challenges into simple,
                elegant digital solutions. I specialize in building modern web
                interfaces and interactive experiences that combine creativity
                with{" "}
                <span
                  style={{ color: theme.colors.primary, fontWeight: "600" }}
                >
                  clean, functional design
                </span>
                . <br />
                <br /> I'm always eager to learn, improve my skills, and take on
                new challenges. What drives me most is{" "}
                <span
                  style={{ color: theme.colors.primary, fontWeight: "600" }}
                >
                  solving problems
                </span>{" "}
                and creating digital experiences that not only look beautiful
                but also work seamlessly.
              </p>
            </div>
            {/* Social Links */}
            <div
              className="social-links"
              style={{
                display: "flex",
                flexWrap: "wrap",
                paddingTop: "1rem",
                paddingBottom: "3rem",
                gap: "1rem",
              }}
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderRadius: "30px",
                    backgroundColor: theme.colors.light,
                    border: `1.5px solid ${theme.colors.dark}`,
                    padding: "0.25rem 1rem",
                    color: theme.colors.black,
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <link.icon size={18} />
                  {link.label}
                </a>
              ))}
            </div>
            {/* Timeline Section */}
            <div
              style={{
                paddingTop: "1rem",
                borderRadius: "4px",
              }}
            >
              {/* Timeline Header with Expand/Collapse Button */}
              <div
                onClick={toggleTimeline}
                style={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  padding: "0.52rem 1rem",
                  borderRadius: "30px",
                  width: "fit-content",
                  border: isTimelineExpanded
                    ? "none"
                    : "1.5px solid transparent",
                  justifyContent: "flex-start",
                  gap: "0.75rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginBottom: isTimelineExpanded ? "3rem" : "0",
                  backgroundColor: isTimelineExpanded
                    ? theme.colors.primary + "20" // light tint when expanded
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isTimelineExpanded
                    ? theme.colors.primary // solid when expanded
                    : theme.colors.primary + "30"; // lighter tint when collapsed
                  e.currentTarget.querySelector("svg").style.color =
                    theme.colors.black; // icon to black
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isTimelineExpanded
                    ? theme.colors.primary + "20"
                    : "transparent";
                  e.currentTarget.querySelector("svg").style.color =
                    theme.colors.primary; // reset icon
                }}
              >
                <h2
                  className="journey-button"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    color: theme.colors.black,
                    margin: "0",
                  }}
                >
                  My Journey
                </h2>
                <ArrowDownRight
                  size={24}
                  style={{
                    color: theme.colors.primary,
                    transition: "transform 0.3s ease, color 0.3s ease",
                    transform: isTimelineExpanded
                      ? "rotate(-180deg)"
                      : "rotate(0deg)",
                  }}
                />
                {!isTimelineExpanded && (
                  <div
                    className="journey-tooltip"
                    style={{
                      position: "absolute",
                      top: "120%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: theme.colors.black,
                      color: "white",
                      padding: "0.4rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                      whiteSpace: "nowrap",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      transition: "opacity 0.3s ease",
                      opacity: 0, // default hidden
                      pointerEvents: "none",
                    }}
                  >
                    Click to explore my educational background and work
                    experience
                  </div>
                )}
              </div>

              {/* Expandable Timeline Container */}
              <div
                style={{
                  maxHeight: isTimelineExpanded ? "none" : "0",
                  overflow: "hidden",
                  transition: "all 0.4s ease-in-out",
                  opacity: isTimelineExpanded ? 1 : 0,
                }}
              >
                <div
                  ref={timelineRef}
                  style={{
                    position: "relative",
                    paddingLeft: "1rem",
                    paddingTop: isTimelineExpanded ? "1rem" : "0",
                  }}
                >
                  {timelineData.map((item, index) => (
                    <div
                      key={index}
                      className="timeline-item-wrapper"
                      data-index={index}
                    >
                      <TimelineItem
                        item={item}
                        index={index}
                        type={item.type}
                        isVisible={
                          visibleItems.has(index) && isTimelineExpanded
                        }
                        isDarkMode={isDarkMode}
                      />
                    </div>
                  ))}

                  {/* Final timeline dot */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                      marginTop: "-1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: theme.colors.primary,
                        border: `2px solid ${theme.colors.secondary}`,
                        flexShrink: 0,
                      }}
                    />
                    <p
                      style={{
                        fontSize: "1rem",
                        color: theme.colors.text.secondary,
                        fontStyle: "italic",
                        margin: "0",
                      }}
                    >
                      The journey continues...
                    </p>
                  </div>
                </div>
              </div>
              {/* Tooltip only when collapsed */}
              {!isTimelineExpanded && (
                <div style={{}} className="journey-tooltip">
                  Click to explore my educational background and work experience
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Responsive CSS */}
        <style>{`   
         .journey-tooltip {
      opacity: 0;
    }
  .journey-button:hover .journey-tooltip {
  opacity: 1;
}

          /* Tablet styles */
          @media (max-width: 768px) {
            .main-layout {
              flex-direction: column !important;
              align-items: center !important;
              gap: 2rem !important;
              text-align: center !important;
            }
            
            .left-column {
              padding-left: 2rem !important;
              padding-right: 2rem !important;
              width: 100% !important;
              max-width: 400px !important;
            }
            
            .right-column {
              padding-right: 0 !important;
              width: 100% !important;
              max-width: 600px !important;
            }
            
            .social-links {
              justify-content: center !important;
            }

            .timeline-item {
              gap: 1rem !important;
            }
          }
          
          /* Mobile styles */
          @media (max-width: 480px) {
            .profile-image {
              width: 120px !important;
              height: 120px !important;
            }
            
            .main-title {
              font-size: 2rem !important;
            }
            
            .left-column {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
              gap: 1.5rem !important;
            }
            
            .languages-section {
              width: 100% !important;
            }
            
            .languages-list {
              gap: 0.75rem !important;
            }
            
            .language-item {
              padding: 0.25rem 0 !important;
              gap: 0.75rem !important;
            }
            
            .language-item svg {
              width: 30px !important;
              height: 30px !important;
            }
            
            .social-links {
              gap: 0.75rem !important;
              justify-content: center !important;
            }
            
            .social-links a {
              font-size: 0.85rem !important;
            }
            
            .about-description p {
              font-size: 1rem !important;
              line-height: 1.6 !important;
            }

            .timeline-item {
              flex-direction: column !important;
              gap: 0.5rem !important;
              align-items: center !important;
            }

            .timeline-item > div:first-child {
              flex-direction: row !important;
              align-items: center !important;
              width: 100% !important;
            }

            .timeline-item > div:first-child > div:last-child {
              height: 2px !important;
              width: 60px !important;
              margin-top: 0 !important;
              margin-left: 0.5rem !important;
            }
          }
          
          /* Very small mobile devices */
          @media (max-width: 360px) {
            .main-title {
              font-size: 1.75rem !important;
            }
            
            .profile-image {
              width: 100px !important;
              height: 100px !important;
            }
            
            .languages-section {
              max-width: 180px !important;
            }
            
            .language-item > div:first-child {
              display: none !important;
            }
            
            .language-item > div:last-child {
              text-align: center !important;
              flex: none !important;
            }
            
            .social-links {
              flex-direction: column !important;
              align-items: center !important;
              gap: 0.5rem !important;
            }
          }  
        
        `}</style>
      </div>
    </div>
  );
};

export default About;
