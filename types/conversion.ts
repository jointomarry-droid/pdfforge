export type FileKind =
  | "pdf"
  | "image"
  | "office"
  | "text"
  | "html"
  | "markdown"
  | "ebook"
  | "csv";

export interface PdfPage {
  index: number;
  /** 1-based page number for display. */
  number: number;
  width: number;
  height: number;
}

export type ConversionStatus =
  | "idle"
  | "processing"
  | "done"
  | "error";

export interface ConversionResult {
  blob: Blob;
  fileName: string;
  size: number;
  pages: number;
}
