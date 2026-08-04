"use client";

import { loadPdf } from "./pdfjs";

export interface PdfToHtmlOptions {
  includeStyles?: boolean;
}

interface TextItem {
  str: string;
  dir: string;
  transform: number[];
  width: number;
  height: number;
}

interface TextContent {
  items: (TextItem | { type: string })[];
}

function isTextItem(item: unknown): item is TextItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "str" in item &&
    "transform" in item &&
    Array.isArray((item as TextItem).transform)
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detectStructure(items: TextItem[]): string {
  if (items.length === 0) return "";

  const avgFontSize =
    items.reduce((sum, item) => sum + Math.abs(item.transform[0] || 12), 0) / items.length;

  const paragraphs: string[][] = [];
  let currentParagraph: string[] = [];

  let lastY = -1;
  for (const item of items) {
    const y = item.transform[5];
    const text = item.str.trim();
    if (!text) {
      if (currentParagraph.length > 0) {
        paragraphs.push(currentParagraph);
        currentParagraph = [];
      }
      lastY = y;
      continue;
    }

    if (lastY !== -1 && Math.abs(y - lastY) > avgFontSize * 1.8) {
      if (currentParagraph.length > 0) {
        paragraphs.push(currentParagraph);
        currentParagraph = [];
      }
    }
    currentParagraph.push(text);
    lastY = y;
  }
  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph);
  }

  const lines: string[] = [];
  for (const para of paragraphs) {
    const text = para.join(" ");
    const firstItem = items.find((item) => item.str.trim() === para[0]);
    const fontSize = firstItem ? Math.abs(firstItem.transform[0] || 12) : avgFontSize;

    if (fontSize > avgFontSize * 1.4) {
      lines.push(`<h2>${escapeHtml(text)}</h2>`);
    } else if (fontSize > avgFontSize * 1.2) {
      lines.push(`<h3>${escapeHtml(text)}</h3>`);
    } else {
      lines.push(`<p>${escapeHtml(text)}</p>`);
    }
  }

  return lines.join("\n");
}

export async function pdfToHtml(
  file: File,
  options: PdfToHtmlOptions = {},
): Promise<string> {
  const { includeStyles = true } = options;
  const doc = await loadPdf(file);
  const totalPages = doc.numPages;

  const pageHtmlParts: string[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const page = await doc.getPage(i);
    const content = (await page.getTextContent()) as TextContent;
    const textItems = content.items.filter(isTextItem);

    const structure = detectStructure(textItems);

    pageHtmlParts.push(`
      <div class="page" data-page="${i}">
        ${structure}
      </div>
    `);
  }

  const styles = includeStyles
    ? `
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333; }
      .page { margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
      .page:last-child { border-bottom: none; }
      h1, h2, h3 { margin-top: 1.5em; margin-bottom: 0.5em; }
      h2 { font-size: 1.4em; }
      h3 { font-size: 1.2em; }
      p { margin: 0.5em 0; }
    </style>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(file.name.replace(/\.pdf$/i, ""))}</title>
  ${styles}
</head>
<body>
  ${pageHtmlParts.join("\n")}
</body>
</html>`;

  await doc.loadingTask.destroy();
  return html;
}
