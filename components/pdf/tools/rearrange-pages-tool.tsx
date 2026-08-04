"use client";

import * as React from "react";
import { toast } from "sonner";
import { GripVertical, ArrowUp, ArrowDown } from "lucide-react";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { PdfThumbnails } from "@/components/pdf/pdf-thumbnails";
import { trackRecentFile } from "@/lib/utils";

export function RearrangePagesTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageOrder, setPageOrder] = React.useState<number[]>([]);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (pageCount > 0 && pageOrder.length === 0) {
      setPageOrder(Array.from({ length: pageCount }, (_, i) => i + 1));
    }
  }, [pageCount, pageOrder.length]);

  const movePage = (fromIndex: number, direction: -1 | 1) => {
    setPageOrder((prev) => {
      const next = [...prev];
      const toIndex = fromIndex + direction;
      if (toIndex < 0 || toIndex >= next.length) return prev;
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  };

  const movePageToIndex = (fromIndex: number, toIndex: number) => {
    setPageOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const resetOrder = () => {
    setPageOrder(Array.from({ length: pageCount }, (_, i) => i + 1));
  };

  const reverseOrder = () => {
    setPageOrder((prev) => [...prev].reverse());
  };

  const process = async () => {
    if (!file || pageOrder.length === 0) {
      toast.warning("No pages to rearrange.");
      return;
    }
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const srcBytes = await file.arrayBuffer();
      const src = await PDFDocument.load(srcBytes);
      const doc = await PDFDocument.create();

      const indices = pageOrder.map((p) => p - 1);
      const pages = await doc.copyPages(src, indices);
      for (const page of pages) doc.addPage(page);

      const saved = await doc.save();
      const blob = new Blob([new Uint8Array(saved)], { type: "application/pdf" });
      const baseName = file.name.replace(/\.pdf$/i, "");
      setResults([{ name: `${baseName}-rearranged.pdf`, blob }]);
      toast.success("Pages rearranged successfully");
      trackRecentFile(file.name, "rearrange-pages");
    } catch {
      toast.error("Failed to rearrange pages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file && <FileDropzone accept={["pdf"]} onFiles={(f) => setFile(f[0])} />}
      {file && (
        <>
          <FileList files={[file]} onRemove={() => { setFile(null); setResults([]); setPageOrder([]); }} />
          <PdfThumbnails
            key={file.name}
            file={file}
            onPageCount={setPageCount}
            maxThumbnails={30}
          />

          {pageCount > 0 && pageOrder.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Page order ({pageOrder.length} pages)
                </Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={resetOrder}
                    className="text-xs text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Reset order
                  </button>
                  <span className="text-muted-foreground">·</span>
                  <button
                    type="button"
                    onClick={reverseOrder}
                    className="text-xs text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Reverse
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {pageOrder.map((pageNum, idx) => (
                  <div
                    key={`${pageNum}-${idx}`}
                    className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2"
                  >
                    <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                      Page {pageNum}
                    </span>
                    <div className="flex shrink-0 gap-0.5">
                      <button
                        type="button"
                        onClick={() => movePage(idx, -1)}
                        disabled={idx === 0}
                        className="rounded p-0.5 text-muted-foreground hover:bg-accent disabled:opacity-30"
                        aria-label="Move up"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => movePage(idx, 1)}
                        disabled={idx === pageOrder.length - 1}
                        className="rounded p-0.5 text-muted-foreground hover:bg-accent disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Use the arrows to reorder pages. The new order will be saved when you click &quot;Rearrange pages&quot;.
              </p>
            </div>
          )}

          <ProcessButton loading={loading} onClick={process}>
            Rearrange pages
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}
