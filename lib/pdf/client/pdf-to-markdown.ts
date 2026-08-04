"use client";

import { loadPdf } from "./pdfjs";

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

function escapeMarkdown(text: string): string {
  return text
    .replace(/[\\]/g, "\\\\")
    .replace(/[*_`~]/g, "\\$&");
}

export async function pdfToMarkdown(file: File): Promise<string> {
  const doc = await loadPdf(file);
  const totalPages = doc.numPages;

  const pageMarkdownParts: string[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const page = await doc.getPage(i);
    const content = (await page.getTextContent()) as TextContent;
    const textItems = content.items.filter(isTextItem);

    if (textItems.length === 0) {
      pageMarkdownParts.push(`<!-- Page ${i} - no text content -->\n`);
      continue;
    }

    const avgFontSize =
      textItems.reduce((sum, item) => sum + Math.abs(item.transform[0] || 12), 0) / textItems.length;

    const paragraphs: string[][] = [];
    let currentParagraph: string[] = [];

    let lastY = -1;
    for (const item of textItems) {
      const y = item.transform[5];
      const text = item.str;
      if (!text.trim()) {
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

    if (totalPages > 1) {
      lines.push(`## Page ${i}\n`);
    }

    for (const para of paragraphs) {
      const text = para.join(" ").trim();
      if (!text) continue;

      const firstItem = textItems.find((item) => item.str.trim() === para[0]);
      const fontSize = firstItem ? Math.abs(firstItem.transform[0] || 12) : avgFontSize;

      if (fontSize > avgFontSize * 1.6) {
        lines.push(`# ${text}\n`);
      } else if (fontSize > avgFontSize * 1.3) {
        lines.push(`## ${text}\n`);
      } else if (fontSize > avgFontSize * 1.1) {
        lines.push(`### ${text}\n`);
      } else {
        lines.push(`${text}\n`);
      }
    }

    pageMarkdownParts.push(lines.join("\n"));
  }

  const markdown = pageMarkdownParts.join("\n---\n\n");

  await doc.loadingTask.destroy();
  return markdown;
}
