import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTool, tools, categoryMeta } from "@/lib/tools/registry";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { ToolJsonLd } from "@/components/seo/json-ld";
import { ToolComponent } from "@/components/pdf/tools";
import { ToolBreadcrumbs, ToolHero, HowItWorks } from "@/components/tools/tool-hero";
import { ToolFaq } from "@/components/tools/tool-faq";
import { RelatedTools } from "@/components/tools/related-tools";
import { TrustSignals } from "@/components/tools/trust-signals";
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

  const howItWorkSteps: Record<string, string[]> = {
    "word-to-pdf": [
      "Upload or drop your DOCX/DOC file",
      "Adjust page size, margins and orientation",
      "Download your PDF instantly",
    ],
    "pdf-to-word": [
      "Upload or drop your PDF file",
      "Wait while we extract the text and structure",
      "Download your editable DOCX file",
    ],
    "pdf-to-html": [
      "Upload or drop your PDF file",
      "We extract text and detect document structure",
      "Download your HTML file instantly",
    ],
    "pdf-to-markdown": [
      "Upload or drop your PDF file",
      "We extract text and convert headings automatically",
      "Download your Markdown file",
    ],
    "pdf-to-csv": [
      "Upload or drop your PDF file",
      "We detect tables and extract data",
      "Download your CSV spreadsheet",
    ],
    "merge-pdf": [
      "Upload or drop multiple PDF files",
      "Drag to reorder them as you need",
      "Download the merged PDF instantly",
    ],
    "split-pdf": [
      "Upload or drop your PDF file",
      "Choose page ranges or extract per page",
      "Download your split files instantly",
    ],
    "compress-pdf": [
      "Upload or drop your PDF file",
      "Select compression level (low, medium, high)",
      "Download your compressed PDF instantly",
    ],
    "extract-pages": [
      "Upload or drop your PDF file",
      "Select the pages you want to extract",
      "Download your extracted pages instantly",
    ],
    "rearrange-pages": [
      "Upload or drop your PDF file",
      "Use arrows to reorder the pages",
      "Download your rearranged PDF instantly",
    ],
    "crop-pdf": [
      "Upload or drop your PDF file",
      "Choose a crop preset or set custom margins",
      "Download your cropped PDF instantly",
    ],
  };

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
        <TrustSignals />
        <HowItWorks steps={howItWorkSteps[tool.slug] ?? []} />
        <ToolFaq tool={tool} />
        <RelatedTools tool={tool} />
      </div>
    </div>
  );
}
