import {
  serializeJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  webApplicationJsonLd,
  websiteJsonLd,
  softwareApplicationJsonLd,
  howToJsonLd,
  type JsonLdObject,
} from "@/lib/seo/json-ld";
import type { ToolDefinition } from "@/types/tool";

interface JsonLdProps {
  objects: JsonLdObject[];
}

export function JsonLd({ objects }: JsonLdProps) {
  return (
    <>
      {objects.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(obj) }}
        />
      ))}
    </>
  );
}

export function OrganizationJsonLd() {
  return <JsonLd objects={[organizationJsonLd()]} />;
}

export function HomeJsonLd() {
  return <JsonLd objects={[organizationJsonLd(), websiteJsonLd()]} />;
}

export function ToolJsonLd({ tool }: { tool: ToolDefinition }) {
  const objects: JsonLdObject[] = [
    webApplicationJsonLd(tool),
    softwareApplicationJsonLd(tool),
    breadcrumbJsonLd(tool),
  ];

  if (tool.faq.length > 0) {
    objects.push(faqJsonLd(tool));
  }

  const howTo = howToJsonLd(tool);
  if (howTo) {
    objects.push(howTo);
  }

  return <JsonLd objects={objects} />;
}
