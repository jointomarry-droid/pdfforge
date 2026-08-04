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
  const title = tool.placeholder
    ? `${tool.name} — Free Online ${tool.name} Tool | ${siteConfig.name}`
    : `${tool.name} — Free Online ${tool.name} | ${siteConfig.name}`;

  const description = tool.placeholder
    ? `${tool.name} coming soon to ${siteConfig.name}. ${tool.description} Free, secure, no signup required. Try our other ${tool.category.replace(/-/g, " ")} tools now.`
    : `${tool.description} Free, fast, and secure. No signup required. Process files directly in your browser. Try ${tool.name} now on ${siteConfig.name}.`;

  const longTailKeywords = [
    `${tool.name.toLowerCase()} free online`,
    `${tool.name.toLowerCase()} no signup`,
    `${tool.name.toLowerCase()} no registration`,
    `free ${tool.name.toLowerCase()} tool`,
    `online ${tool.name.toLowerCase()} converter`,
    `${tool.name.toLowerCase()} browser based`,
    `${tool.name.toLowerCase()} without account`,
    `best ${tool.name.toLowerCase()} tool 2026`,
    `${tool.name.toLowerCase()} secure private`,
    `${tool.name.toLowerCase()} fast download`,
  ];

  return buildMetadata({
    title,
    description,
    path: `/tools/${tool.slug}`,
    keywords: [...tool.keywords, ...longTailKeywords, ...siteConfig.keywords],
  });
}
