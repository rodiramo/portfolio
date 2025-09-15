// src/components/NavBar.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Download,
  User,
  Code2,
  House,
  FolderOpen,
  Github,
  Linkedin,
  Figma,
  Mail,
  ChevronDown,
  Sun,
  Moon,
  Settings,
} from "lucide-react";

import HomePage from "../pages/HomePage/HomePage.jsx";
import About from "../pages/About/About.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import Projects from "../pages/Projects/Projects.jsx";
import Skills from "../pages/Skills/Skills.jsx";
import { useTheme } from "../theme.js";
import Logo from "./Logo.jsx";
import ProfileSidebar from "../components/ProfileSidebar.jsx";

// ✅ accept props correctly; add controlled/uncontrolled support
const NavBar = (props) => {
  const controlled =
    typeof props.isDarkMode === "boolean" &&
    typeof props.setIsDarkMode === "function";

  const [internalDark, setInternalDark] = useState(false);
  const dark = controlled ? props.isDarkMode : internalDark;
  const toggleDark = () => {
    if (controlled) props.setIsDarkMode(!props.isDarkMode);
    else setInternalDark((v) => !v);
  };

  const theme = useTheme(dark);

  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConfigMenuOpen, setIsConfigMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    navippon: useRef(null),
    jumping: useRef(null),
    contact: useRef(null),
  };

  const toggleExpanded = (itemId) => {
    const next = new Set(expandedItems);
    next.has(itemId) ? next.delete(itemId) : next.add(itemId);
    setExpandedItems(next);
  };

  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId]?.current;
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
    setIsConfigMenuOpen(false);
    setExpandedItems(new Set());
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + 100;
      Object.keys(sectionRefs).forEach((key) => {
        const el = sectionRefs[key].current;
        if (!el) return;
        const { offsetTop, offsetHeight } = el;
        if (y >= offsetTop && y < offsetTop + offsetHeight)
          setActiveSection(key);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobileMenuOpen &&
        !e.target.closest(".mobile-menu") &&
        !e.target.closest(".mobile-menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        isConfigMenuOpen &&
        !e.target.closest(".config-menu") &&
        !e.target.closest(".config-menu-toggle")
      ) {
        setIsConfigMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, isConfigMenuOpen]);

  const navItems = [
    { title: "About Me", icon: User, id: "about" },
    { title: "Skills", icon: Code2, id: "skills" },
    {
      title: "Projects",
      icon: FolderOpen,
      id: "projects",
    },
  ];

  const mobileNavItems = [
    { title: "Home", icon: House, id: "home" },
    { title: "About", icon: User, id: "about" },
    { title: "Skills", icon: Code2, id: "skills" },
    { title: "Projects", icon: FolderOpen, id: "projects" },
    { title: "Config", icon: Settings, id: "config", isConfig: true },
  ];

  const isActive = (id) => activeSection === id;

  return (
    <div className="min-h-screen">
      {/* Desktop Top Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between p-1 m-auto"
        style={{ maxWidth: "1800px" }}
      >
        <Logo isDarkMode={dark} />

        {/* Desktop Nav Pills */}
        <div
          className="backdrop-blur-md"
          style={{
            backgroundColor: `${theme.colors.surface}95`,
            border: `1.5px solid ${theme.colors.primary}30`,
            borderRadius: "30rem",
            display: "flex",
            fontSize: "0.7rem",
            boxShadow:
              "0 1px 3px 0 rgba(83,36,103,0.02), 0 1px 2px 0 rgba(54,16,75,0.06)",
          }}
        >
          <div className="flex items-center justify-between p-1">
            <div className="flex items-center space-x-1">
              <div className="relative">
                <button
                  onClick={() => scrollToSection("home")}
                  style={{
                    backgroundColor: "transparent",
                    color: theme.colors.text.primary,
                    border: "none",
                    borderRadius: "50px",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = theme.colors.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <House size={16} />
                </button>
              </div>
            </div>

            <span className="line mr-4 ml-1" />

            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => {
                      if (item.subItems) toggleExpanded(item.id);
                      else scrollToSection(item.id);
                    }}
                    className="button-style flex items-center px-4 py-2 rounded-full transition-all duration-200"
                    style={{
                      background: isActive(item.id)
                        ? theme.colors.light
                        : "transparent",
                      borderRadius: "50px",
                      border: isActive(item.id)
                        ? `1.5px solid ${theme.colors.dark}`
                        : "none",
                      color: theme.colors.text.primary,
                    }}
                  >
                    <item.icon size={16} className="mr-2" />
                    {item.title}
                    {item.subItems && (
                      <ChevronDown
                        size={14}
                        className={`ml-1 transition-transform duration-200 ${
                          expandedItems.has(item.id) ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {item.subItems && expandedItems.has(item.id) && (
                    <div
                      className="absolute top-full left-0 mt-1 min-w-max rounded-lg shadow-lg border"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                      }}
                    >
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => scrollToSection(sub.id)}
                          className="block w-full text-left px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
                          style={{
                            backgroundColor: isActive(sub.id)
                              ? theme.colors.primary
                              : "transparent",
                            color: isActive(sub.id)
                              ? theme.colors.text.inverse
                              : theme.colors.text.primary,
                            border: "none",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive(sub.id))
                              e.currentTarget.style.backgroundColor =
                                theme.colors.hover;
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive(sub.id))
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                          }}
                        >
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <span className="line ml-4 mr-1" />

            {/* Language Toggle */}
            <div className="flex items-center justify-between mr-1">
              <button
                onClick={() =>
                  setSelectedLanguage((l) => (l === "en" ? "de" : "en"))
                }
                className="flex items-center transition-colors"
                style={{
                  borderRadius: "50px",
                  color: theme.colors.primary,
                  padding: "5px 10px",
                  backgroundColor: `${theme.colors.surface}40`,
                  border: "none",
                  outline: "none",
                }}
              >
                {selectedLanguage === "en" ? <span>EN</span> : <span>DE</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Dark mode + CV */}
        <div className="flex items-center justify-between">
          <button
            onClick={toggleDark} // ✅ use the safe toggle
            className="flex items-center rounded-full transition-colors backdrop-blur-md"
            style={{
              outline: "none",
              border: "none",
              padding: "8px",
              borderRadius: "50px",
              marginRight: "1rem",
              backgroundColor: dark
                ? theme.colors.primary
                : `${theme.colors.surface}50`,
              color: dark
                ? theme.colors.text.inverse
                : theme.colors.text.primary,
            }}
          >
            {dark ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            className="flex items-center rounded-full transition-all duration-200"
            style={{
              background: theme.colors.light,
              height: "fit-content",
              padding: "8px",
              fontSize: "0.7rem",
              border: `1.5px solid ${theme.colors.dark}`,
              borderRadius: "50px",
              color: theme.colors.text.primary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(139,92,246,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Download size={16} className="mr-2" />
            Curriculum
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Bottom Navigation */}
      <nav
        className="lg:hidden fixed bottom-5 left-2 right-2 z-50 m-auto backdrop-blur-md"
        style={{
          backgroundColor: `${theme.colors.surface}95`,
          border: `1.5px solid ${theme.colors.primary}30`,
          borderRadius: "30rem",
          boxShadow:
            "0 1px 3px 0 rgba(83,36,103,0.02), 0 1px 2px 0 rgba(54,16,75,0.06)",
          width: "fit-content",
        }}
      >
        <div
          className="flex items-center justify-around safe-area-pb p-1"
          style={{ borderRadius: "30rem" }}
        >
          {mobileNavItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => {
                  if (item.isConfig) {
                    setIsConfigMenuOpen(!isConfigMenuOpen);
                  } else if (item.subItems) {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                    setExpandedItems(new Set([item.id]));
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                className={`flex flex-col items-center px-3 py-2 transition-all duration-200 ${
                  item.isConfig ? "config-menu-toggle" : ""
                }`}
                style={{
                  borderRadius: "50px",
                  height: "fit-content",
                  fontSize: "0.7rem",
                  border: "none",
                  outline: "none",
                  background:
                    isActive(item.id) || (item.isConfig && isConfigMenuOpen)
                      ? theme.colors.light
                      : "transparent",
                  borderStyle: "solid",
                  borderWidth:
                    isActive(item.id) || (item.isConfig && isConfigMenuOpen)
                      ? "1.5px"
                      : "0px",
                  borderColor:
                    isActive(item.id) || (item.isConfig && isConfigMenuOpen)
                      ? theme.colors.dark
                      : "transparent",
                  color: theme.colors.text.primary,
                }}
              >
                <item.icon
                  size={16}
                  className="mb-1"
                  style={{ color: theme.colors.text.primary }}
                />
                <span
                  className="text-xs"
                  style={{ color: theme.colors.text.primary }}
                >
                  {item.title}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Projects Menu */}
        {isMobileMenuOpen && (
          <div
            className="absolute bottom-full left-0 right-0 mb-1 min-w-max rounded-lg shadow-lg mobile-menu"
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <div className="px-4 py-3">
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: theme.colors.text.primary }}
              >
                Projects
              </h3>
              <div className="space-y-1">
                {navItems
                  .find((it) => it.id === "projects")
                  ?.subItems?.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => scrollToSection(subItem.id)}
                      className="flex items-center w-full px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
                      style={{
                        backgroundColor: isActive(subItem.id)
                          ? theme.colors.primary
                          : "transparent",
                        color: isActive(subItem.id)
                          ? theme.colors.text.inverse
                          : theme.colors.text.primary,
                        border: "none",
                        outline: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(subItem.id))
                          e.currentTarget.style.backgroundColor =
                            theme.colors.hover;
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(subItem.id))
                          e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {subItem.title}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Config Menu */}
        {isConfigMenuOpen && (
          <div
            className="absolute bottom-full left-0 right-0 mb-1 min-w-max rounded-lg shadow-lg config-menu"
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              minWidth: "200px",
            }}
          >
            <div className="px-4 py-3">
              <h3
                className="text-sm font-semibold mb-3"
                style={{ color: theme.colors.text.primary }}
              >
                Settings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Dark Mode
                  </span>
                  <button
                    onClick={toggleDark}
                    className="flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors"
                    style={{
                      backgroundColor: dark
                        ? theme.colors.primary
                        : theme.colors.border,
                      color: dark
                        ? theme.colors.text.inverse
                        : theme.colors.text.primary,
                      border: "none",
                      outline: "none",
                    }}
                  >
                    {dark ? <Moon size={16} /> : <Sun size={16} />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-sm"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Language
                  </span>
                  <button
                    onClick={() =>
                      setSelectedLanguage(
                        selectedLanguage === "en" ? "de" : "en"
                      )
                    }
                    className="flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors"
                    style={{
                      backgroundColor: theme.colors.border,
                      color: theme.colors.text.primary,
                      border: "none",
                      outline: "none",
                    }}
                  >
                    {selectedLanguage === "en" ? (
                      <span>EN</span>
                    ) : (
                      <span>DE</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ==== Main Content ==== */}
      <section ref={sectionRefs.home} id="home" style={{ paddingTop: "5rem" }}>
        <HomePage isDarkMode={dark} />
      </section>

      <main
        className="page-grid stack-sidebar-first"
        style={{
          ["--nav-h"]: "72px",
          maxWidth: "1500px",
          margin: "0 auto",
          display: "grid",
          gap: "2rem",
        }}
      >
        <aside
          className="sidebar"
          style={{
            gridArea: "sidebar",

            alignSelf: "start",
            height: "fit-content",
          }}
        >
          <ProfileSidebar
            isDarkMode={dark}
            name="Rocio Diaz Ramos"
            locationText="Europe/Hamburg"
            avatarSrc="/assets/pfp.jpeg"
            languages={[
              { name: "Español", proficiency: 100, level: "Native" },
              { name: "English", proficiency: 90, level: "Fluent" },
              { name: "Deutsch", proficiency: 75, level: "Advanced" },
            ]}
            socialLinks={[
              {
                icon: Github,
                label: "GitHub",
                href: "https://github.com/youruser",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                href: "https://linkedin.com/in/youruser",
              },
              {
                icon: Figma,
                label: "Figma",
                href: "https://figma.com/@youruser",
              },
              { icon: Mail, label: "Email", href: "mailto:you@example.com" },
            ]}
          />
        </aside>

        <div
          className="content"
          style={{
            gridArea: "content",
            minWidth: 0,
          }}
        >
          <section
            ref={sectionRefs.about}
            id="about"
            style={{
              borderRadius: 14,
              marginBottom: "2rem",
            }}
          >
            <About isDarkMode={dark} />
          </section>

          <section
            ref={sectionRefs.skills}
            id="skills"
            style={{
              marginBottom: "2rem",
            }}
          >
            <Skills isDarkMode={dark} />
          </section>

          <section
            ref={sectionRefs.projects}
            id="projects"
            style={{
              marginBottom: "2rem",
            }}
          >
            <Projects isDarkMode={dark} />
          </section>
        </div>
      </main>

      {/* Layout CSS */}
      <style>{`
        /* Desktop: two columns */
        .page-grid {
          display: grid;
          grid-template-columns: minmax(260px, 340px) 1fr;
          grid-template-areas: "sidebar content";
          gap: 2rem;
        }

        /* Sticky sidebar only on desktop/wide screens */
        @media (min-width: 1025px) {
          .sidebar {
            position: sticky;
            top: calc(var(--nav-h) + 2rem);
            align-self: start;
          }
        }

        /* Mobile/tablet: stack with SIDEBAR FIRST after Home; sticky OFF */
        @media (max-width: 1024px) {
          .page-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "sidebar"
              "content";
            gap: 1.25rem;
            padding-left: 12px;
            padding-right: 12px;
          }
          .sidebar { position: static; top: auto; }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
