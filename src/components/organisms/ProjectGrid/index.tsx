"use client";

import React from "react";
import { useTranslations } from "next-intl";
import ProjectCard from "@/components/molecules/ProjectCard";
import SectionHeader from "@/components/molecules/SectionHeader";

import atlasImg from "@/assets/projects/ideological-atlas/cover.png";
import debaiteImg from "@/assets/projects/debaite/cover.png";
import katiaImg from "@/assets/projects/katia/cover.png";
import restcountriesImg from "@/assets/projects/rest-countries/cover.png";
import housecheckerImg from "@/assets/projects/house-checker/cover.png";
import semanticImg from "@/assets/projects/semantic-version-tool/cover.png";

const projectsMeta = [
  {
    key: "atlas" as const,
    image: atlasImg,
    githubUrl: "https://github.com/Ideological-Atlas",
    liveUrl: "https://www.ideologicalatlas.com/es",
    tags: ["React", "D3.js", "Graph Theory", "Politics"],
  },
  {
    key: "debaite" as const,
    image: debaiteImg,
    githubUrl: "https://github.com/martingaldeca/Debaite",
    tags: ["Next.js", "OpenAI API", "Tailwind", "AI"],
  },
  {
    key: "katia" as const,
    image: katiaImg,
    githubUrl: "https://github.com/martingaldeca/Katia",
    tags: ["Python", "NLP", "Automation", "Voice"],
  },
  {
    key: "restcountries" as const,
    image: restcountriesImg,
    githubUrl: "https://github.com/martingaldeca/restcountries_cli",
    tags: ["Rust", "CLI", "API", "Performance"],
  },
  {
    key: "housechecker" as const,
    image: housecheckerImg,
    githubUrl: "https://github.com/martingaldeca/HouseChecker",
    tags: ["n8n", "Automation", "Web Scraping", "No-Code"],
  },
  {
    key: "semantic" as const,
    image: semanticImg,
    githubUrl: "https://github.com/martingaldeca/SemanticVersionNumberTool",
    tags: ["DevOps", "CI/CD", "Git", "Tooling"],
  },
];

const ProjectGrid = () => {
  const t = useTranslations("Projects");

  return (
    <section className="py-32 px-4 relative z-10" id="projects">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          gradientColors={[
            "#0F4C81",
            "#1a6bba",
            "#FF7E21",
            "#0a3660",
            "#FF5722",
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsMeta.map((project, i) => (
            <div
              key={project.key}
              className="opacity-0 animate-fade-in-up"
              style={{
                animationFillMode: "forwards",
                animationDelay: `${0.1 * (i + 1)}s`,
              }}
            >
              <ProjectCard
                title={t(`items.${project.key}.title`)}
                description={t(`items.${project.key}.description`)}
                image={project.image}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                tags={project.tags}
                viewCodeLabel={t("viewCode")}
                visitWebsiteLabel={t("visitWebsite")}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
             `}</style>
    </section>
  );
};

export default ProjectGrid;
