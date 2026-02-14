import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEssayContent, getEssayMetadata } from "@/lib/essays";
import "katex/dist/katex.min.css";
import "./essay.css";

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Personal.essayList" });
  const metadata = getEssayMetadata(slug);

  if (!metadata) {
    return {
      title: "Log In | Martín Galdeano Cañizares", 
    };
  }

  const title = t(`${slug}.title`);
  const summary = t(`${slug}.summary`);

  return {
    title: `${title} | Martín Galdeano Cañizares`,
    description: summary,
    openGraph: {
      title: title,
      description: summary,
      type: "article",
      images: [metadata.cover],
      publishedTime: metadata.date,
      locale: locale === "es" ? "es_ES" : "en_US",
      siteName: "Martín Galdeano Cañizares",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: summary, 
      images: [metadata.cover],
    },
    alternates: {
      canonical: `https://martingaldeca.com/${locale}/personal/essays/${slug}`,
      languages: {
        en: `https://martingaldeca.com/en/personal/essays/${slug}`,
        es: `https://martingaldeca.com/es/personal/essays/${slug}`,
      },
    },
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = getEssayContent(slug);
  const metadata = getEssayMetadata(slug);

  if (!content || !metadata) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Personal.essayList" });

  const title = t(`${slug}.title`);
  const date = t(`${slug}.date`);

  return (
    <article className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 md:px-8">
      <div className="essay-container">
        <Link
          href={`/${locale}/personal`}
          className="inline-flex items-center text-text-secondary hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft
            size={20}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          {locale === "es" ? "Volver a Personal" : "Back to Personal"}
        </Link>

        <header className="essay-header">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: title,
                image: [`https://martingaldeca.com${metadata.cover}`],
                datePublished: metadata.date,
                author: [
                  {
                    "@type": "Person",
                    name: "Martín Galdeano Cañizares",
                    url: "https://martingaldeca.com",
                  },
                ],
              }),
            }}
          />
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-primary/10">
            <Image
              src={metadata.cover}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>

          <h1 className="essay-title">{title}</h1>
          <div className="essay-meta">
            <time dateTime={metadata.date}>{date}</time>
            <span className="meta-dot" />
            <span className="meta-type">
              {locale === "es" ? "Ensayo" : "Essay"}
            </span>
          </div>
        </header>

        <div className="essay-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
