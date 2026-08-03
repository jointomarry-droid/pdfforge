"use client";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { PDFFont, PDFPage } from "pdf-lib";

export interface TextPdfOptions {
  fontSize: number;
  margin: number;
  pageSize: "a4" | "letter";
}

const PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

async function createPdf() {
  const doc = await PDFDocument.create();
  return { doc, fontPromise: doc.embedFont(StandardFonts.Helvetica) };
}

export async function textToPdf(text: string, opts: TextPdfOptions): Promise<Blob> {
  const size = PAGE_SIZES[opts.pageSize];
  const { doc, fontPromise } = await createPdf();
  const font = await fontPromise;
  const usableWidth = size.width - opts.margin * 2;
  const lineHeight = opts.fontSize * 1.5;
  const lines = wrapText(text, font, opts.fontSize, usableWidth);
  const page = doc.addPage([size.width, size.height]);
  let y = size.height - opts.margin - opts.fontSize;
  for (const line of lines) {
    if (y < opts.margin) {
      const p = doc.addPage([size.width, size.height]);
      y = size.height - opts.margin - opts.fontSize;
      drawTextLine(p, line, font, opts.fontSize, opts.margin, y, rgb(0.1, 0.1, 0.1));
      y -= lineHeight;
      continue;
    }
    drawTextLine(page, line, font, opts.fontSize, opts.margin, y, rgb(0.1, 0.1, 0.1));
    y -= lineHeight;
  }
  const bytes = await doc.save();
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

function drawTextLine(
  page: PDFPage,
  line: string,
  font: PDFFont,
  fontSize: number,
  margin: number,
  y: number,
  color: ReturnType<typeof rgb>,
) {
  page.drawText(line, { x: margin, y, size: fontSize, font, color });
}

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const paragraphs = text.split(/\r?\n/);
  const out: string[] = [];
  for (const paragraph of paragraphs) {
    if (paragraph.trim() === "") {
      out.push("");
      continue;
    }
    const words = paragraph.split(/\s+/);
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, fontSize) > maxWidth && current) {
        out.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) out.push(current);
  }
  return out;
}

/**
 * A lightweight Markdown-to-PDF renderer supporting headings, lists,
 * blockquotes, code blocks, bold, italics and horizontal rules.
 */
export async function markdownToPdf(md: string, opts: TextPdfOptions): Promise<Blob> {
  const size = PAGE_SIZES[opts.pageSize];
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const mono = await doc.embedFont(StandardFonts.Courier);
  const usableWidth = size.width - opts.margin * 2;

  let page = doc.addPage([size.width, size.height]);
  let y = size.height - opts.margin;
  const ink = rgb(0.08, 0.08, 0.08);
  const muted = rgb(0.35, 0.35, 0.4);

  const ensure = (needed: number) => {
    if (y < needed) {
      page = doc.addPage([size.width, size.height]);
      y = size.height - opts.margin;
    }
  };

  const rawLines = md.split(/\r?\n/);
  let inCode = false;
  let codeBuf: string[] = [];

  const flushCode = () => {
    if (codeBuf.length === 0) return;
    for (const line of codeBuf) {
      ensure(opts.margin + opts.fontSize);
      page.drawText(line.length > 100 ? line.slice(0, 100) : line, {
        x: opts.margin,
        y,
        size: opts.fontSize * 0.8,
        font: mono,
        color: muted,
      });
      y -= opts.fontSize * 1.2;
    }
    y -= opts.fontSize * 0.5;
    codeBuf = [];
  };

  for (const rawLine of rawLines) {
    if (rawLine.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushCode();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(rawLine);
      continue;
    }

    const trimmed = rawLine.trim();
    if (trimmed === "") continue;

    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushCode();
      const level = heading[1].length;
      const fontSize = [opts.fontSize + 10, opts.fontSize + 7, opts.fontSize + 4, opts.fontSize + 2][level - 1];
      ensure(opts.margin + fontSize + opts.fontSize);
      y -= fontSize * 0.6;
      page.drawText(stripInline(heading[2]), {
        x: opts.margin,
        y,
        size: fontSize,
        font: bold,
        color: ink,
      });
      y -= fontSize + opts.fontSize * 0.4;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushCode();
      ensure(opts.margin + opts.fontSize);
      page.drawLine({
        start: { x: opts.margin, y },
        end: { x: size.width - opts.margin, y },
        thickness: 1,
        color: muted,
      });
      y -= opts.fontSize * 1.5;
      continue;
    }

    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      flushCode();
      ensure(opts.margin + opts.fontSize);
      const bullet = /^[-*]\s+/.test(trimmed) ? "\u2022" : trimmed.match(/^\d+\./)?.[0];
      const content = trimmed.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "");
      page.drawText(`${bullet} ${stripInline(content)}`, {
        x: opts.margin,
        y,
        size: opts.fontSize,
        font: regular,
        color: ink,
      });
      y -= opts.fontSize * 1.5;
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushCode();
      ensure(opts.margin + opts.fontSize);
      page.drawText(stripInline(trimmed.replace(/^>\s?/, "")), {
        x: opts.margin + 12,
        y,
        size: opts.fontSize,
        font: regular,
        color: muted,
      });
      page.drawRectangle({
        x: opts.margin,
        y: y - 2,
        width: 3,
        height: opts.fontSize + 4,
        color: muted,
      });
      y -= opts.fontSize * 1.5;
      continue;
    }

    flushCode();
    for (const wrapped of wrapText(stripInline(trimmed), regular, opts.fontSize, usableWidth)) {
      ensure(opts.margin + opts.fontSize);
      page.drawText(wrapped, { x: opts.margin, y, size: opts.fontSize, font: regular, color: ink });
      y -= opts.fontSize * 1.5;
    }
  }
  flushCode();

  const bytes = await doc.save();
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

function stripInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1");
}
