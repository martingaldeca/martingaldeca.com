"use client";

import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import TiltCard from "@/components/molecules/TiltCard";
import { Quote, Code, Users } from "lucide-react";
import profileImage from "@/assets/images/profile.jpg";

const About = () => {
  const t = useTranslations("About");
  const locale = useLocale();

  const engineeringSkills = [
    t("skills.fullstack"),
    t("skills.cloud"),
    t("skills.architecture"),
  ];

  const leadershipSkills = [
    t("skills.strategy"),
    t("skills.mentorship"),
    t("skills.agile"),
  ];

  return (
    <section
      className="py-32 px-4 relative"
      style={{ backgroundColor: "var(--background)" }}
      id="about"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-16 items-start">
        {}
        <div className="lg:sticky lg:top-32 flex flex-col gap-8">
          <div>
            <div className="text-primary font-bold tracking-wider uppercase text-sm mb-2">
              {t("title")}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              {t("heading1")} <br />{" "}
              <span className="text-accent italic">{t("heading2")}</span>
            </h2>
          </div>

          <div className="relative mb-8 group perspective-1000">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-30 blur-2xl group-hover:opacity-50 transition-all duration-500 rounded-xl" />
            <TiltCard
              className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl relative z-10"
              style={{ border: "1px solid var(--surface-border)" }}
            >
              <Image
                src={profileImage}
                alt="Martín Galdeano Cañizares"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </TiltCard>
          </div>

          <div
            className="p-6 rounded-xl relative backdrop-blur-sm"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--surface-border)",
            }}
          >
            <Quote className="text-primary opacity-50 mb-2 w-8 h-8" />
            <p className="italic text-text-secondary leading-relaxed">
              &ldquo;{t("quote")}&rdquo;
            </p>
          </div>
        </div>

        {}
        <div className="flex flex-col gap-12 text-lg text-text-secondary leading-relaxed font-light">
          <div className="flex flex-col gap-6">
            <p>{t("intro1", { name: "Martín" })}</p>
            <p>{t("intro2")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {}
            <div
              className="p-6 rounded-xl transition-all duration-300 group"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--surface-border)",
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Code size={20} />
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  {t("skillEngineering")}
                </h3>
              </div>
              <ul className="space-y-3">
                {engineeringSkills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3 text-sm">
                    <span className="text-accent mt-1">✓</span> {skill}
                  </li>
                ))}
              </ul>
            </div>

            {}
            <div
              className="p-6 rounded-xl transition-all duration-300 group"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--surface-border)",
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Users size={20} />
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  {t("skillLeadership")}
                </h3>
              </div>
              <ul className="space-y-3">
                {leadershipSkills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3 text-sm">
                    <span className="text-accent mt-1">✓</span> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pt-8"
            style={{ borderTop: "1px solid var(--surface-border)" }}
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6">
              {t("beyondCode")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: t("philosophyTitle"),
                  desc: t("philosophyDesc"),
                  img: "https://images.unsplash.com/photo-1543862475-eb136770ae9b?auto=format&fit=crop&q=80",
                },
                {
                  title: t("musicTitle"),
                  desc: t("musicDesc"),
                  img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80",
                },
                {
                  title: t("poetryTitle"),
                  desc: t("poetryDesc"),
                  img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80",
                },
              ].map((item) => (
                <a
                  href={`/${locale}/personal`}
                  key={item.title}
                  className="relative h-36 rounded-lg overflow-hidden group block"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 p-4 w-full z-10">
                    <span className="text-white font-bold block text-lg">
                      {item.title}
                    </span>
                    <span className="text-white/80 text-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 block">
                      {item.desc}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
