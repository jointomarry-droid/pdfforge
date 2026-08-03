import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTool, tools } from "@/lib/tools/registry";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { ToolJsonLd } from "@/components/seo/json-ld";
import { ToolComponent } from "@/components/pdf/tools";
import { ToolBreadcrumbs, ToolHero, HowItWorks } from "@/components/tools/tool-hero";
import { ToolFaq } from "@/components/tools/tool-faq";
import { RelatedTools } from "@/components/tools/related-tools";
import { ToolCard } from "@/components/pdf/tool-shell";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return buildToolMetadata(tool);
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ToolJsonLd tool={tool} />
      <ToolBreadcrumbs tool={tool} />
      <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
        <ToolHero tool={tool} />
        <ToolCard className="lg:sticky lg:top-24">
          <ToolComponent tool={tool} />
        </ToolCard>
      </div>

      <div className="mt-12 space-y-12">
        <HowItWorks steps={[]} />
        <ToolFaq tool={tool} />
        <RelatedTools tool={tool} />
      </div>
    </div>
  );
}
