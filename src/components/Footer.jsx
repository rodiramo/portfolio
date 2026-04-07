import { useTheme } from "../theme.js";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = ({ isDarkMode }) => {
  const theme = useTheme(isDarkMode);
  const { t } = useTranslation("home");

  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "32px 16px",
        width: "100%",
        borderTop: `1px solid ${theme.colors.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.95rem",
          color: theme.colors.text.primary,
          opacity: 0.8,
        }}
      >
        © {year} {t("hero.name", { defaultValue: "Rocio Diaz Ramos" })}
      </p>

      {/* Links */}
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <a
          href="https://github.com/rodiramo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.colors.text.primary }}
        >
          <Github size={20} />
        </a>

        <a
          href="https://linkedin.com/in/rocio-diaz-ramos"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.colors.text.primary }}
        >
          <Linkedin size={20} />
        </a>

        <a
          href="mailto:ivemeyerrocio@gmail.com"
          style={{ color: theme.colors.text.primary }}
        >
          <Mail size={20} />
        </a>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: "0.85rem",
          opacity: 0.6,
        }}
      >
        {t("footer.tagline", {
          defaultValue: "Designed & built with care",
        })}
      </p>
    </footer>
  );
};

export default Footer;
