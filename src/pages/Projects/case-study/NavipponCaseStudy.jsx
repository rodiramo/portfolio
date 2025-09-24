// src/pages/Projects/case-study/NavipponCaseStudy.jsx
import React from "react";
import CaseStudyLayout from "./CaseStudyLayout.jsx";
import { useTranslation } from "react-i18next";

export default function NavipponCaseStudy({ isDarkMode = false, onBack }) {
  const { t } = useTranslation("projects");
  const ns = "cases.navippon";

  const data = {
    title: t(`${ns}.title`, { defaultValue: "Navippon" }),
    subtitle: t(`${ns}.subtitle`, {
      defaultValue: "Japan travel guide — discovery, itineraries, culture",
    }),
    coverImage: t(`${ns}.coverImage`, {
      defaultValue:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop",
    }),
    summary: t(`${ns}.summary`, {
      defaultValue:
        "Navippon helps travelers plan and explore Japan with curated POIs, map-based discovery, and day-by-day itineraries that balance culture, food, and logistics.",
    }),
    role: t(`${ns}.role`, { defaultValue: "Brand, Product, Design, Frontend" }),
    timeframe: t(`${ns}.timeframe`, { defaultValue: "2023–2024" }),
    team: t(`${ns}.team`, { defaultValue: "2 people" }),

    tools: t(`${ns}.tools`, {
      returnObjects: true,
      defaultValue: [
        "Figma",
        "React",
        "Node.js",
        "MongoDB",
        "Google Maps API",
        "Illustrator",
      ],
    }),

    responsibilities: t(`${ns}.responsibilities`, {
      returnObjects: true,
      defaultValue: [
        "Brand identity (logo, palette, typography, guidelines)",
        "UX flows: discovery, save, itinerary building, offline notes",
        "Responsive React UI, accessible components",
        "Content strategy & copy for POIs and cultural notes",
        "Launch assets: landing page, socials, merch mockups",
      ],
    }),

    problems: t(`${ns}.problems`, {
      returnObjects: true,
      defaultValue: [
        "Travel info scattered across tabs; hard to compare options",
        "Users over-plan days; no realistic time estimates",
        "Brand lacked a distinct voice among Japan travel guides",
      ],
    }),
    solutions: t(`${ns}.solutions`, {
      returnObjects: true,
      defaultValue: [
        "Unified map+list with curated POIs, filters, and collections",
        "Itinerary builder with route time estimates and pacing hints",
        "Warm, minimalist brand system with friendly editorial tone",
      ],
    }),

    gallery: t(`${ns}.gallery`, {
      returnObjects: true,
      defaultValue: [
        "/assets/navippon/brand-logo.png",
        "/assets/navippon/itinerary.png",
        "/assets/navippon/poi.png",
        "/assets/navippon/landing.png",
      ],
    }),

    outcomes: t(`${ns}.outcomes`, {
      returnObjects: true,
      defaultValue: [
        "MVP tested with 12 travelers; itinerary flow preferred vs spreadsheets",
        "Avg session ~5m during planning; repeat visits across 2 weeks",
        "Clear roadmap: budgets, JR rail passes, export/share",
      ],
    }),

    // --- NEW: full-stack case blocks ---
    goals: t(`${ns}.goals`, {
      returnObjects: true,
      defaultValue: [
        "Help travelers balance culture, food, and logistics in one view",
        "Make planning fast, visual, and shareable",
        "Create a brand that feels friendly, modern, and trustworthy",
      ],
    }),

    process: t(`${ns}.process`, {
      returnObjects: true,
      defaultValue: [
        {
          title: "Discovery",
          note: "Traveler interviews; pain points; must-have features",
        },
        { title: "Brand", note: "Logo, palette, typography, tone; guidelines" },
        {
          title: "Design",
          note: "Flows, wireframes, high-fidelity UI; components",
        },
        { title: "Build", note: "React + Maps; Node/Mongo; offline notes" },
        { title: "Content", note: "POI curation, copy, photography" },
        { title: "Launch", note: "Landing page, socials, merch mockups" },
      ],
    }),

    brand: t(`${ns}.brand`, {
      returnObjects: true,
      defaultValue: {
        logo: "/assets/navippon/brand-logo.png",
        guideLink: "#",
        palette: [
          { name: "Primary", value: "#E11D48" },
          { name: "Ink", value: "#111827" },
          { name: "Cloud", value: "#F3F4F6" },
          { name: "Accent", value: "#2563EB" },
        ],
        typefaces: ["Heading: Inter SemiBold", "Body: Inter Regular"],
      },
    }),

    marketing: t(`${ns}.marketing`, {
      returnObjects: true,
      defaultValue: [
        "Landing page A/B: hero headline vs benefit stack",
        "IG reels focusing on neighborhoods + food routes",
        "Email capture with teaser itineraries (3-city sample)",
      ],
    }),

    merchandising: t(`${ns}.merchandising`, {
      returnObjects: true,
      defaultValue: [
        "/assets/navippon/merch-sticker.png",
        "/assets/navippon/merch-tote.png",
        "/assets/navippon/merch-pins.png",
      ],
    }),

    metrics: t(`${ns}.metrics`, {
      returnObjects: true,
      defaultValue: [
        "CTR +38% on benefit-led hero",
        "Email capture 6.4% (itinerary teaser)",
        "Saved POIs per user: median 14",
      ],
    }),

    nextSteps: t(`${ns}.nextSteps`, {
      returnObjects: true,
      defaultValue: [
        "Budget planner with rail pass suggestions",
        "Share/export itineraries (PDF + link)",
        "Crowd curation for seasonal tips",
      ],
    }),
  };

  return <CaseStudyLayout isDarkMode={isDarkMode} onBack={onBack} {...data} />;
}
