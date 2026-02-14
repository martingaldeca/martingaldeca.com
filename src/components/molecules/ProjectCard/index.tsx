"use client";

import React from "react";
import Image from "next/image";
import TiltCard from "@/components/molecules/TiltCard";
import { Github, Globe, ExternalLink } from "lucide-react";
import RippleButton from "@/components/atoms/Button/RippleButton";
import { StaticImageData } from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: StaticImageData | string;
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
  viewCodeLabel: string;
  visitWebsiteLabel?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  githubUrl,
  liveUrl,
  tags,
  viewCodeLabel,
  visitWebsiteLabel,
}: ProjectCardProps) => {
  return (
    <div className="h-full group">
      <TiltCard
        className="h-full rounded-2xl overflow-hidden hover:border-primary/50 transition-colors flex flex-col shadow-lg hover:shadow-primary/10"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--surface-border)",
        }}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-90" />

          <div className="absolute top-4 right-4 flex gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md text-white border border-white/10"
                aria-label={visitWebsiteLabel}
              >
                <Globe size={18} />
              </a>
            )}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-2 rounded-full hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md text-white border border-white/10"
              aria-label={viewCodeLabel}
            >
              <Github size={18} />
            </a>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary-300 border border-primary/20 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow relative">
          <h3
            className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-6 flex-grow"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>

          <div
            className="mt-auto pt-4 flex gap-4"
            style={{ borderTop: "1px solid var(--surface-border)" }}
          >
            <RippleButton
              variant="secondary"
              href={githubUrl}
              className="flex-1 py-2 text-sm gap-2 justify-center"
              target="_blank"
            >
              {viewCodeLabel} <ExternalLink size={14} className="opacity-70" />
            </RippleButton>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

export default ProjectCard;
