// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DottedBg from "./components/DottedBg.jsx";
import { useTheme } from "./theme.js";

import NavBar from "./components/NavBar.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import ProjectDetail from "./pages/Projects/ProjectDetails.jsx";

const readDarkPref = () => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("theme.dark") === "1";
  } catch (err) {
    console.warn("Failed to read theme from localStorage:", err);
    return false;
  }
};

const App = () => {
  const [isDark, setIsDark] = useState(readDarkPref);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("theme.dark", isDark ? "1" : "0");
    } catch (err) {
      console.warn("Failed to read theme from localStorage:", err);
      // Non-fatal: ignore write failures (private mode / quota / SSR)
      // console.debug("Skipping localStorage write:", err);
    }
  }, [isDark]);

  const theme = useTheme(isDark);

  // colors for the dotted bg
  const dotBase = isDark ? "#080b0062" : "#e0e2c7ff";
  const dotDark = isDark ? "#e8eaf2" : "#000000ff";
  const bgColor = theme.colors.bg;

  return (
    <BrowserRouter>
      <DottedBg
        key={isDark ? "dark" : "light"} // force remount on toggle
        dotSize={2}
        spacing={18}
        radius={300}
        intensity={1}
        baseColor={dotBase}
        darkColor={dotDark}
        background={bgColor}
        ease={0.18}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={<NavBar isDarkMode={isDark} setIsDarkMode={setIsDark} />}
          />
          <Route path="/projects" element={<Projects isDarkMode={isDark} />} />
          <Route
            path="/projects/:slug"
            element={<ProjectDetail isDarkMode={isDark} />}
          />
          <Route path="*" element={<Projects isDarkMode={isDark} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
