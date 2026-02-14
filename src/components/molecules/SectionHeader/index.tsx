"use client";

import React from "react";
import AnimatedGradient from "@/components/atoms/AnimatedGradient";
import "./SectionHeader.css";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  
  children?: React.ReactNode;
  
  gradientColors?: string[];
  
  gradientSpeed?: number;
}


const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  children,
  gradientColors,
  gradientSpeed = 14,
}) => {
  const words = title.split(" ");
  const lastWord = words.pop();
  const leadingWords = words.join(" ");

  return (
    <div className="section-header">
      <AnimatedGradient
        colors={gradientColors}
        speed={gradientSpeed}
        blur={100}
      />
      <div className="section-header__content">
        <h2 className="section-header__title">
          {leadingWords && <span>{leadingWords} </span>}
          <span className="text-accent">{lastWord}</span>
        </h2>
        {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default SectionHeader;
