import type { Metadata } from "next";

import { siteConfig } from "@/lib/config/site";
import type { ToolDefinition } from "@/types/tool";

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface SeoPage {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  robots?: Metadata["robots"];
}

export function buildMetadata({ title, description, path, keywords, robots }: SeoPage): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: absoluteUrl(siteConfig.ogImage), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
  };
}

export function buildToolMetadata(tool: ToolDefinition): Metadata {
  return buildMetadata({
    title: `${tool.name} — ${siteConfig.name}`,
    description: tool.description,
    path: `/tools/${tool.slug}`,
    keywords: [...tool.keywords, ...siteConfig.keywords],
  });
}
