"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import MagneticBackground from "@/components/molecules/MagneticBackground";
import RippleButton from "@/components/atoms/Button/RippleButton";
import SplitText from "@/components/atoms/Typography/SplitText";
import TypewriterText from "@/components/atoms/Typography/TypewriterText";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Github, href: "https://github.com/martingaldeca", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mart%C3%ADn-galdeano-ca%C3%B1izares-baa099155/",
    label: "LinkedIn",
  },
];

const Hero = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <MagneticBackground />

      <div className="relative z-10 text-center w-full max-w-7xl px-4 flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] text-text-primary mb-8">
            <SplitText text={t("name")} /> <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block">
              <SplitText text={t("surname")} delay={0.2} />
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-6 max-w-3xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-text-secondary mb-4 flex items-center gap-3">
            {t("title")}
          </h2>
          <div className="text-base md:text-xl lg:text-2xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
            <p>
              <TypewriterText text={t("tagline1")} delay={1.5} />
            </p>
            <p className="mt-2 opacity-80 block">
              <TypewriterText text={t("tagline2")} delay={3.5} />
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <RippleButton href={`/${locale}/projects`} variant="primary">
            {t("viewWork")}
            <span className="text-xl ml-1">→</span>
          </RippleButton>
          <RippleButton href="#about" variant="secondary">
            {t("aboutMe")}
          </RippleButton>
        </div>

        <div className="flex gap-10 mt-12">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent hover:scale-110 transition-all duration-200"
              aria-label={label}
            >
              <Icon size={36} strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
