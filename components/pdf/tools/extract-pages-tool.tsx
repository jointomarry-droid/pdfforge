"use client";

import * as React from "react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PdfThumbnails } from "@/components/pdf/pdf-thumbnails";
import { trackRecentFile } from "@/lib/utils";

export function ExtractPagesTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const [pageInput, setPageInput] = React.useState("");
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const toggle = (page: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(page)) next.delete(page);
      else next.add(page);
      return next;
    });
  };

  const selectAll = () => {
    const all = new Set(Array.from({ length: pageCount }, (_, i) => i + 1));
    setSelected(all);
    setPageInput(`1-${pageCount}`);
  };

  const selectNone = () => {
    setSelected(new Set());
    setPageInput("");
  };

  const handlePageInputChange = (value: string) => {
    setPageInput(value);
    const pages = new Set<number>();
    const parts = value.split(",").map((s) => s.trim()).filter(Boolean);
    for (const part of parts) {
      const m = part.match(/^(\d+)(?:-(\d+))?$/);
      if (!m) continue;
      const start = Math.max(1, Math.min(pageCount, Number(m[1])));
      const end = m[2] ? Math.max(1, Math.min(pageCount, Number(m[2]))) : start;
      for (let i = start; i <= end; i++) pages.add(i);
    }
    setSelected(pages);
  };

  const process = async () => {
    if (!file || selected.size === 0) {
      toast.warning("Select at least one page to extract.");
      return;
    }
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const srcBytes = await file.arrayBuffer();
      const src = await PDFDocument.load(srcBytes);
      const doc = await PDFDocument.create();

      const indices = [...selected].sort((a, b) => a - b).map((p) => p - 1);
      const pages = await doc.copyPages(src, indices);
      for (const page of pages) doc.addPage(page);

      const saved = await doc.save();
      const blob = new Blob([new Uint8Array(saved)], { type: "application/pdf" });
      const baseName = file.name.replace(/\.pdf$/i, "");
      setResults([{ name: `${baseName}-extracted.pdf`, blob }]);
      toast.success(`Extracted ${selected.size} page${selected.size > 1 ? "s" : ""}`);
      trackRecentFile(file.name, "extract-pages");
    } catch {
      toast.error("Failed to extract pages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file && <FileDropzone accept={["pdf"]} onFiles={(f) => setFile(f[0])} />}
      {file && (
        <>
          <FileList files={[file]} onRemove={() => { setFile(null); setResults([]); setSelected(new Set()); setPageInput(""); }} />
          <PdfThumbnails
            key={file.name}
            file={file}
            onPageCount={setPageCount}
            selected={selected}
            onToggle={toggle}
            maxThumbnails={30}
          />

          {pageCount > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="pages" className="shrink-0">Pages to extract</Label>
                <span className="text-xs text-muted-foreground">
                  ({selected.size} of {pageCount} selected)
                </span>
              </div>
              <Input
                id="pages"
                value={pageInput}
                onChange={(e) => handlePageInputChange(e.target.value)}
                placeholder={`e.g. 1-3, 5, 7-9 (total: ${pageCount})`}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  Select all
                </button>
                <span className="text-muted-foreground">·</span>
                <button
                  type="button"
                  onClick={selectNone}
                  className="text-xs text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  Clear selection
                </button>
              </div>
            </div>
          )}

          <ProcessButton
            loading={loading}
            disabled={selected.size === 0}
            onClick={process}
          >
            Extract {selected.size > 0 ? `${selected.size} page${selected.size > 1 ? "s" : ""}` : "pages"}
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}
