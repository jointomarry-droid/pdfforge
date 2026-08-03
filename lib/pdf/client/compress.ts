"use client";

import { PDFDocument } from "pdf-lib";
import { loadPdf, renderPageToCanvas } from "@/lib/pdf/client/pdfjs";

export type CompressionLevel = "max-quality" | "balanced" | "max-compression";

export interface CompressionSettings {
  /** Rasterization scale relative to native resolution. */
  scale: number;
  /** JPEG quality 0-100 used when re-encoding pages. */
  quality: number;
}

export const COMPRESSION_LEVELS: Record<CompressionLevel, CompressionSettings> = {
  "max-quality": { scale: 1.5, quality: 82 },
  balanced: { scale: 1.0, quality: 60 },
  "max-compression": { scale: 0.6, quality: 35 },
};

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
}

/**
 * Compress a PDF by re-rendering each page as a JPEG and embedding it into a
 * fresh document. This achieves dramatic size reductions for image-heavy PDFs.
 *
 * Runs entirely in the browser — documents never leave the device.
 */
export async function compressPdf(
  file: File,
  level: CompressionLevel,
): Promise<CompressionResult> {
  const originalSize = file.size;
  const settings = COMPRESSION_LEVELS[level];
  const src = await loadPdf(file);
  const out = await PDFDocument.create();

  for (let i = 1; i <= src.numPages; i++) {
    const { canvas } = await renderPageToCanvas(src, i, settings.scale);
    const jpeg = canvas.toDataURL("image/jpeg", settings.quality / 100);
    const bytes = dataUrlToBytes(jpeg);
    const img = await out.embedJpg(bytes);
    const page = out.addPage([canvas.width, canvas.height]);
    page.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });
    canvas.width = 0;
    canvas.height = 0;
  }

  await src.loadingTask.destroy();
  const saved = await out.save();
  return {
    blob: new Blob([new Uint8Array(saved)], { type: "application/pdf" }),
    originalSize,
    compressedSize: saved.length,
  };
}

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1];
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
