import type { MetadataRoute } from "next";

const siteUrl = "https://experiencekit.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/kits`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/track`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/orders`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
