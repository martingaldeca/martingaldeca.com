"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import "./ThemeSwitch.css";


const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="theme-switch"
      data-theme={theme}
    >
      {}
      <span className="theme-switch__track" />

      {}
      <motion.span
        className="theme-switch__thumb"
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon size={12} strokeWidth={2.5} className="theme-switch__icon" />
        ) : (
          <Sun size={12} strokeWidth={2.5} className="theme-switch__icon" />
        )}
      </motion.span>
    </button>
  );
};

export default ThemeSwitch;
