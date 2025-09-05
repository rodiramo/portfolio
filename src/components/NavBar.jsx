import React, { useEffect, useRef, useState } from "react";

import {
  Download,
  User,
  Code2,
  House,
  FolderOpen,
  Globe,
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

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConfigMenuOpen, setIsConfigMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const theme = useTheme(isDarkMode);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    navippon: useRef(null),
    jumping: useRef(null),
    insights: useRef(null),
    contact: useRef(null),
  };

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
  ];

  // Toggle dropdown items
  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  // Function to scroll to a section when a nav item is clicked
  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId].current;
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      // Close mobile menu after clicking
      setIsMobileMenuOpen(false);
      setIsConfigMenuOpen(false);
      setExpandedItems(new Set()); // Close all dropdowns
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.keys(sectionRefs).forEach((section) => {
        const element = sectionRefs[section].current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu and dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen) {
        if (
          !event.target.closest(".mobile-menu") &&
          !event.target.closest(".mobile-menu-toggle")
        ) {
          setIsMobileMenuOpen(false);
        }
      }
      if (isConfigMenuOpen) {
        if (
          !event.target.closest(".config-menu") &&
          !event.target.closest(".config-menu-toggle")
        ) {
          setIsConfigMenuOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, isConfigMenuOpen]);

  // Navigation items structure
  const navItems = [
    { title: "About Me", icon: User, id: "about" },
    { title: "Skills", icon: Code2, id: "skills" },
    {
      title: "Projects",
      icon: FolderOpen,
      id: "projects",
    },
  ];

  // Mobile navigation items (includes home and config)
  const mobileNavItems = [
    { title: "Home", icon: House, id: "home" },
    { title: "About", icon: User, id: "about" },
    { title: "Skills", icon: Code2, id: "skills" },
    { title: "Projects", icon: FolderOpen, id: "projects" },
    { title: "Config", icon: Settings, id: "config", isConfig: true },
  ];

  const isActive = (id) => activeSection === id;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.secondary }}
    >
      {/* Desktop Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between">
        <Logo isDarkMode={isDarkMode} />
        {/* Desktop Navigation */}
        <div
          className="backdrop-blur-md"
          style={{
            backgroundColor: `${theme.colors.surface}95`,
            border: `1.5px solid ${theme.colors.primary}30`,
            height: "fit-content",
            borderRadius: "30rem",
            width: "fit-content",
            display: "flex",
            fontSize: "0.7rem",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:
              "0 1px 3px 0 rgba(83, 36, 103, 0.02), 0 1px 2px 0 rgba(54, 16, 75, 0.06)",
          }}
        >
          <div className="flex items-center justify-between p-1">
            {/* Desktop Config Button */}
            <div className="flex items-center space-x-1 ">
              <div className="relative">
                <button
                  onClick={() => scrollToSection("home")}
                  className="flex items-center px-3 py-2 text-sm transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    color: theme.colors.text.primary,
                    border: "none",
                    borderRadius: "50px",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = "none";
                    e.target.style.boxShadow = "none";
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.colors.hover;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <House size={16} />
                </button>
              </div>
            </div>
            <span className="line mr-4"></span>
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => {
                      if (item.subItems) {
                        toggleExpanded(item.id);
                      } else {
                        scrollToSection(item.id);
                      }
                    }}
                    className={`button-style flex items-center px-4 py-2 rounded-full transition-all duration-200`}
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

                  {/* Dropdown for desktop */}
                  {item.subItems && expandedItems.has(item.id) && (
                    <div
                      className="absolute top-full left-0 mt-1 min-w-max rounded-lg shadow-lg border"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                      }}
                    >
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => scrollToSection(subItem.id)}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg`}
                          style={{
                            backgroundColor: isActive(subItem.id)
                              ? theme.colors.primary
                              : "transparent",
                            color: isActive(subItem.id)
                              ? theme.colors.text.inverse
                              : theme.colors.text.primary,
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive(subItem.id)) {
                              e.target.style.backgroundColor =
                                theme.colors.hover;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive(subItem.id)) {
                              e.target.style.backgroundColor = "transparent";
                            }
                          }}
                        >
                          {subItem.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <span className="line ml-4"></span>
            {/* Desktop Config Button */}
            <div className="flex items-center space-x-1  ">
              <div className="relative">
                <button
                  onClick={() => setIsConfigMenuOpen(!isConfigMenuOpen)}
                  className="config-menu-toggle flex items-center px-3 py-2 rounded-full text-sm transition-colors focus:outline-none"
                  style={{
                    backgroundColor: isConfigMenuOpen
                      ? theme.colors.light
                      : "transparent",
                    color: theme.colors.text.primary,
                    borderRadius: "50px",
                    border: isConfigMenuOpen
                      ? `1.5px solid ${theme.colors.dark}`
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isConfigMenuOpen) {
                      e.target.style.backgroundColor = theme.colors.hover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isConfigMenuOpen) {
                      e.target.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <Settings size={16} />
                </button>

                {/* Desktop Config Dropdown */}
                {isConfigMenuOpen && (
                  <div
                    className="absolute top-full right-0 mt-1 min-w-max rounded-lg shadow-lg border config-menu"
                    style={{
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      minWidth: "200px",
                    }}
                  >
                    <div className="px-4 py-3">
                      <h3
                        className="text-sm font-semibold mb-3 focus:outline-none"
                        style={{
                          color: theme.colors.text.primary,
                          borderRadius: "50px",
                        }}
                      >
                        Settings
                      </h3>
                      <div className="space-y-3">
                        {/* Dark Mode Toggle */}
                        <div className="flex items-center justify-between">
                          <span
                            className="text-sm"
                            style={{ color: theme.colors.text.primary }}
                          >
                            Dark Mode
                          </span>
                          <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors"
                            style={{
                              backgroundColor: isDarkMode
                                ? theme.colors.primary
                                : theme.colors.border,
                              color: isDarkMode
                                ? theme.colors.text.inverse
                                : theme.colors.text.primary,
                            }}
                          >
                            {isDarkMode ? (
                              <Moon size={16} />
                            ) : (
                              <Sun size={16} />
                            )}
                          </button>
                        </div>

                        {/* Language Selector */}
                        <div className="flex items-center justify-between">
                          <span
                            className="text-sm"
                            style={{ color: theme.colors.text.primary }}
                          >
                            Language
                          </span>
                          <div className="flex space-x-1">
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => setSelectedLanguage(lang.code)}
                                className="flex items-center px-2 py-1 rounded text-xs transition-colors focus:outline-none"
                                style={{
                                  backgroundColor:
                                    selectedLanguage === lang.code
                                      ? theme.colors.primary
                                      : "transparent",
                                  color:
                                    selectedLanguage === lang.code
                                      ? theme.colors.text.inverse
                                      : theme.colors.text.primary,
                                  border:
                                    selectedLanguage === lang.code
                                      ? "none"
                                      : `1px solid ${theme.colors.border}`,
                                }}
                              >
                                <span className="mr-1">{lang.flag}</span>
                                {lang.code}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CV Download */}
        <button
          className="flex items-center rounded-full transition-all duration-200 m-4"
          style={{
            background: theme.colors.light,
            height: "fit-content",
            padding: "10px",
            fontSize: "0.7rem",
            marginLeft: "1rem",
            border: `1.5px solid ${theme.colors.dark}`,
            borderRadius: "50px",
            color: theme.colors.text.primary,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          <Download size={16} className="mr-2" />
          Curriculum
        </button>
      </nav>

      {/* Mobile/Tablet Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Logo isDarkMode={isDarkMode} />
        </div>

        {/* CV Download */}
        <button
          className="flex items-center rounded-full transition-all duration-200 m-4"
          style={{
            background: theme.colors.light,
            height: "fit-content",
            padding: "10px",
            fontSize: "0.7rem",
            marginLeft: "1rem",
            border: `1.5px solid ${theme.colors.dark}`,
            borderRadius: "50px",
            color: theme.colors.text.primary,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          <Download size={16} className="mr-2" />
          Curriculum
        </button>
      </div>
      {/* Mobile/Tablet Bottom Navigation */}
      <nav
        className="lg:hidden fixed bottom-5 left-2 right-2 z-50 m-auto backdrop-blur-md"
        style={{
          backgroundColor: `${theme.colors.surface}95`,
          border: `1.5px solid ${theme.colors.primary}30`,
          height: "fit-content",
          width: "fit-content",
          borderRadius: "30rem",
          boxShadow:
            "0 1px 3px 0 rgba(83, 36, 103, 0.02), 0 1px 2px 0 rgba(54, 16, 75, 0.06)",
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
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
                onMouseEnter={(e) => {
                  if (
                    !isActive(item.id) &&
                    !(item.isConfig && isConfigMenuOpen)
                  ) {
                    e.target.style.backgroundColor = theme.colors.hover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (
                    !isActive(item.id) &&
                    !(item.isConfig && isConfigMenuOpen)
                  ) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                <item.icon
                  size={16}
                  className="mb-1"
                  style={{
                    color: theme.colors.text.primary,
                  }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: theme.colors.text.primary,
                  }}
                >
                  {item.title}
                </span>
              </button>

              {/* Projects indicator */}
              {(item.subItems && isActive("navippon")) ||
                (isActive("jumping") && (
                  <div
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                ))}
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
                  .find((item) => item.id === "projects")
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
                      onFocus={(e) => {
                        e.target.style.outline = "none";
                        e.target.style.boxShadow = "none";
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(subItem.id)) {
                          e.target.style.backgroundColor = theme.colors.hover;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(subItem.id)) {
                          e.target.style.backgroundColor = "transparent";
                        }
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
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Dark Mode
                  </span>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors"
                    style={{
                      backgroundColor: isDarkMode
                        ? theme.colors.primary
                        : theme.colors.border,
                      color: isDarkMode
                        ? theme.colors.text.inverse
                        : theme.colors.text.primary,
                      border: "none",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = "none";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                  </button>
                </div>

                {/* Language Selector */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Language
                  </span>
                  <div className="flex space-x-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className="flex items-center px-2 py-1 rounded text-xs transition-colors"
                        style={{
                          backgroundColor:
                            selectedLanguage === lang.code
                              ? theme.colors.primary
                              : "transparent",
                          color:
                            selectedLanguage === lang.code
                              ? theme.colors.text.inverse
                              : theme.colors.text.primary,
                          border:
                            selectedLanguage === lang.code
                              ? "none"
                              : `1px solid ${theme.colors.border}`,
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.target.style.outline = "none";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <span className="mr-1">{lang.flag}</span>
                        {lang.code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Updated to pass isDarkMode prop to all components */}
      <div style={{ width: "100%" }}>
        <div className="min-h-screen">
          {/* Home Section */}
          <section ref={sectionRefs.home} id="home" className="py-10">
            <HomePage isDarkMode={isDarkMode} />
          </section>

          {/* About Section */}
          <section ref={sectionRefs.about} id="about" className="py-10">
            <About isDarkMode={isDarkMode} />
          </section>

          {/* Skills Section */}
          <section
            ref={sectionRefs.skills}
            id="skills"
            className="py-8 lg:py-16 px-4 lg:px-8"
          >
            <Skills isDarkMode={isDarkMode} />
          </section>

          {/* Projects Section */}
          <section
            ref={sectionRefs.projects}
            id="projects"
            className="py-8 lg:py-16 px-4 lg:px-8"
          >
            <Projects isDarkMode={isDarkMode} />
          </section>

          {/* Contact Section */}
          <section
            ref={sectionRefs.contact}
            id="contact"
            className="py-8 lg:py-16 px-4 lg:px-8"
          >
            <Contact isDarkMode={isDarkMode} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
