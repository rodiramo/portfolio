// src/pages/Projects/case-study/RobolSolutionsCaseStudy.jsx
import React from "react";
import CaseStudyLayout from "./CaseStudyLayout.jsx";
import { useTranslation } from "react-i18next";

export default function RobolSolutionsCaseStudy({
  isDarkMode = false,
  onBack,
}) {
  const { t } = useTranslation("projects");
  const ns = "cases.robol"; // keep consistent with card id "robol"

  const title = t(`${ns}.title`, { defaultValue: "Robol Solutions" });
  const subtitle = t(`${ns}.subtitle`, {
    defaultValue: "Marketing site — design system + developer handoff",
  });
  const coverImage = t(`${ns}.coverImage`, {
    defaultValue:
      "https://images.unsplash.com/photo-1529336953121-adb2bcd0f5d6?q=80&w=1600&auto=format&fit=crop",
  });
  const summary = t(`${ns}.summary`, {
    defaultValue:
      "I designed a compact design system in Figma (tokens, components, variants) and worked closely with developers to ship a clean, responsive marketing site fast.",
  });
  const role = t(`${ns}.role`, { defaultValue: "Product Designer" });
  const timeframe = t(`${ns}.timeframe`, { defaultValue: "2023–2024" });
  const team = t(`${ns}.team`, { defaultValue: "Me (Design) + 2 Developers" });

  const tools = t(`${ns}.tools`, {
    returnObjects: true,
    defaultValue: [
      "Figma",
      "Design Tokens",
      "Auto-layout",
      "Component Variants",
    ],
  });
  const responsibilities = t(`${ns}.responsibilities`, {
    returnObjects: true,
    defaultValue: [
      "Audit + define brand typography, color, and spacing tokens",
      "Build reusable components (nav, hero, feature cards, CTA)",
      "Create responsive specs; annotate states and breakpoints",
      "Async collaboration: comments, versioning, handoff",
    ],
  });
  const problems = t(`${ns}.problems`, {
    returnObjects: true,
    defaultValue: [
      "Inconsistent UI across pages due to ad-hoc components",
      "Design-to-dev handoff slowed by unclear specs and states",
    ],
  });
  const solutions = t(`${ns}.solutions`, {
    returnObjects: true,
    defaultValue: [
      "Token-based design system with reusable, documented components",
      "Clear responsive specs + annotated states; tight async reviews",
    ],
  });
  const gallery = t(`${ns}.gallery`, {
    returnObjects: true,
    defaultValue: [
      "https://images.unsplash.com/photo-1555421689-43cad7100751?q=80&w=1200&auto=format&fit=crop",
    ],
  });
  const outcomes = t(`${ns}.outcomes`, {
    returnObjects: true,
    defaultValue: [
      "Reduced rework: devs reused components across 6 pages",
      "Faster iteration; consistent visuals + accessible contrast",
    ],
  });
  const links = t(`${ns}.links`, {
    returnObjects: true,
    defaultValue: [{ label: "Figma", href: "#" }],
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
      problems={problems}
      solutions={solutions}
      gallery={gallery}
      outcomes={outcomes}
      links={links}
    />
  );
}
