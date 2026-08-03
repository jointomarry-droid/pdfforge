"use client";

import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib";
import type { RGB } from "pdf-lib";
import { loadPdf } from "@/lib/pdf/client/pdfjs";

function pdfBlob(bytes: Uint8Array): Blob {
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

export type PageSizeOption = "a4" | "letter" | "original";

const PAGE_SIZES: Record<"a4" | "letter", { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

const PNG_MIME = "image/png";

export async function mergePdfs(files: File[]): Promise<Blob> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const src = await PDFDocument.load(await file.arrayBuffer());
    const pages = await merged.copyPages(src, src.getPageIndices());
    for (const page of pages) merged.addPage(page);
  }
  return pdfBlob(await merged.save());
}

export interface SplitRange {
  label: string;
  start: number;
  end: number;
}

export function parseRanges(input: string, pageCount: number): SplitRange[] {
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return [];
  const ranges: SplitRange[] = [];
  for (const part of parts) {
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) continue;
    const start = Math.max(1, Math.min(pageCount, Number(m[1])));
    const end = m[2] ? Math.max(1, Math.min(pageCount, Number(m[2]))) : start;
    if (end < start) continue;
    ranges.push({ label: part, start, end });
  }
  return ranges;
}

export async function splitPdf(
  file: File,
  ranges: SplitRange[],
): Promise<{ blob: Blob; name: string }[]> {
  const src = await PDFDocument.load(await file.arrayBuffer());
  const outputs: { blob: Blob; name: string }[] = [];
  for (const range of ranges) {
    const doc = await PDFDocument.create();
    const indices: number[] = [];
    for (let i = range.start; i <= range.end; i++) indices.push(i - 1);
    const pages = await doc.copyPages(src, indices);
    for (const page of pages) doc.addPage(page);
    outputs.push({
      blob: pdfBlob(await doc.save()),
      name: `${file.name.replace(/\.pdf$/i, "")}-${range.label}.pdf`,
    });
  }
  return outputs;
}

export async function splitEveryPage(file: File): Promise<{ blob: Blob; name: string }[]> {
  const src = await PDFDocument.load(await file.arrayBuffer());
  const outputs: { blob: Blob; name: string }[] = [];
  const base = file.name.replace(/\.pdf$/i, "");
  const pageCount = src.getPageCount();
  for (let i = 0; i < pageCount; i++) {
    const doc = await PDFDocument.create();
    const [copy] = await doc.copyPages(src, [i]);
    doc.addPage(copy);
    outputs.push({ blob: pdfBlob(await doc.save()), name: `${base}-page-${i + 1}.pdf` });
  }
  return outputs;
}

export async function rotatePdf(
  file: File,
  angle: 90 | 180 | 270,
  pages?: number[],
): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const targets = pages && pages.length > 0 ? pages.map((p) => p - 1) : doc.getPageIndices();
  for (const idx of targets) {
    const page = doc.getPage(idx);
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + angle) % 360));
  }
  return pdfBlob(await doc.save());
}

export async function deletePages(file: File, pagesToDelete: number[]): Promise<Blob> {
  const src = await PDFDocument.load(await file.arrayBuffer());
  const doc = await PDFDocument.create();
  const toDelete = new Set(pagesToDelete.map((p) => p - 1));
  const indices = src.getPageIndices().filter((idx) => !toDelete.has(idx));
  const pages = await doc.copyPages(src, indices);
  for (const page of pages) doc.addPage(page);
  return pdfBlob(await doc.save());
}

export interface WatermarkOptions {
  text: string;
  opacity: number;
  fontSize: number;
  angle: number;
  color: string;
  pages?: number[];
}

