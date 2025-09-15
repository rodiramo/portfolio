// src/pages/Projects/case-study/TopCarterasCaseStudy.jsx
import React from "react";
import CaseStudyLayout from "./CaseStudyLayout.jsx";

export default function TopCarterasCaseStudy({ isDarkMode = false, onBack }) {
  return (
    <CaseStudyLayout
      isDarkMode={isDarkMode}
      onBack={onBack}
      title="Top Carteras"
      subtitle="E-commerce UI for the Argentinian market"
      coverImage="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1600&auto=format&fit=crop"
      summary="E-commerce experience tailored to local patterns: category filters, PDP with variants, simple cart/checkout. Designed in Figma with componentized UI."
      role="Product Designer"
      timeframe="2024"
      team="Me (Design) + Client Stakeholder"
      tools={["Figma", "Variants", "Auto-layout", "Prototypes"]}
      responsibilities={[
        "PLP filters (price, color, material) and sorting",
        "PDP with variant selector, sizing tips, and shipping info",
        "Cart/checkout steps with clear progress and validation",
        "Design documentation for handoff",
      ]}
      gallery={[
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
      ]}
      outcomes={[
        "Cleaner browse-to-buy flow; reduced friction in PDP → cart",
        "Ready-to-build specs reduced dev questions",
      ]}
      links={[{ label: "Figma", href: "#" }]}
    />
  );
}
