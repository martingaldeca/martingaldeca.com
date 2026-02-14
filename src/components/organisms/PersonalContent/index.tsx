"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  BookOpen,
  Music,
  PenLine,
  ChevronDown,
  Moon,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "@/components/molecules/MusicPlayer";
import SectionHeader from "@/components/molecules/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { essaysMetadata } from "@/lib/essays-data";


import laLunaCover from "@/assets/music/la-luna-cover.jpg";
import libreCover from "@/assets/music/libre-cover.jpeg";

const poemKeys = ["la-luna", "libre"] as const;
const songKeys = ["la-luna", "libre"] as const;

const songAssets = {
  "la-luna": {
    cover: laLunaCover,
    src: "/music/la-luna.mp3",
  },
  libre: {
    cover: libreCover,
    src: "/music/libre.mp3",
  },
};

const PersonalContent = () => {
  const t = useTranslations("Personal");
  const locale = useLocale();

  
  
  const [expandedSection, setExpandedSection] = useState<
    "poetry" | "essays" | "music" | null
  >("poetry");
  const [expandedPoem, setExpandedPoem] = useState<string | null>(null);

  const toggleSection = (section: "poetry" | "essays" | "music") => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const sections = [
    {
      key: "poetry" as const,
      label: t("poetry"),
      icon: PenLine,
      intro: t("poetryIntro"),
    },
    {
      key: "essays" as const,
      label: t("essays"),
      icon: BookOpen,
      intro: t("essaysIntro"),
    },
    {
      key: "music" as const,
      label: t("music"),
      icon: Music,
      intro: t("musicIntro"),
    },
  ];

  return (
    <section className="py-32 px-4 relative z-10" id="personal">
      <div className="max-w-4xl mx-auto">
        {}
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          gradientColors={[
            "#FF7E21",
            "#0F4C81",
            "#FF5722",
            "#1a6bba",
            "#FF7E21",
          ]}
        >
          <div className="inline-block px-4 py-2 mt-4 rounded-lg bg-primary/10 border border-primary/20 text-primary-300 text-sm font-medium backdrop-blur-sm shadow-lg shadow-primary/5">
            ✨ {t("handmadeDisclaimer")}
          </div>
        </SectionHeader>

        {}
        <div className="space-y-6">
          {sections.map(({ key, label, icon: Icon, intro }) => {
            const isOpen = expandedSection === key;

            return (
              <div
                key={key}
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  border: `1px solid ${isOpen ? "var(--color-primary)" : "var(--surface-border)"}`,
                  backgroundColor: isOpen ? "var(--surface)" : "transparent",
                  boxShadow: isOpen
                    ? "0 10px 25px -3px rgba(0,0,0,0.15)"
                    : "none",
                }}
              >
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full flex items-center justify-between p-6 text-left group focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-xl transition-colors"
                      style={{
                        backgroundColor: isOpen
                          ? "var(--color-primary)"
                          : "var(--surface)",
                        color: isOpen ? "#fff" : "var(--text-secondary)",
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2
                        className="text-xl font-bold transition-colors"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {label}
                      </h2>
                      {!isOpen && (
                        <p className="text-sm text-text-secondary font-light mt-1 hidden sm:block">
                          {intro}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-text-secondary transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        className="p-6 pt-0"
                        style={{ borderTop: "1px solid var(--surface-border)" }}
                      >
                        <p className="text-text-secondary italic mb-8 mt-4 pl-4 border-l-2 border-primary/30 text-sm md:text-base">
                          {intro}
                        </p>

                        {}

                        {}
                        {key === "poetry" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {poemKeys.map((pkey) => {
                              const isPoemExpanded = expandedPoem === pkey;
                              return (
                                <div
                                  key={pkey}
                                  className={`rounded-xl p-6 transition-all duration-300 cursor-pointer ${isPoemExpanded ? "md:col-span-2 ring-1 ring-primary/20 shadow-xl" : ""}`}
                                  style={{
                                    backgroundColor: isPoemExpanded
                                      ? "var(--surface-hover)"
                                      : "var(--surface)",
                                    border: "1px solid var(--surface-border)",
                                  }}
                                  onClick={() =>
                                    setExpandedPoem(
                                      isPoemExpanded ? null : pkey,
                                    )
                                  }
                                >
                                  <div className="flex items-start justify-between mb-4">
                                    <div>
                                      <h3
                                        className="text-lg font-bold transition-colors"
                                        style={{ color: "var(--text-primary)" }}
                                      >
                                        {t(`poems.${pkey}.title`)}
                                      </h3>
                                      <p className="text-xs text-text-secondary mt-1">
                                        {t(`poems.${pkey}.author`)}
                                        {t(`poems.${pkey}.year`) &&
                                          ` · ${t(`poems.${pkey}.year`)}`}
                                      </p>
                                    </div>
                                    <Moon
                                      size={16}
                                      className={`text-primary/50 mt-1 transition-transform duration-300 ${isPoemExpanded ? "rotate-[360deg] text-primary" : ""}`}
                                    />
                                  </div>

                                  {isPoemExpanded ? (
                                    <div
                                      className="mt-4 font-serif text-base leading-loose whitespace-pre-line pt-6 animate-fade-in"
                                      style={{
                                        color: "var(--text-secondary)",
                                        borderTop:
                                          "1px solid var(--surface-border)",
                                      }}
                                    >
                                      {t(`poems.${pkey}.body`)}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500 text-sm mt-2 line-clamp-3 leading-relaxed">
                                      {t(`poems.${pkey}.body`).split("\n")[0]}
                                      ...
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {}
                        {key === "essays" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {essaysMetadata.length > 0 ? (
                              essaysMetadata.map((essay) => {
                                const title = t(
                                  `essayList.${essay.slug}.title`,
                                );
                                const summary = t(
                                  `essayList.${essay.slug}.summary`,
                                );
                                const date =
                                  t(`essayList.${essay.slug}.date`) ||
                                  essay.date;

                                return (
                                  <Link
                                    key={essay.slug}
                                    href={`/${locale}/personal/essays/${essay.slug}`}
                                    className="group relative block h-full rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-primary/5"
                                    style={{
                                      backgroundColor: "var(--surface)",
                                      border: "1px solid var(--surface-border)",
                                    }}
                                  >
                                    <div className="relative h-48 w-full overflow-hidden">
                                      <Image
                                        src={essay.cover}
                                        alt={title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                      <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-xs text-white/70 font-mono mb-1">
                                          {date}
                                        </p>
                                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                          {title}
                                        </h3>
                                      </div>
                                    </div>
                                    <div className="p-6">
                                      <p className="text-sm text-text-secondary line-clamp-3 mb-4">
                                        {summary}
                                      </p>
                                      <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                                        Read Essay{" "}
                                        <ArrowRight
                                          size={16}
                                          className="ml-1"
                                        />
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })
                            ) : (
                              <div
                                className="col-span-full text-center py-10 rounded-xl border-dashed"
                                style={{
                                  backgroundColor: "var(--surface)",
                                  border: "1px dashed var(--surface-border)",
                                }}
                              >
                                <p className="text-text-secondary text-sm font-medium">
                                  {t("noEssays")}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {}
                        {key === "music" && (
                          <div className="grid grid-cols-1 gap-4">
                            {songKeys.map((sKey) => (
                              <MusicPlayer
                                key={sKey}
                                title={t(`songs.${sKey}.title`)}
                                description={t(`songs.${sKey}.description`)}
                                cover={songAssets[sKey].cover}
                                src={songAssets[sKey].src}
                              />
                            ))}

                            <div className="text-center mt-4">
                              <p className="text-xs text-text-secondary/40 font-mono tracking-widest uppercase">
                                (Powered by Suno AI)
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PersonalContent;
