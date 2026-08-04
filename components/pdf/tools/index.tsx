"use client";

import { useMemo, useState } from "react";
import { Construction, Mail, CheckCircle2 } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";
import { MergeTool } from "@/components/pdf/tools/merge-tool";
import { SplitTool, PdfToTextTool, RotateTool } from "@/components/pdf/tools/split-tools";
import { CompressTool } from "@/components/pdf/tools/compress-tool";
import { ImagesToPdfTool } from "@/components/pdf/tools/images-to-pdf-tool";
import { PdfToImagesTool } from "@/components/pdf/tools/pdf-to-images-tool";
import { WatermarkTool, PageNumbersTool } from "@/components/pdf/tools/watermark-tools";
import { DeletePagesTool, RotatePagesTool } from "@/components/pdf/tools/delete-rotate-tools";
import { ImageConverterTool } from "@/components/pdf/tools/image-converter-tool";
import { TextToPdfTool } from "@/components/pdf/tools/text-tools";
import { WordToPdfTool } from "@/components/pdf/tools/word-to-pdf-tool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { categoryMeta } from "@/lib/tools/registry";

const COMPONENTS: Record<string, (tool: ToolDefinition) => React.ReactNode> = {
  "merge-pdf": () => <MergeTool />,
  "split-pdf": () => <SplitTool mode="ranges" />,
  "rotate-pdf": () => <RotateTool />,
  "rotate-pages": () => <RotatePagesTool />,
  "compress-pdf": () => <CompressTool />,
  "images-to-pdf": () => <ImagesToPdfTool />,
  "pdf-to-jpg": () => <PdfToImagesTool format="jpeg" />,
  "pdf-to-png": () => <PdfToImagesTool format="png" />,
  "pdf-to-text": () => <PdfToTextTool />,
  "watermark-pdf": () => <WatermarkTool />,
  "page-numbers": () => <PageNumbersTool />,
  "delete-pages": () => <DeletePagesTool />,
  "image-converter": () => <ImageConverterTool />,
  "text-to-pdf": () => <TextToPdfTool />,
  "markdown-to-pdf": () => <TextToPdfTool markdown />,
  "word-to-pdf": () => <WordToPdfTool />,
};

function ComingSoonCard({ tool }: { tool: ToolDefinition }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col rounded-xl border bg-card p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/50">
        <Construction className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-bold tracking-tight">This tool is coming soon</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {tool.name} is on our roadmap. It will be powered by a secure server-side processing
        pipeline. Meanwhile, check out the fully functional tools in the same category.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">
            Get notified when it launches
          </p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 text-sm"
            />
            <Button type="submit" size="sm" className="shrink-0">
              <Mail className="mr-1.5 h-3.5 w-3.5" />
              Notify me
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
          <CheckCircle2 className="h-4 w-4" />
          We&apos;ll notify you when it&apos;s ready!
        </div>
      )}

      <div className="mt-6 border-t pt-5">
        <p className="text-xs font-medium text-muted-foreground mb-3">
          Try these {categoryMeta[tool.category].label.toLowerCase()} tools instead
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["merge-pdf", "split-pdf", "compress-pdf"].map((slug) => (
            <Badge key={slug} variant="secondary" className="cursor-pointer hover:bg-primary/10 transition-colors">
              <a href={`/tools/${slug}`}>{slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</a>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToolComponent({ tool }: { tool: ToolDefinition }) {
  const render = useMemo(() => COMPONENTS[tool.slug], [tool.slug]);

  if (render) {
    return <>{render(tool)}</>;
  }

  return <ComingSoonCard tool={tool} />;
}
