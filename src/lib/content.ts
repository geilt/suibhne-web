import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  order?: number;
}

export interface ContentItem extends ContentMeta {
  content: string;
}

export function getContentList(type: "journey" | "library"): ContentMeta[] {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  const items = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(dir, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      order: data.order,
    };
  });

  // Sort: journey by date desc, library by order or title
  if (type === "journey") {
    return items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return items.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined)
      return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

export function getContentBySlug(
  type: "journey" | "library",
  slug: string
): ContentItem | null {
  const dir = path.join(contentDirectory, type);
  const fullPath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    order: data.order,
    content,
  };
}

export function getAllSlugs(type: "journey" | "library"): string[] {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
