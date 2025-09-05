import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Github,
  Linkedin,
  Icon,
  Figma,
  Mail,
  User,
  Earth,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Briefcase,
  Code,
  Award,
} from "lucide-react";
import { useTheme } from "../../theme.js"; // Import the same theme hook

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Timeline Item Component
const TimelineItem = ({ data, type, delay = 0, isDarkMode }) => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  const theme = useTheme(isDarkMode);
  return (
    <div
      ref={ref}
      className="timeline-item"
      style={{
        display: "flex",
        marginBottom: "4rem",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(60px)",
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {/* Timeline Line */}
      <div
        className="timeline-line"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginRight: "2.5rem",
          minWidth: "80px",
        }}
      >
        {/* Icon Circle */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #4f46e5 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            marginBottom: "1.5rem",
            boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
            transform: isVisible
              ? "scale(1) rotate(0deg)"
              : "scale(0.5) rotate(-180deg)",
            transition: `transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
              delay + 200
            }ms`,
            position: "relative",
            zIndex: 2,
          }}
        ></div>

        {/* Vertical Line */}
        <div
          style={{
            width: "4px",
            height: "120px",
            background: `linear-gradient(to bottom, ${theme.colors.primary}, ${theme.colors.border})`,
            borderRadius: "2px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
            transition: `all 0.6s ease-in-out ${delay + 400}ms`,
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* Content Card */}
      <div
        style={{
          flex: 1,
          backgroundColor: theme.colors.light,
          border: `2px solid ${theme.colors.border}`,
          borderRadius: "24px",
          padding: "2.5rem",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          transform: isVisible
            ? "translateX(0) rotateY(0deg)"
            : "translateX(50px) rotateY(5deg)",
          transition: `transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
            delay + 300
          }ms`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: `linear-gradient(90deg, ${theme.colors.primary}, #4f46e5, #8b5cf6)`,
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.5s ease-in-out ${delay + 600}ms`,
          }}
        />

        {/* Period Badge */}
        <div
          style={{
            display: "inline-block",
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #4f46e5 100%)`,
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "30px",
            fontSize: "0.9rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
            transform: isVisible ? "scale(1)" : "scale(0.8)",
            opacity: isVisible ? 1 : 0,
            transition: `all 0.5s ease-in-out ${delay + 500}ms`,
          }}
        >
          {data.period}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1.75rem",
            fontWeight: "800",
            color: theme.colors.text.primary,
            marginBottom: "0.75rem",
            lineHeight: "1.3",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.6s ease-in-out ${delay + 700}ms`,
          }}
        >
          {type === "education" ? data.degree : data.position}
        </h3>

        {/* Institution/Company */}
        <p
          style={{
            fontSize: "1.25rem",
            color: theme.colors.primary,
            fontWeight: "700",
            marginBottom: "1.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.6s ease-in-out ${delay + 800}ms`,
          }}
        >
          {type === "education" ? data.institution : data.company}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "1.1rem",
            color: theme.colors.text.secondary,
            lineHeight: "1.8",
            margin: "0",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.6s ease-in-out ${delay + 900}ms`,
          }}
        >
          {data.description}
        </p>
      </div>
    </div>
  );
};

// Floating elements for visual interest
const FloatingElement = ({ children, delay = 0 }) => {
  return (
    <div
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}ms`,
        position: "relative",
      }}
    >
      {children}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

