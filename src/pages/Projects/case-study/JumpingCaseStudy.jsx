// src/pages/Projects/case-study/JumpingCaseStudy.jsx
import React from "react";
import CaseStudyLayout from "./CaseStudyLayout.jsx";

export default function JumpingCaseStudy({ isDarkMode = false, onBack }) {
  return (
    <CaseStudyLayout
      isDarkMode={isDarkMode}
      onBack={onBack}
      title="Jumping"
      subtitle="Jump-rope tracker with trends and calories"
      coverImage="https://images.unsplash.com/photo-1599050751776-0a0b0f5f0b1e?q=80&w=1600&auto=format&fit=crop"
      summary="A minimal tracker for jump-rope workouts: quick logging, streaks, and progress. Designed to reduce friction and make training feel rewarding."
      role="UI/UX & Frontend"
      timeframe="2024"
      team="Solo"
      tools={["Figma", "React Native", "Firebase", "HealthKit"]}
      responsibilities={[
        "Low-friction logging flow with auto-detection hooks",
        "Session timelines, personal bests, and streaks",
        "Lightweight dark theme; haptics for feedback",
        "Firebase storage and basic auth",
      ]}
      gallery={[
        "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1200&auto=format&fit=crop",
      ]}
      outcomes={[
        "Prototype tested with 6 users; logging <10s",
        "Clear visual feedback boosted adherence",
      ]}
      links={[
        { label: "Prototype", href: "#" },
        { label: "Figma", href: "#" },
      ]}
    />
  );
}
