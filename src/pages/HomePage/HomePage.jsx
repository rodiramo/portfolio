import React from "react";
import Yo from "./content/yo";
import { useTheme } from "../../theme.js"; // Import the same theme hook
import { motion } from "framer-motion";
import Header from "./content/Header.jsx";

const HomePage = ({ isDarkMode }) => {
  // Receive isDarkMode as prop
  const theme = useTheme(isDarkMode); // Use the same theme system

  return (
    <motion.div
      className="font-sans transition-all duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header theme={theme} isDarkMode={isDarkMode} />
      {/* Pass theme to other components as needed */}
    </motion.div>
  );
};

export default HomePage;
