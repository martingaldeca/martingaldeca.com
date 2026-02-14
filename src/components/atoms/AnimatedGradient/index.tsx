"use client";

import React, { useEffect, useRef } from "react";
import "./AnimatedGradient.css";

interface AnimatedGradientProps {
  className?: string;
  colors?: string[];
  speed?: number;
  blur?: number;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  className = "",
  colors = ["#0F4C81", "#FF7E21", "#1a6bba", "#FF5722", "#0F4C81"],
  speed = 12,
  blur = 80,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.style.setProperty("--ag-speed", `${speed}s`);
      el.style.setProperty("--ag-blur", `${blur}px`);
    }
  }, [speed, blur]);

  return (
    <div
      ref={containerRef}
      className={`animated-gradient ${className}`}
      aria-hidden="true"
    >
      {colors.map((color, i) => (
        <span
          key={i}
          className="animated-gradient__blob"
          style={{
            background: color,
            animationDelay: `${-(speed / colors.length) * i}s`,
            left: `${(100 / (colors.length + 1)) * (i + 1)}%`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedGradient;
