"use client";

import { loadPdf, renderPageToCanvas } from "@/lib/pdf/client/pdfjs";

export type ImageFormat = "jpeg" | "png";

export interface PdfToImagesOptions {
  format: ImageFormat;
  quality: number;
  scale: number;
  pages: number[];
}

export interface PdfToImagesResult {
  blobs: { blob: Blob; name: string; page: number }[];
}

export type ProgressCallback = (current: number, total: number) => void;

/**
 * Render selected PDF pages as raster images (JPG or PNG).
 */
export async function pdfToImages(
  file: File,
  opts: PdfToImagesOptions,
  onProgress?: ProgressCallback,
): Promise<PdfToImagesResult> {
  const src = await loadPdf(file);
  const mime = opts.format === "jpeg" ? "image/jpeg" : "image/png";
  const ext = opts.format === "jpeg" ? "jpg" : "png";
  const base = file.name.replace(/\.pdf$/i, "");
  const blobs: PdfToImagesResult["blobs"] = [];

  const pages = opts.pages.length > 0 ? opts.pages : allPages(src.numPages);
  const totalPages = pages.length;

  for (let idx = 0; idx < pages.length; idx++) {
    const pageNumber = pages[idx];
    const { canvas } = await renderPageToCanvas(src, pageNumber, opts.scale);
    const dataUrl =
      opts.format === "jpeg"
        ? canvas.toDataURL("image/jpeg", opts.quality / 100)
        : canvas.toDataURL("image/png");
    const bytes = dataUrlToBytes(dataUrl);
    blobs.push({
      blob: new Blob([new Uint8Array(bytes)], { type: mime }),
      name: `${base}-page-${pageNumber}.${ext}`,
      page: pageNumber,
    });
    canvas.width = 0;
    canvas.height = 0;
    onProgress?.(idx + 1, totalPages);
  }

  await src.loadingTask.destroy();
  return { blobs };
}

function allPages(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i + 1);
}

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1];
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
