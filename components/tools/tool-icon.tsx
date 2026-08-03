import {
  Combine,
  Scissors,
  RotateCw,
  Minimize2,
  Images,
  FileImage,
  Image as ImageIcon,
  FileText,
  Stamp,
  Hash,
  Trash2,
  ImagePlus,
  FileType,
  FileCode,
  FileOutput,
  FileInput,
  ScanText,
  Sparkles,
  PenLine,
  ShieldCheck,
  Layers,
  FileQuestion,
  type LucideIcon,
} from "lucide-react";
import type { ToolCategory, ToolDefinition } from "@/types/tool";

const TOOL_ICONS: Partial<Record<string, LucideIcon>> = {
  "merge-pdf": Combine,
  "split-pdf": Scissors,
  "rotate-pdf": RotateCw,
  "compress-pdf": Minimize2,
  "images-to-pdf": Images,
  "pdf-to-jpg": FileImage,
  "pdf-to-png": ImageIcon,
  "pdf-to-text": FileText,
  "watermark-pdf": Stamp,
  "page-numbers": Hash,
  "delete-pages": Trash2,
  "image-converter": ImagePlus,
  "text-to-pdf": FileType,
  "markdown-to-pdf": FileCode,
};

const CATEGORY_ICONS: Record<ToolCategory, LucideIcon> = {
  "convert-to-pdf": FileOutput,
  "convert-from-pdf": FileInput,
  edit: Scissors,
  compress: Minimize2,
  ocr: ScanText,
  ai: Sparkles,
  image: ImageIcon,
  office: FileText,
  sign: PenLine,
  security: ShieldCheck,
  batch: Layers,
};

export function getToolIcon(tool: Pick<ToolDefinition, "slug" | "category">): LucideIcon {
  return TOOL_ICONS[tool.slug] ?? CATEGORY_ICONS[tool.category] ?? FileQuestion;
}

interface ToolGlyphProps {
  tool: Pick<ToolDefinition, "slug" | "category">;
  className?: string;
}

/**
 * Renders a tool's icon. Declared at module scope so the React Compiler can
 * treat it as a static component (no components created during render).
 */
export function ToolGlyph({ tool, className }: ToolGlyphProps) {
  const Icon = TOOL_ICONS[tool.slug] ?? CATEGORY_ICONS[tool.category] ?? FileQuestion;
  return <Icon className={className} aria-hidden="true" />;
}
