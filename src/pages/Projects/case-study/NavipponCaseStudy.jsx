// src/pages/Projects/case-study/NavipponCaseStudy.jsx
import React from "react";
import CaseStudyLayout from "./CaseStudyLayout.jsx";

export default function NavipponCaseStudy({ isDarkMode = false, onBack }) {
  return (
    <CaseStudyLayout
      isDarkMode={isDarkMode}
      onBack={onBack}
      title="Navippon"
      subtitle="Japan travel guide — discovery, itineraries, culture"
      coverImage="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop"
      summary="Navippon helps travelers plan and explore Japan with curated POIs, map-based discovery, and day-by-day itineraries that balance culture, food, and logistics."
      role="Design & Frontend"
      timeframe="2023"
      team="Solo + feedback from travelers"
      tools={["Figma", "React", "Node.js", "MongoDB", "Google Maps API"]}
      responsibilities={[
        "Designed UX flows for search, save, and itinerary building",
        "Built React UI with accessible, responsive components",
        "Integrated Maps for POIs, routes, and time estimates",
        "Implemented collections, favorites, and offline notes",
      ]}
      gallery={[
        "https://images.unsplash.com/photo-1529336953121-adb2bcd0f5d6?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1569807351045-0b5ef7c6de8e?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=1200&auto=format&fit=crop",
      ]}
      outcomes={[
        "MVP validated with 12 travelers; strong interest in itinerary flow",
        "Average session time ~5m; repeat visits during planning phase",
        "Clear roadmap to expand with budgets and rail passes",
      ]}
      links={[
        { label: "Live", href: "#" },
        { label: "Figma", href: "#" },
      ]}
    />
  );
}