// Main About Component
const About = ({ isDarkMode = false }) => {
  const [showTimeline, setShowTimeline] = useState(false);
  const [headerRef, headerVisible] = useIntersectionObserver(0.1);

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
        "Specialized in web development, marketing strategies, and user experience design. Developed a strong foundation in modern web technologies and design principles.",
    },
    {
      degree: "Frontend Development Basics Bootcamp",
      institution: "SheCodes",
      period: "2021",
      description:
        "Intensive program covering HTML, JavaScript, and CSS fundamentals. Built multiple projects from scratch and learned responsive design principles.",
    },
  ];

  const experience = [
    {
      position: "Freelance Web Designer",
      company: "Jumping",
      period: "2024",
      description:
        "Commissioned to design and develop a custom website, focusing on user experience and modern design principles. Delivered a fully responsive solution that exceeded client expectations and improved their online presence.",
    },
    {
      position: "Volunteer Web Designer",
      company: "Robol Solutions (Startup)",
      period: "2023 - 2024",
      description:
        "Volunteered as web designer for an early-stage startup, contributing to their digital presence and brand identity through web design. Collaborated with the founding team to establish their visual brand.",
    },
    {
      position: "Student Developer",
      company: "Academic Projects",
      period: "2021 - 2025",
      description:
        "Developed various web applications and projects as part of coursework, including responsive websites, interactive interfaces, and collaborative team projects. Gained hands-on experience with modern development workflows.",
    },
  ];

  // Circle progress component with animation
  const CircleProgress = ({ percentage, size = 40, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay]);

    const radius = (size - 4) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = isVisible
      ? circumference - (percentage / 100) * circumference
      : circumference;

    return (
      <div
        ref={ref}
        style={{ position: "relative", width: size, height: size }}
      >
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
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "0.7rem",
            fontWeight: "600",
            color: theme.colors.primary,
          }}
        >
          {isVisible ? `${percentage}%` : "0%"}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.secondary,
        minHeight: "100vh",
        paddingTop: "8rem",
        paddingBottom: "4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.colors.primary}20, transparent)`,
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.colors.primary}15, transparent)`,
          filter: "blur(40px)",
          animation: "float 6s ease-in-out infinite reverse",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Main Layout - Two Columns */}
        <div
          className="main-layout"
          style={{
            display: "flex",
            gap: "4rem",
            alignItems: "flex-start",
            marginBottom: "6rem",
          }}
        >
          {/* Left Column - Profile */}
          <FloatingElement delay={0}>
            <div
              className="left-column"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
                flexShrink: 0,
                position: "sticky",
                top: "2rem",
                backgroundColor: theme.colors.light,
                padding: "2.5rem",
                borderRadius: "30px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
                border: `2px solid ${theme.colors.border}`,
              }}
            >
              {/* Profile Image */}
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  border: `6px solid ${theme.colors.primary}`,
                  backgroundColor: theme.colors.primary,
                  backgroundImage: "url('/assets/pfp.jpeg')",
                  backgroundSize: "cover",
                  backgroundPosition: "left",
                  boxShadow: "0 15px 35px rgba(99, 102, 241, 0.3)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />

              {/* Name & Location */}
              <div style={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "800",
                    color: theme.colors.text.primary,
                    margin: "0 0 0.75rem 0",
                    background: `linear-gradient(135deg, ${theme.colors.text.primary}, ${theme.colors.primary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Rocio Diaz Ramos
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    color: theme.colors.text.secondary,
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  <Earth size={20} style={{ color: theme.colors.primary }} />
                  <span>Europe/Hamburg</span>
                </div>
              </div>

              {/* Languages */}
              <div
                style={{
                  width: "100%",
                  borderTop: `2px solid ${theme.colors.border}`,
                  paddingTop: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: theme.colors.text.primary,
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  Languages
                </h3>
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <CircleProgress
                      percentage={lang.proficiency}
                      size={50}
                      delay={index * 200}
                    />
                    <div>
                      <div
                        style={{
                          color: theme.colors.text.primary,
                          fontWeight: "700",
                          fontSize: "1rem",
                        }}
                      >
                        {lang.name}
                      </div>
                      <div
                        style={{
                          color: theme.colors.text.secondary,
                          fontSize: "0.85rem",
                          fontWeight: "500",
                        }}
                      >
                        {lang.level}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "100%",
                  borderTop: `2px solid ${theme.colors.border}`,
                  paddingTop: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: theme.colors.text.primary,
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Connect With Me
                </h3>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1.25rem",
                      backgroundColor: theme.colors.secondary,
                      border: `2px solid ${theme.colors.border}`,
                      borderRadius: "16px",
                      color: theme.colors.text.primary,
                      textDecoration: "none",
                      fontSize: "1rem",
                      fontWeight: "600",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        theme.colors.primary;
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(99, 102, 241, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        theme.colors.secondary;
                      e.currentTarget.style.color = theme.colors.text.primary;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <link.icon size={20} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </FloatingElement>

          {/* Right Column - About Content */}
          <div className="right-column" style={{ flex: 1 }}>
            <div
              ref={headerRef}
              style={{
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <h1
                style={{
                  fontSize: "4rem",
                  fontWeight: "900",
                  fontFamily: "Vibur, cursive",
                  margin: "0 0 2rem 0",
                  background: `linear-gradient(135deg, ${theme.colors.text.primary} 0%, ${theme.colors.primary} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: "1.1",
                  textShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                About Me
              </h1>

              <div
                style={{
                  fontSize: "1.3rem",
                  lineHeight: "1.8",
                  color: theme.colors.text.primary,
                  marginBottom: "3rem",
                  opacity: headerVisible ? 1 : 0,
                  transform: headerVisible
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                }}
              >
                <p style={{ marginBottom: "1.5rem" }}>
                  I'm a{" "}
                  <strong
                    style={{
                      color: theme.colors.primary,
                      fontWeight: "700",
                      background: `linear-gradient(135deg, ${theme.colors.primary}, #4f46e5)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Hamburg-based web developer and designer
                  </strong>{" "}
                  with a passion for turning complex challenges into simple,
                  elegant digital solutions. I specialize in building modern web
                  interfaces and interactive experiences that combine creativity
                  with{" "}
                  <strong
                    style={{
                      color: theme.colors.primary,
                      fontWeight: "700",
                    }}
                  >
                    clean, functional design
                  </strong>
                  .
                </p>
                <p>
                  I'm always eager to learn, improve my skills, and take on new
                  challenges. What drives me most is{" "}
                  <strong
                    style={{
                      color: theme.colors.primary,
                      fontWeight: "700",
                    }}
                  >
                    solving problems
                  </strong>{" "}
                  and creating digital experiences that not only look beautiful
                  but also work seamlessly for users.
                </p>
              </div>
            </div>

            {/* Journey Toggle Button */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "4rem",
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
              }}
            >
              <button
                onClick={() => setShowTimeline(!showTimeline)}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #4f46e5 100%)`,
                  color: "white",
                  border: "none",
                  padding: "1.25rem 2.5rem",
                  borderRadius: "60px",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 12px 35px rgba(99, 102, 241, 0.3)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  margin: "0 auto",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.boxShadow =
                    "0 20px 45px rgba(99, 102, 241, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 12px 35px rgba(99, 102, 241, 0.3)";
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>
                  {showTimeline ? "Hide My Journey" : "Explore My Journey"}
                </span>
                <span style={{ position: "relative", zIndex: 2 }}>
                  {showTimeline ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </span>
                {/* Button shine effect */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transition: "left 0.5s ease-in-out",
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        {showTimeline && (
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              opacity: showTimeline ? 1 : 0,
              transform: showTimeline ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.6s ease-in-out",
            }}
          >
            {/* Timeline Header */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: "800",
                  background: `linear-gradient(135deg, ${theme.colors.text.primary} 0%, ${theme.colors.primary} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "1rem",
                }}
              >
                My Journey
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: theme.colors.text.secondary,
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: "1.7",
                }}
              >
                From student to professional - here's how my passion for web
                development has evolved over the years through education and
                hands-on experience.
              </p>
            </div>

            {/* Education Timeline */}
            <div style={{ marginBottom: "6rem" }}>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: theme.colors.primary,
                  marginBottom: "3rem",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <GraduationCap
                  size={32}
                  style={{
                    marginRight: "1rem",
                    verticalAlign: "middle",
                  }}
                />
                Education
                <div
                  style={{
                    position: "absolute",
                    bottom: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80px",
                    height: "4px",
                    background: `linear-gradient(90deg, ${theme.colors.primary}, #4f46e5)`,
                    borderRadius: "2px",
                  }}
                />
              </h3>
              {studies.map((study, index) => (
                <TimelineItem
                  key={`education-${index}`}
                  data={study}
                  index={index}
                  icon={GraduationCap}
                  type="education"
                  delay={index * 200}
                />
              ))}
            </div>

            {/* Experience Timeline */}
            <div>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: theme.colors.primary,
                  marginBottom: "3rem",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Briefcase
                  size={32}
                  style={{
                    marginRight: "1rem",
                    verticalAlign: "middle",
                  }}
                />
                Professional Experience
                <div
                  style={{
                    position: "absolute",
                    bottom: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80px",
                    height: "4px",
                    background: `linear-gradient(90deg, ${theme.colors.primary}, #4f46e5)`,
                    borderRadius: "2px",
                  }}
                />
              </h3>
              {experience.map((exp, index) => (
                <TimelineItem
                  key={`experience-${index}`}
                  data={exp}
                  index={index + studies.length}
                  icon={Briefcase}
                  type="experience"
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        )}

        {/* Global Styles */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 968px) {
            .main-layout {
              flex-direction: column !important;
              gap: 3rem !important;
            }
            
            .left-column {
              position: static !important;
              width: 100% !important;
              max-width: 500px !important;
              margin: 0 auto !important;
            }
            
            .right-column {
              text-align: center !important;
            }
            
            .timeline-item {
              flex-direction: column !important;
              text-align: center !important;
              align-items: center !important;
            }
            
            .timeline-line {
              flex-direction: row !important;
              margin-right: 0 !important;
              margin-bottom: 2rem !important;
              justify-content: center !important;
              min-width: auto !important;
            }
            
            .timeline-line > div:last-child {
              display: none !important;
            }
          }
          
          @media (max-width: 768px) {
            .left-column {
              max-width: 400px !important;
              padding: 2rem !important;
            }
            
            .timeline-item > div:last-child {
              padding: 2rem !important;
            }
            
            h1 {
              font-size: 3rem !important;
            }
            
            h2 {
              font-size: 2rem !important;
            }
            
            .timeline-line > div:first-child {
              width: 60px !important;
              height: 60px !important;
            }
          }
          
          @media (max-width: 480px) {
            .left-column {
              max-width: 350px !important;
              padding: 1.5rem !important;
            }
            
            .timeline-item > div:last-child {
              padding: 1.5rem !important;
            }
            
            h1 {
              font-size: 2.5rem !important;
            }
            
            h3 {
              font-size: 1.5rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default About;
