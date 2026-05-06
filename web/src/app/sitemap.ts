import type { MetadataRoute } from "next";

const siteUrl = "https://experiencekit.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/kits`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/find-my-kit`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/studio`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/missions`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteUrl}/schools`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteUrl}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/track`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/orders`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
