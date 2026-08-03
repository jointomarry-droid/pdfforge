"use client";

import { canvasToBlob } from "@/lib/pdf/client/image-utils";

export type ConvertFormat = "jpg" | "png" | "webp";

const MIME: Record<ConvertFormat, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export interface ImageConvertOptions {
  format: ConvertFormat;
  quality: number;
}

export async function convertImage(file: File, opts: ImageConvertOptions): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not supported.");
  if (opts.format === "jpg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return canvasToBlob(canvas, MIME[opts.format], opts.quality / 100);
}

/**
 * Convert an image file to any supported raster format using a canvas.
 */
export async function convertImageToFormat(
  file: File,
  format: ConvertFormat,
): Promise<Blob> {
  const quality = format === "jpg" ? 0.92 : 1;
  return convertImage(file, { format, quality });
}
