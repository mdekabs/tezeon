import type { MetadataRoute } from "next";

import { COMPANY } from "@/lib/data";

/**
 * XML sitemap mirroring the legacy `sitemap.xml` route set, priorities and
 * change frequencies.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.siteUrl;

  return [
    {
      url: `${base}/`,
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/team`,
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/gallery`,
      lastModified: new Date("2026-06-05"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date("2026-06-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}