"use client";

import type { PDFDocumentProxy } from "pdfjs-dist";

let workerConfigured = false;

const WORKER_SRC = "/pdf.worker.min.mjs";

/**
 * pdf.js is loaded lazily so its browser-only entry point is never evaluated
 * during server-side rendering. It is only imported when the user actually
 * processes a file in the browser.
 */
async function getPdfjs() {
  const pdfjsLib = await import("pdfjs-dist");
  if (!workerConfigured) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_SRC;
    workerConfigured = true;
  }
  return pdfjsLib;
}

export async function loadPdf(file: File | ArrayBuffer): Promise<PDFDocumentProxy> {
  const pdfjsLib = await getPdfjs();
  const data = file instanceof File ? await file.arrayBuffer() : file;
  const doc = await pdfjsLib.getDocument({ data }).promise;
  return doc;
}

export async function disposePdf(doc: PDFDocumentProxy): Promise<void> {
  await doc.loadingTask?.destroy();
}

export interface RenderedPage {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

/**
 * Render a single PDF page to a canvas at the given scale.
 */
export async function renderPageToCanvas(
  doc: PDFDocumentProxy,
  pageNumber: number,
  scale: number,
): Promise<RenderedPage> {
  const page = await doc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not supported in this browser.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({
    canvasContext: ctx,
    canvas,
    viewport,
  }).promise;
  page.cleanup();
  return { canvas, width: canvas.width, height: canvas.height };
}
