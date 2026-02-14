import fs from "fs";
import path from "path";
import { essaysMetadata, EssayMetadata } from "./essays-data";

export { essaysMetadata, type EssayMetadata };

export function getEssayContent(slug: string): string {
  const filePath = path.join(process.cwd(), "src/content/essays", `${slug}.md`);
  try {
    if (!fs.existsSync(filePath)) {
      return "";
    }
    return fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error(`Error reading essay ${slug}:`, e);
    return "";
  }
}

export function getAllEssaySlugs(): string[] {
  return essaysMetadata.map((e) => e.slug);
}

export function getEssayMetadata(slug: string): EssayMetadata | undefined {
  return essaysMetadata.find((e) => e.slug === slug);
}
