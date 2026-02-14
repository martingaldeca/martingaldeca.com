import { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";

const BASE_URL = "https://martingaldeca.com";
const LOCALES = ["en", "es"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/projects", "/personal"];

  const essaysDir = path.join(process.cwd(), "src/content/essays");
  let essaySlugs: string[] = [];
  try {
    const files = await fs.readdir(essaysDir);
    essaySlugs = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading essays directory:", error);
  }

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }

    for (const slug of essaySlugs) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/personal/essays/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}
