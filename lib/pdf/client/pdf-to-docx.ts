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

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createDocxXml(paragraphs: string[]): string {
  const bodyContent = paragraphs
    .map((p) => {
      if (p.startsWith("<h")) {
        const level = parseInt(p.match(/<h(\d)/)?.[1] || "2");
        const text = p.replace(/<[^>]+>/g, "");
        const pStyle = `Heading${level}`;
        return `<w:p><w:pPr><w:pStyle w:val="${pStyle}"/></w:pPr><w:r><w:t>${escapeXml(text)}</w:t></w:r></w:p>`;
      }
      return `<w:p><w:r><w:t>${escapeXml(p)}</w:t></w:r></w:p>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${bodyContent}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720"/>
    </w:sectPr>
  </w:body>
</w:document>`;
}

function createContentTypes(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;
}

function createRels(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
}

function createWordRels(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;
}

async function createDocxBlob(xmlContent: string): Promise<Blob> {
  const { zip, strToU8 } = await import("fflate");

  const files: Record<string, Uint8Array> = {
    "[Content_Types].xml": strToU8(createContentTypes()),
    "_rels/.rels": strToU8(createRels()),
    "word/document.xml": strToU8(xmlContent),
    "word/_rels/document.xml.rels": strToU8(createWordRels()),
  };

  return new Promise((resolve, reject) => {
    zip(files, (err, data) => {
      if (err) return reject(err);
      resolve(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }));
    });
  });
}

export async function pdfToDocx(file: File): Promise<Blob> {
  const doc = await loadPdf(file);
  const paragraphs: string[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = (await page.getTextContent()) as TextContent;
    const textItems = content.items.filter(isTextItem);

    if (textItems.length === 0) continue;

    const avgFontSize =
      textItems.reduce((sum, item) => sum + Math.abs(item.transform[0] || 12), 0) / textItems.length;

    const pageParagraphs: string[][] = [];
    let currentParagraph: string[] = [];

    let lastY = -1;
    for (const item of textItems) {
      const y = item.transform[5];
      const text = item.str;
      if (!text.trim()) {
        if (currentParagraph.length > 0) {
          pageParagraphs.push(currentParagraph);
          currentParagraph = [];
        }
        lastY = y;
        continue;
      }

      if (lastY !== -1 && Math.abs(y - lastY) > avgFontSize * 1.8) {
        if (currentParagraph.length > 0) {
          pageParagraphs.push(currentParagraph);
          currentParagraph = [];
        }
      }
      currentParagraph.push(text);
      lastY = y;
    }
    if (currentParagraph.length > 0) {
      pageParagraphs.push(currentParagraph);
    }

    for (const para of pageParagraphs) {
      const text = para.join(" ").trim();
      if (!text) continue;

      const firstItem = textItems.find((item) => item.str.trim() === para[0]);
      const fontSize = firstItem ? Math.abs(firstItem.transform[0] || 12) : avgFontSize;

      if (fontSize > avgFontSize * 1.6) {
        paragraphs.push(`<h1>${text}</h1>`);
      } else if (fontSize > avgFontSize * 1.3) {
        paragraphs.push(`<h2>${text}</h2>`);
      } else if (fontSize > avgFontSize * 1.1) {
        paragraphs.push(`<h3>${text}</h3>`);
      } else {
        paragraphs.push(`<p>${text}</p>`);
      }
    }
  }

  const xml = createDocxXml(paragraphs);
  const blob = await createDocxBlob(xml);

  await doc.loadingTask.destroy();
  return blob;
}
