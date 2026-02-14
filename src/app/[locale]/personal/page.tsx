import PersonalTemplate from "@/components/templates/PersonalTemplate";
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
    title: t("Personal.metaTitle"),
    description: t("Personal.metaDescription"),
    alternates: {
      canonical: `https://martingaldeca.com/${locale}/personal`,
      languages: {
        en: "https://martingaldeca.com/en/personal",
        es: "https://martingaldeca.com/es/personal",
      },
    },
  };
}

export default function PersonalPage() {
  return <PersonalTemplate />;
}
