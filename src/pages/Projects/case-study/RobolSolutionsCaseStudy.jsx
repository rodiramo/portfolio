// src/pages/Projects/case-study/RobolSolutionsCaseStudy.jsx
import React from "react";
import CaseStudyLayout from "./CaseStudyLayout.jsx";

export default function RobolSolutionsCaseStudy({
  isDarkMode = false,
  onBack,
}) {
  return (
    <CaseStudyLayout
      isDarkMode={isDarkMode}
      onBack={onBack}
      title="Robol Solutions"
      subtitle="Marketing site — design system + developer handoff"
      coverImage="https://images.unsplash.com/photo-1529336953121-adb2bcd0f5d6?q=80&w=1600&auto=format&fit=crop"
      summary="I designed a compact design system in Figma (tokens, components, variants) and worked closely with developers to ship a clean, responsive marketing site fast."
      role="Product Designer"
      timeframe="2023–2024"
      team="Me (Design) + 2 Developers"
      tools={["Figma", "Design Tokens", "Auto-layout", "Component Variants"]}
      responsibilities={[
        "Audit + define brand typography, color, and spacing tokens",
        "Build reusable components (nav, hero, feature cards, CTA)",
        "Create responsive specs; annotate states and breakpoints",
        "Async collaboration: comments, versioning, handoff",
      ]}
      gallery={[
        "https://images.unsplash.com/photo-1555421689-43cad7100751?q=80&w=1200&auto=format&fit=crop",
      ]}
      outcomes={[
        "Reduced rework: devs reused components across 6 pages",
        "Faster iteration; consistent visuals + accessible contrast",
      ]}
      links={[{ label: "Figma", href: "#" }]}
    />
  );
}
