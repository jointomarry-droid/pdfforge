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

interface PositionedText {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function groupIntoRows(items: PositionedText[], tolerance: number = 5): PositionedText[][] {
  if (items.length === 0) return [];

  const sorted = [...items].sort((a, b) => b.y - a.y);
  const rows: PositionedText[][] = [];
  let currentRow: PositionedText[] = [sorted[0]];
  let currentY = sorted[0].y;

  for (let i = 1; i < sorted.length; i++) {
    const item = sorted[i];
    if (Math.abs(item.y - currentY) <= tolerance) {
      currentRow.push(item);
    } else {
      rows.push(currentRow.sort((a, b) => a.x - b.x));
      currentRow = [item];
      currentY = item.y;
    }
  }
  rows.push(currentRow.sort((a, b) => a.x - b.x));
  return rows;
}

function detectColumns(rows: PositionedText[][]): number[] {
  const xPositions = new Map<number, number>();

  for (const row of rows) {
    for (const cell of row) {
      const roundedX = Math.round(cell.x / 10) * 10;
      xPositions.set(roundedX, (xPositions.get(roundedX) || 0) + 1);
    }
  }

  const significant = Array.from(xPositions.entries())
    .filter(([, count]) => count >= rows.length * 0.3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([x]) => x)
    .sort((a, b) => a - b);

  return significant;
}

function mapToGrid(rows: PositionedText[][], columns: number[]): string[][] {
  const grid: string[][] = [];

  for (const row of rows) {
    const cells: string[] = new Array(columns.length).fill("");
    for (const item of row) {
      const roundedX = Math.round(item.x / 10) * 10;
      let bestCol = 0;
      let bestDist = Infinity;
      for (let i = 0; i < columns.length; i++) {
        const dist = Math.abs(roundedX - columns[i]);
        if (dist < bestDist) {
          bestDist = dist;
          bestCol = i;
        }
      }
      if (cells[bestCol]) {
        cells[bestCol] += " " + item.text;
      } else {
        cells[bestCol] = item.text;
      }
    }
    grid.push(cells.map((c) => c.trim()));
  }

  return grid;
}

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function pdfToCsv(file: File): Promise<string> {
  const doc = await loadPdf(file);
  const allRows: string[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = (await page.getTextContent()) as TextContent;
    const textItems = content.items.filter(isTextItem);

    if (textItems.length === 0) continue;

    const positioned: PositionedText[] = textItems.map((item) => ({
      text: item.str.trim(),
      x: item.transform[4],
      y: item.transform[5],
      width: item.width,
      height: item.height,
    })).filter((item) => item.text);

    if (positioned.length === 0) continue;

    const rows = groupIntoRows(positioned);

    if (rows.length < 2) {
      for (const row of rows) {
        const cells = row.map((c) => escapeCsv(c.text));
        allRows.push(cells.join(","));
      }
      continue;
    }

    const columns = detectColumns(rows);

    if (columns.length < 2) {
      for (const row of rows) {
        const text = row.map((c) => c.text).join(" ");
        allRows.push(escapeCsv(text));
      }
      continue;
    }

    const grid = mapToGrid(rows, columns);

    if (i === 1 && grid.length > 0) {
      const header = grid[0].map((c) => escapeCsv(c));
      allRows.push(header.join(","));
      for (let r = 1; r < grid.length; r++) {
        const cells = grid[r].map((c) => escapeCsv(c));
        allRows.push(cells.join(","));
      }
    } else {
      for (const row of grid) {
        const cells = row.map((c) => escapeCsv(c));
        allRows.push(cells.join(","));
      }
    }
  }

  await doc.loadingTask.destroy();
  return allRows.join("\n");
}
