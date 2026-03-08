"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button onClick={toggle} className="mode-toggle" aria-label="Toggle dark mode">
      {theme === "dark" ? "\u2600 day mode" : "\u263E night mode"}
    </button>
  );
}
