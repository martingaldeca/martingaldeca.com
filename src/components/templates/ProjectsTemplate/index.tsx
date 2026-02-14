"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/organisms/Header";
import ProjectGrid from "@/components/organisms/ProjectGrid";

const ProjectsTemplate = () => {
  const t = useTranslations("Footer");

  return (
    <div className="flex flex-col min-h-screen font-sans text-text-primary bg-bg overflow-x-hidden">
      <Header />
      <main className="flex-grow pt-24 pb-20 relative">
        {}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10" />

        <ProjectGrid />
      </main>
      <footer
        className="py-8 text-center text-text-secondary text-sm bg-background"
        style={{
          borderTop: "1px solid var(--surface-border)",
          backgroundColor: "var(--background)",
        }}
      >
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
};

export default ProjectsTemplate;
