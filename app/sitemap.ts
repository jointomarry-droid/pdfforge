import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config/site";
import { tools } from "@/lib/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/tools",
    "/pricing",
    "/docs",
    "/contact",
    "/privacy",
    "/terms",
    "/blog",
    "/about",
    "/faq",
    "/compare",
    "/use-cases/students",
    "/use-cases/lawyers",
    "/use-cases/business",
    "/use-cases/healthcare",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  for (const tool of tools) {
    entries.push({
      url: `${base}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
