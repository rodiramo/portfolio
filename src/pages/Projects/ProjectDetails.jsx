// src/pages/Projects/ProjectDetails.jsx
import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CaseStudyLayout from "./case-study/CaseStudyLayout.jsx";
import TopBar from "../../components/TopBar.jsx";

export default function ProjectDetail({ isDarkMode = false, setIsDarkMode }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("projects");
  const ns = `cases.${slug}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Base fields
  const title = t(`${ns}.title`, { defaultValue: "" });
  const subtitle = t(`${ns}.subtitle`, { defaultValue: "" });
  const coverImage = t(`${ns}.coverImage`, {
    returnObjects: true,
    defaultValue: [],
  });
  const summary = t(`${ns}.summary`, { defaultValue: "" });
  const role = t(`${ns}.role`, { defaultValue: "" });
  const timeframe = t(`${ns}.timeframe`, { defaultValue: "" });
  const team = t(`${ns}.team`, { defaultValue: "" });

  // Arrays
  const tools = t(`${ns}.tools`, { returnObjects: true, defaultValue: [] });
  const responsibilities = t(`${ns}.responsibilities`, {
    returnObjects: true,
    defaultValue: [],
  });
  const problems = t(`${ns}.problems`, {
    returnObjects: true,
    defaultValue: [],
  });
  const solutions = t(`${ns}.solutions`, {
    returnObjects: true,
    defaultValue: [],
  });
  const gallery = t(`${ns}.gallery`, { returnObjects: true, defaultValue: [] });
  const outcomes = t(`${ns}.outcomes`, {
    returnObjects: true,
    defaultValue: [],
  });
  const links = t(`${ns}.links`, { returnObjects: true, defaultValue: [] });

  // Extended fields
  const goals = t(`${ns}.goals`, { returnObjects: true, defaultValue: [] });
  const process = t(`${ns}.process`, { returnObjects: true, defaultValue: [] });
  const brand = t(`${ns}.brand`, { returnObjects: true, defaultValue: {} });
  const teamMembers = t(`${ns}.teamMembers`, {
    returnObjects: true,
    defaultValue: [],
  });
  const marketing = t(`${ns}.marketing`, {
    returnObjects: true,
    defaultValue: [],
  });
  const merchandising = t(`${ns}.merchandising`, {
    returnObjects: true,
    defaultValue: [],
  });
  const metrics = t(`${ns}.metrics`, {
    returnObjects: true,
    defaultValue: [],
  });
  const nextSteps = t(`${ns}.nextSteps`, {
    returnObjects: true,
    defaultValue: [],
  });

  const hasCase = Boolean(title);
  console.log("coverImage:", coverImage);
  console.log(
    "keys under cases.navippon =",
    t("cases.navippon", { returnObjects: true })
  );

  // Fallback from cards[]
  const rawCards = t("cards", { returnObjects: true });
  const cards = Array.isArray(rawCards)
    ? rawCards
    : rawCards && typeof rawCards === "object"
    ? Object.values(rawCards)
    : [];
  const card = useMemo(
    () => (!hasCase ? cards.find((c) => c.slug === slug) : null),
    [hasCase, cards, slug]
  );

  if (!hasCase && !card) {
    return (
      <>
        <TopBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
          <p style={{ marginBottom: 12 }}>Case study not found for “{slug}”.</p>
          <button onClick={() => navigate(-1)}>← Back</button>
        </div>
      </>
    );
  }

  const data = hasCase
    ? {
        title,
        subtitle,
        coverImage,
        summary,
        role,
        timeframe,
        team,
        tools,
        responsibilities,
        problems,
        solutions,
        gallery,
        outcomes,
        links,
        // extended
        goals,
        process,
        brand,
        teamMembers,
        marketing,
        merchandising,
        metrics,
        nextSteps,
      }
    : {
        title: card.title,
        subtitle: "",
        coverImage: card.coverSrc || "",
        summary: card.description || "",
        role: "",
        timeframe: "",
        team: "",
        tools: card.tech || [],
        responsibilities: [],
        problems: [],
        solutions: [],
        gallery: card.coverSrc ? [card.coverSrc] : [],
        outcomes: [],
        links: [
          ...(card.liveLink
            ? [{ label: "Live", href: card.liveLink, kind: "live" }]
            : []),
          ...(card.repoLink
            ? [{ label: "GitHub", href: card.repoLink, kind: "repo" }]
            : []),
        ],
        // empty extended
        goals: [],
        process: [],
        brand: {},
        teamMembers: [],
        marketing: [],
        merchandising: [],
        metrics: [],
        nextSteps: [],
      };

  return (
    <>
      <TopBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <CaseStudyLayout
        isDarkMode={isDarkMode}
        onBack={() => navigate(-1)}
        {...data}
      />
    </>
  );
}
