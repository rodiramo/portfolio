import React, { useState } from "react";
import {
  Code,
  Palette,
  Server,
  Smartphone,
  Globe,
  Database,
  Figma,
  Layers,
  Terminal,
  Zap,
  Monitor,
  Cpu,
} from "lucide-react";
import { useTheme } from "../../theme.js";

const Skills = ({ isDark = false }) => {
  const theme = useTheme(isDark);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      id: "frontend",
      title: "Web Development",
      icon: Monitor,
      color: theme.colors.primary,
      background: theme.colors.surface,
      textColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      skills: [
        {
          name: "React.js",
          icon: Code,
          level: 85,
          description: "Component-based development",
        },
        {
          name: "Vue.js",
          icon: Code,
          level: 75,
          description: "Progressive JavaScript framework",
        },
        {
          name: "HTML5/CSS3",
          icon: Code,
          level: 90,
          description: "Responsive web layouts",
        },
        {
          name: "JavaScript",
          icon: Zap,
          level: 80,
          description: "Interactive web experiences",
        },
        {
          name: "PWA Development",
          icon: Smartphone,
          level: 80,
          description: "Progressive Web Applications",
        },
        {
          name: "WordPress",
          icon: Globe,
          level: 75,
          description: "Content management systems",
        },
      ],
    },
    {
      id: "backend",
      title: "Backend & APIs",
      icon: Server,
      color: theme.colors.dark,
      background: theme.colors.surface,
      textColor: theme.colors.dark,
      borderColor: theme.colors.dark,
      skills: [
        {
          name: "Node.js",
          icon: Server,
          level: 85,
          description: "Server-side JavaScript",
        },
        {
          name: "PHP Laravel",
          icon: Terminal,
          level: 80,
          description: "Web application framework",
        },
        {
          name: "MongoDB",
          icon: Database,
          level: 90,
          description: "NoSQL database expertise",
        },
        {
          name: "MySQL",
          icon: Database,
          level: 75,
          description: "Relational database",
        },
        {
          name: "API Integration",
          icon: Globe,
          level: 85,
          description: "Third-party services & payments",
        },
        {
          name: "Firebase",
          icon: Cpu,
          level: 70,
          description: "Backend-as-a-service",
        },
      ],
    },
    {
      id: "design",
      title: "Design & Creative",
      icon: Palette,
      color: theme.colors.accent1,
      background: theme.colors.surface,
      textColor: theme.colors.accent1,
      borderColor: theme.colors.accent1,
      skills: [
        {
          name: "Figma",
          icon: Figma,
          level: 90,
          description: "UI/UX design & prototyping",
        },
        {
          name: "Adobe Photoshop",
          icon: Palette,
          level: 85,
          description: "Digital graphics & banners",
        },
        {
          name: "Adobe Illustrator",
          icon: Palette,
          level: 80,
          description: "Vector graphics & logos",
        },
        {
          name: "Content Creation",
          icon: Layers,
          level: 80,
          description: "Social media & marketing assets",
        },
        {
          name: "Spline",
          icon: Monitor,
          level: 65,
          description: "3D design & animations",
        },
        {
          name: "Framer",
          icon: Code,
          level: 55,
          description: "Interactive prototyping (learning)",
        },
      ],
    },
  ];

  const SkillBar = ({ skill, isActive, textColor, borderColor }) => (
    <div
      className="skill-item"
      style={{
        padding: "1rem",
        borderRadius: "12px",
        background: isActive ? theme.colors.hover : theme.colors.surface,
        backdropFilter: "blur(10px)",
        border: `1px solid ${borderColor}40`,
        transition: "all 0.3s ease",
        transform: isActive ? "translateY(-2px)" : "translateY(0)",
        cursor: "pointer",
        boxShadow: isActive
          ? `0 4px 12px ${borderColor}30`
          : `0 2px 4px ${theme.colors.border}`,
      }}
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <skill.icon
          size={20}
          style={{ color: textColor, marginRight: "0.75rem" }}
        />
        <span
          style={{
            color: textColor,
            fontWeight: "600",
            fontSize: "0.9rem",
          }}
        >
          {skill.name}
        </span>
        <span
          style={{
            color: textColor,
            fontSize: "0.8rem",
            marginLeft: "auto",
            opacity: 0.8,
          }}
        >
          {skill.level}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: `${borderColor}20`,
          borderRadius: "2px",
          overflow: "hidden",
          marginBottom: "0.5rem",
        }}
      >
        <div
          style={{
            width: `${skill.level}%`,
            height: "100%",
            backgroundColor: textColor,
            borderRadius: "2px",
            transition: "width 1s ease-in-out",
          }}
        />
      </div>

      {/* Description */}
      <p
        style={{
          color: textColor,
          fontSize: "0.75rem",
          margin: 0,
          opacity: hoveredSkill === skill.name ? 0.9 : 0.6,
          transition: "opacity 0.3s ease",
        }}
      >
        {skill.description}
      </p>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1rem",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontFamily: "Vibur, cursive",
            fontWeight: "800",
            margin: "0 0 1rem 0",
            color: theme.colors.text.primary,
          }}
        >
          Technical Skills
        </h2>
        <p
          style={{
            fontSize: "1.2rem",

            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Explore my expertise across different technologies and tools
        </p>
      </div>

      {/* Category Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {skillCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                border: `1px solid ${category.borderColor}`,
                background:
                  activeCategory === index
                    ? category.textColor
                    : theme.colors.surface,
                color:
                  activeCategory === index
                    ? theme.colors.text.inverse
                    : category.textColor,
                fontWeight: "600",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transform:
                  activeCategory === index
                    ? "translateY(-2px)"
                    : "translateY(0)",
                boxShadow:
                  activeCategory === index
                    ? `0 4px 12px ${category.borderColor}40`
                    : `0 2px 4px ${theme.colors.border}`,
              }}
            >
              <IconComponent size={18} />
              {category.title}
            </button>
          );
        })}
      </div>

      {/* Skills Display */}
      <div
        style={{
          background: skillCategories[activeCategory].background,
          borderRadius: "24px",
          padding: "2rem",
          minHeight: "400px",
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 8px 24px ${skillCategories[activeCategory].borderColor}30`,
          border: `1px solid ${skillCategories[activeCategory].borderColor}`,
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: `radial-gradient(circle at 20% 80%, ${skillCategories[activeCategory].textColor}20 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, ${skillCategories[activeCategory].textColor}20 0%, transparent 50%)`,
          }}
        />

        {/* Category Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {React.createElement(skillCategories[activeCategory].icon, {
            size: 32,
            style: {
              color: skillCategories[activeCategory].textColor,
              marginRight: "1rem",
            },
          })}
          <h3
            style={{
              color: skillCategories[activeCategory].textColor,
              fontSize: "1.8rem",
              fontWeight: "700",
              margin: 0,
            }}
          >
            {skillCategories[activeCategory].title}
          </h3>
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {skillCategories[activeCategory].skills.map((skill) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              isActive={hoveredSkill === skill.name}
              textColor={skillCategories[activeCategory].textColor}
              borderColor={skillCategories[activeCategory].borderColor}
            />
          ))}
        </div>

        {/* Progress Indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            gap: "0.5rem",
          }}
        >
          {skillCategories.map((_, index) => (
            <div
              key={index}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: skillCategories[activeCategory].textColor,
                opacity: activeCategory === index ? 1 : 0.3,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onClick={() => setActiveCategory(index)}
            />
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .skill-item {
            padding: 0.75rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .skill-item {
            padding: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Skills;
