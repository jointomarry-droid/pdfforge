"use client";

import { useMemo } from "react";
import { Construction } from "lucide-react";

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
};

export function ToolComponent({ tool }: { tool: ToolDefinition }) {
  const render = useMemo(() => COMPONENTS[tool.slug], [tool.slug]);

  if (render) {
    return <>{render(tool)}</>;
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border bg-muted/30 px-6 py-16 text-center">
      <Construction className="h-8 w-8 text-muted-foreground" />
      <h3 className="text-lg font-semibold">This tool is coming soon</h3>
      <p className="max-w-md text-sm text-muted-foreground">
        {tool.name} is on our roadmap. It will be powered by a secure server-side processing
        pipeline. Meanwhile, check out the fully functional tools in the same category.
      </p>
    </div>
  );
}
