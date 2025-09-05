import { useTheme } from "../../theme.js";

const Projects = () => {
  const theme = useTheme();
  return (
    <div className="max-w-7xl mx-auto">
      <h2
        className="text-3xl lg:text-4xl font-bold mb-8"
        style={{ color: theme.colors.text.primary }}
      >
        Projects
      </h2>

      {/* Navippon Project */}
      <div id="navippon" className="mb-12">
        <div
          className="p-6 rounded-xl shadow-sm"
          style={{
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <h3
            className="text-xl lg:text-2xl font-bold mb-4"
            style={{ color: theme.colors.primary }}
          >
            Navippon
          </h3>
          <div
            className="aspect-video rounded-lg mb-4 flex items-center justify-center"
            style={{ backgroundColor: theme.colors.secondary }}
          >
            <p style={{ color: theme.colors.text.secondary }}>Project Image</p>
          </div>
          <p
            className="mb-4 leading-relaxed"
            style={{ color: theme.colors.text.primary }}
          >
            Navippon is a comprehensive travel guide application for exploring
            Japan. Users can discover local attractions, plan detailed
            itineraries, and learn about Japanese culture through interactive
            features and curated content.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              React
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              Node.js
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              MongoDB
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              Google Maps API
            </span>
          </div>
          <button
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.text.inverse,
            }}
          >
            View Project
          </button>
        </div>
      </div>

      {/* Jumping Project */}
      <div id="jumping">
        <div
          className="p-6 rounded-xl shadow-sm"
          style={{
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <h3
            className="text-xl lg:text-2xl font-bold mb-4"
            style={{ color: theme.colors.primary }}
          >
            Jumping
          </h3>
          <div
            className="aspect-video rounded-lg mb-4 flex items-center justify-center"
            style={{ backgroundColor: theme.colors.secondary }}
          >
            <p style={{ color: theme.colors.text.secondary }}>Project Image</p>
          </div>
          <p
            className="mb-4 leading-relaxed"
            style={{ color: theme.colors.text.primary }}
          >
            Jumping is an innovative fitness tracking application focused on
            jump rope exercises. It accurately tracks workouts, calculates
            calories burned, and provides customized training plans based on
            user fitness levels and goals.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              React Native
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              Firebase
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              UI/UX Design
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              Health Kit
            </span>
          </div>
          <button
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.text.inverse,
            }}
          >
            View Project
          </button>
        </div>
      </div>
    </div>
  );
};
export default Projects;
