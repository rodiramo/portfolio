// src/pages/Projects/case-study/JumpingCaseStudy.jsx
import React from "react";
import CaseStudyLayout from "./CaseStudyLayout.jsx";
import { useTranslation } from "react-i18next";

export default function JumpingCaseStudy({ isDarkMode = false, onBack }) {
  const { t } = useTranslation("projects");

  // Pull localized content with safe fallbacks
  const ns = "cases.jumping";

  const title = t(`${ns}.title`, { defaultValue: "Jumping" });
  const subtitle = t(`${ns}.subtitle`, {
    defaultValue: "Jump-rope tracker with trends and calories",
  });
  const coverImage = t(`${ns}.coverImage`, {
    defaultValue:
      "https://images.unsplash.com/photo-1599050751776-0a0b0f5f0b1e?q=80&w=1600&auto=format&fit=crop",
  });
  const summary = t(`${ns}.summary`, {
    defaultValue:
      "A minimal tracker for jump-rope workouts: quick logging, streaks, and progress. Designed to reduce friction and make training feel rewarding.",
  });
  const role = t(`${ns}.role`, { defaultValue: "UI/UX & Frontend" });
  const timeframe = t(`${ns}.timeframe`, { defaultValue: "2024" });
  const team = t(`${ns}.team`, { defaultValue: "Solo" });

  const tools = t(`${ns}.tools`, {
    returnObjects: true,
    defaultValue: ["Figma", "React Native", "Firebase", "HealthKit"],
  });
  const responsibilities = t(`${ns}.responsibilities`, {
    returnObjects: true,
    defaultValue: [
      "Low-friction logging flow with auto-detection hooks",
      "Session timelines, personal bests, and streaks",
      "Lightweight dark theme; haptics for feedback",
      "Firebase storage and basic auth",
    ],
  });
  const gallery = t(`${ns}.gallery`, {
    returnObjects: true,
    defaultValue: [
      "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1200&auto=format&fit=crop",
    ],
  });
  const outcomes = t(`${ns}.outcomes`, {
    returnObjects: true,
    defaultValue: [
      "Prototype tested with 6 users; logging <10s",
      "Clear visual feedback boosted adherence",
    ],
  });
  const problems = t(`${ns}.problems`, {
    returnObjects: true,
    defaultValue: [
      "Manual logging felt tedious; users skipped entries",
      "Inconsistent feedback reduced motivation over time",
    ],
  });
  const solutions = t(`${ns}.solutions`, {
    returnObjects: true,
    defaultValue: [
      "One-tap logging with smart defaults and auto-detection",
      "Streaks, personal bests, and haptic cues for instant feedback",
    ],
  });
  const links = t(`${ns}.links`, {
    returnObjects: true,
    defaultValue: [
      { label: "Prototype", href: "#" },
      { label: "Figma", href: "#" },
    ],
  });

  return (
    <CaseStudyLayout
      isDarkMode={isDarkMode}
      onBack={onBack}
      title={title}
      subtitle={subtitle}
      coverImage={coverImage}
      summary={summary}
      role={role}
      timeframe={timeframe}
      team={team}
      tools={tools}
      responsibilities={responsibilities}
      problems={problems} // <- NEW
      solutions={solutions} // <- NEW
      gallery={gallery}
      outcomes={outcomes}
      links={links}
    />
  );
}
