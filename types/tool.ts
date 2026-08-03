export type ToolCategory =
  | "convert-to-pdf"
  | "convert-from-pdf"
  | "edit"
  | "compress"
  | "ocr"
  | "ai"
  | "image"
  | "office"
  | "sign"
  | "security"
  | "batch";

export type ToolInput =
  | "pdf"
  | "images"
  | "office"
  | "text"
  | "html"
  | "markdown"
  | "ebook"
  | "csv"
  | "any";

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  /** Short one-liner shown in cards and lists. */
  description: string;
  /** Longer marketing copy for the landing page. */
  longDescription: string;
  /** Accepted file extensions for the uploader, e.g. ["pdf"]. */
  extensions: string[];
  input: ToolInput;
  /** Whether the tool is fully functional in the browser (client-side). */
  clientSide: boolean;
  /** Whether this tool is only a stub/placeholder for a future release. */
  placeholder?: boolean;
  /** Maximum number of files accepted. */
  maxFiles?: number;
  keywords: string[];
  faq: ToolFaq[];
  related: string[];
}

export interface ToolPageProps {
  tool: ToolDefinition;
}
