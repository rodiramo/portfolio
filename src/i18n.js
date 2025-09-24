import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const pickInitialLang = () => {
  const url = new URLSearchParams(window.location.search).get("lang");
  if (url) return url;
  const saved = localStorage.getItem("lng");
  if (saved) return saved;
  return (navigator.language || "en").slice(0, 2);
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
    lng: pickInitialLang(),
    fallbackLng: "en",
    ns: ["common", "home", "about", "skills", "projects"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    // debug: true, // enable while translating
  });

document.documentElement.lang = i18n.language;
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lng", lng);
  document.documentElement.lang = lng;
});

export default i18n;
