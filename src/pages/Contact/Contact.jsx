import { useTheme } from "../../theme.js";
import { Mail, Globe } from "lucide-react";
const Contact = () => {
  const theme = useTheme();
  return (
    <div className="max-w-7xl mx-auto">
      <h2
        className="text-3xl lg:text-4xl font-bold mb-8"
        style={{ color: theme.colors.text.primary }}
      >
        Get in Touch
      </h2>
      <div
        className="p-6 rounded-xl shadow-sm"
        style={{
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <p
          className="text-lg leading-relaxed mb-6"
          style={{ color: theme.colors.text.primary }}
        >
          I'm always interested in hearing about new opportunities and exciting
          projects. Feel free to reach out if you'd like to collaborate or just
          say hello!
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            className="flex items-center px-6 py-3 rounded-lg transition-colors"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.text.inverse,
            }}
          >
            <Mail size={20} className="mr-2" />
            Email Me
          </button>
          <button
            className="flex items-center px-6 py-3 rounded-lg transition-colors border"
            style={{
              backgroundColor: "transparent",
              color: theme.colors.text.primary,
              borderColor: theme.colors.border,
            }}
          >
            <Globe size={20} className="mr-2" />
            LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};
export default Contact;
