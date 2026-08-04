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

export interface DocxPdfOptions {
  fontSize: number;
  margin: number;
  pageSize: "a4" | "letter";
}

export async function docxToPdf(file: File, opts: DocxPdfOptions): Promise<Blob> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const html = result.value;
  const size = PAGE_SIZES[opts.pageSize];
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const usableWidth = size.width - opts.margin * 2;
  const ink = rgb(0.08, 0.08, 0.08);
  const muted = rgb(0.35, 0.35, 0.4);

  let page = doc.addPage([size.width, size.height]);
  let y = size.height - opts.margin;

  const ensure = (needed: number) => {
    if (y < needed) {
      page = doc.addPage([size.width, size.height]);
      y = size.height - opts.margin;
    }
  };

  const drawHeading = (text: string, level: number) => {
    const sizes = [opts.fontSize + 10, opts.fontSize + 7, opts.fontSize + 4, opts.fontSize + 2];
    const fs = sizes[Math.min(level - 1, sizes.length - 1)];
    ensure(opts.margin + fs + opts.fontSize);
    y -= fs * 0.5;
    page.drawText(stripHtml(text), {
      x: opts.margin,
      y,
      size: fs,
      font: bold,
      color: ink,
    });
    y -= fs + opts.fontSize * 0.3;
  };

  const drawParagraph = (text: string) => {
    const stripped = stripHtml(text);
    if (!stripped.trim()) return;
    for (const wrapped of wrapText(stripped, regular, opts.fontSize, usableWidth)) {
      ensure(opts.margin + opts.fontSize);
      page.drawText(wrapped, {
        x: opts.margin,
        y,
        size: opts.fontSize,
        font: regular,
        color: ink,
      });
      y -= opts.fontSize * 1.5;
    }
  };

  const drawListItem = (text: string, ordered: boolean, index: number) => {
    const stripped = stripHtml(text);
    const bullet = ordered ? `${index + 1}.` : "\u2022";
    const lineText = `  ${bullet} ${stripped}`;
    for (const wrapped of wrapText(lineText, regular, opts.fontSize, usableWidth)) {
      ensure(opts.margin + opts.fontSize);
      page.drawText(wrapped, {
        x: opts.margin,
        y,
        size: opts.fontSize,
        font: regular,
        color: ink,
      });
      y -= opts.fontSize * 1.5;
    }
  };

  const tempDiv = typeof document !== "undefined" ? document.createElement("div") : null;
  if (tempDiv) tempDiv.innerHTML = html;
  const rawText = tempDiv ? tempDiv.textContent || "" : html.replace(/<[^>]+>/g, " ");

  let listIndex = 0;

  const processHtmlNode = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (text.trim()) drawParagraph(text);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (/^h[1-6]$/.test(tag)) {
      const level = parseInt(tag[1]);
      drawHeading(el.textContent || "", level);
      return;
    }

    if (tag === "p") {
      drawParagraph(el.textContent || "");
      return;
    }

    if (tag === "ul" || tag === "ol") {
      const items = el.querySelectorAll(":scope > li");
      listIndex = 0;
      items.forEach((li) => {
        drawListItem(li.textContent || "", tag === "ol", listIndex);
        listIndex++;
      });
      return;
    }

    if (tag === "br") {
      ensure(opts.margin + opts.fontSize);
      y -= opts.fontSize * 0.5;
      return;
    }

    if (tag === "hr") {
      ensure(opts.margin + opts.fontSize);
      page.drawLine({
        start: { x: opts.margin, y },
        end: { x: size.width - opts.margin, y },
        thickness: 1,
        color: muted,
      });
      y -= opts.fontSize * 1.5;
      return;
    }

    for (const child of Array.from(el.childNodes)) {
      processHtmlNode(child);
    }
  };

  if (tempDiv) {
    for (const child of Array.from(tempDiv.childNodes)) {
      processHtmlNode(child);
    }
  } else {
    drawParagraph(rawText);
  }

  const bytes = await doc.save();
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