function hexToRgb(hex: string): RGB {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const n = parseInt(full, 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export async function watermarkPdf(file: File, opts: WatermarkOptions): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const color = hexToRgb(opts.color);
  const targets = opts.pages && opts.pages.length > 0 ? opts.pages.map((p) => p - 1) : doc.getPageIndices();
  for (const idx of targets) {
    const page = doc.getPage(idx);
    const { width } = page.getSize();
    page.drawText(opts.text, {
      x: width / 2 - (opts.fontSize * opts.text.length * 0.35) / 2,
      y: page.getHeight() / 2,
      size: opts.fontSize,
      font,
      color,
      opacity: opts.opacity,
      rotate: degrees(opts.angle),
    });
  }
  return pdfBlob(await doc.save());
}

export interface PageNumberOptions {
  position: "bottom-center" | "bottom-left" | "bottom-right" | "top-center" | "top-right";
  startNumber: number;
  prefix: string;
  showTotal: boolean;
  fontSize: number;
}

export async function addPageNumbers(file: File, opts: PageNumberOptions): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  const total = pages.length;
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    const number = opts.startNumber + i;
    const text = `${opts.prefix}${number}${opts.showTotal ? ` / ${total}` : ""}`;
    const textWidth = font.widthOfTextAtSize(text, opts.fontSize);
    let x = width / 2 - textWidth / 2;
    if (opts.position === "bottom-left") x = 36;
    if (opts.position === "bottom-right" || opts.position === "top-right") {
      x = width - textWidth - 36;
    }
    const y = opts.position.startsWith("top") ? height - 36 : 32;
    page.drawText(text, { x, y, size: opts.fontSize, font, color: rgb(0.2, 0.2, 0.2) });
  }
  return pdfBlob(await doc.save());
}

export interface ImagesToPdfOptions {
  pageSize: PageSizeOption;
  margin: number;
  preserveAspect: boolean;
}

export async function imagesToPdf(files: File[], opts: ImagesToPdfOptions): Promise<Blob> {
  const doc = await PDFDocument.create();
  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const pageSize = opts.pageSize;
    let width = 600;
    let height = 800;
    let scale = 1;
    if (pageSize !== "original") {
      const size = PAGE_SIZES[pageSize];
      width = size.width;
      height = size.height;
    }
    const embedded = file.type === PNG_MIME ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    const page = doc.addPage([width, height]);
    const dw = opts.preserveAspect ? embedded.width : width;
    const dh = opts.preserveAspect ? embedded.height : height;
    let dx = 0;
    let dy = 0;
    if (pageSize !== "original") {
      scale = Math.min((width - opts.margin * 2) / embedded.width, (height - opts.margin * 2) / embedded.height);
      if (scale <= 0 || !isFinite(scale)) scale = 1;
      const finalW = embedded.width * scale;
      const finalH = embedded.height * scale;
      dx = (width - finalW) / 2;
      dy = (height - finalH) / 2;
      page.drawImage(embedded, { x: dx, y: dy, width: finalW, height: finalH });
    } else {
      page.drawImage(embedded, { x: dx, y: dy, width: dw, height: dh });
    }
  }
  return pdfBlob(await doc.save());
}

export async function pdfToText(file: File): Promise<string> {
  const doc = await loadPdf(file);
  const parts: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const lineItems: { text: string; y: number }[] = [];
    for (const item of content.items) {
      if ("str" in item) {
        const t = item as { str: string; transform: number[] };
        lineItems.push({ text: t.str, y: t.transform[5] });
      }
    }
    lineItems.sort((a, b) => b.y - a.y);
    parts.push(lineItems.map((l) => l.text).join(" "));
  }
  return parts.join("\n\n");
}

export function parsePageSelection(input: string, pageCount: number): number[] {
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  const pages = new Set<number>();
  for (const part of parts) {
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) continue;
    const start = Math.max(1, Math.min(pageCount, Number(m[1])));
    const end = m[2] ? Math.max(1, Math.min(pageCount, Number(m[2]))) : start;
    if (end < start) continue;
    for (let i = start; i <= end; i++) pages.add(i);
  }
  return [...pages];
}
