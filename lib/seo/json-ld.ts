import type { ToolDefinition } from "@/types/tool";
import { siteConfig } from "@/lib/config/site";

const ESCAPE = /</g;

function safe(value: unknown): unknown {
  if (typeof value === "string") return value.replace(ESCAPE, "\\u003c");
  return value;
}

export interface JsonLdObject {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

/**
 * Serialize a JSON-LD object safely for injection into a `<script>` tag.
 * See https://nextjs.org/docs/app/guides/json-ld
 */
export function serializeJsonLd(obj: JsonLdObject): string {
  return JSON.stringify(obj).replace(ESCAPE, "\\u003c");
}

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@example.com",
      url: siteConfig.url,
    },
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webApplicationJsonLd(tool: ToolDefinition): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: `${siteConfig.url}/tools/${tool.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description: tool.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}

export function faqJsonLd(tool: ToolDefinition): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((f) => ({
      "@type": "Question",
      name: safe(f.q),
      acceptedAnswer: {
        "@type": "Answer",
        text: safe(f.a),
      },
    })),
  };
}

export function breadcrumbJsonLd(tool: ToolDefinition): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Tools",
        item: `${siteConfig.url}/tools`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tool.name,
        item: `${siteConfig.url}/tools/${tool.slug}`,
      },
    ],
  };
}
