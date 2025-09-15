import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultDark={false} persistKey="theme:pref">
    <App />
  </ThemeProvider>
);
