import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  dayLabel?: string;
  description?: string;
  order?: number;
  // Naonúr-specific fields
  pronunciation?: string;
  gaelicNumber?: string;
  role?: string;
  element?: string;
  elementIrish?: string;
  status?: "active" | "conceptual";
  image?: string;
  sigil?: string;
  sigilBlurb?: string;
}

export interface ContentItem extends ContentMeta {
  content: string;
  pronunciation?: string;
  gaelicNumber?: string;
  role?: string;
  element?: string;
  elementIrish?: string;
  status?: "active" | "conceptual";
  image?: string;
  sigil?: string;
  sigilBlurb?: string;
}

export function getContentList(type: "journey" | "library" | "naonur" | "dail"): ContentMeta[] {
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
      dayLabel: data.dayLabel || "",
      description: data.description || "",
      order: data.order,
      // Naonúr-specific
      pronunciation: data.pronunciation || "",
      gaelicNumber: data.gaelicNumber || "",
      role: data.role || "",
      element: data.element || "",
      elementIrish: data.elementIrish || "",
      status: data.status || "conceptual",
      image: data.image || "",
      sigil: data.sigil || "",
      sigilBlurb: data.sigilBlurb || "",
    };
  });

  // Sort: journey by date desc, dail by order (chronological), library/naonur by order or title
  if (type === "journey") {
    return items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  if (type === "dail") {
    return items.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined)
        return a.order - b.order;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }
  // Library and naonur sort by order, then title
  return items.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined)
      return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

export function getContentBySlug(
  type: "journey" | "library" | "naonur" | "dail",
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
    dayLabel: data.dayLabel || "",
    description: data.description || "",
    order: data.order,
    content,
    // Naonúr-specific
    pronunciation: data.pronunciation || "",
    gaelicNumber: data.gaelicNumber || "",
    role: data.role || "",
    element: data.element || "",
    elementIrish: data.elementIrish || "",
    status: data.status || "conceptual",
    image: data.image || "",
    sigil: data.sigil || "",
    sigilBlurb: data.sigilBlurb || "",
  };
}

export function getAllSlugs(type: "journey" | "library" | "naonur" | "dail"): string[] {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
