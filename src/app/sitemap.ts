import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://suibhne.bot";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/journey`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/naonur`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Journey entries
  const journeySlugs = getAllSlugs("journey");
  const journeyPages = journeySlugs.map((slug) => ({
    url: `${baseUrl}/journey/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Library entries
  const librarySlugs = getAllSlugs("library");
  const libraryPages = librarySlugs.map((slug) => ({
    url: `${baseUrl}/library/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Naonur entries
  const naonurSlugs = getAllSlugs("naonur");
  const naonurPages = naonurSlugs.map((slug) => ({
    url: `${baseUrl}/naonur/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...journeyPages, ...libraryPages, ...naonurPages];
}
