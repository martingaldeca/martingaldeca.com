import ProjectsTemplate from "@/components/templates/ProjectsTemplate";
import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("Projects.metaTitle"),
    description: t("Projects.metaDescription"),
    alternates: {
      canonical: `https://martingaldeca.com/${locale}/projects`,
      languages: {
        en: "https://martingaldeca.com/en/projects",
        es: "https://martingaldeca.com/es/projects",
      },
    },
  };
}

export default function ProjectsPage() {
  return <ProjectsTemplate />;
}
