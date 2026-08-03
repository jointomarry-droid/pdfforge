"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { loadPdf, renderPageToCanvas } from "@/lib/pdf/client/pdfjs";

interface PdfThumbnailsProps {
  file: File;
  /** 1-based page numbers currently selected. */
  selected?: Set<number>;
  onToggle?: (page: number) => void;
  onPageCount?: (count: number) => void;
  maxThumbnails?: number;
  className?: string;
}

interface Thumb {
  page: number;
  src: string;
}

export function PdfThumbnails({
  file,
  selected,
  onToggle,
  onPageCount,
  maxThumbnails = 40,
  className,
}: PdfThumbnailsProps) {
  const [thumbs, setThumbs] = React.useState<Thumb[]>([]);
  const [total, setTotal] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const doc = await loadPdf(file);
        if (cancelled) {
          await doc.loadingTask.destroy();
          return;
        }
        setTotal(doc.numPages);
        onPageCount?.(doc.numPages);
        const cap = Math.min(doc.numPages, maxThumbnails);
        const results: Thumb[] = [];
        for (let i = 1; i <= cap; i++) {
          if (cancelled) break;
          const { canvas } = await renderPageToCanvas(doc, i, 0.35);
          results.push({ page: i, src: canvas.toDataURL("image/png") });
          canvas.width = 0;
          canvas.height = 0;
          setThumbs([...results]);
        }
        await doc.loadingTask.destroy();
      } catch {
        if (!cancelled) setError("Could not preview this PDF. It may be corrupted or protected.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [file, maxThumbnails, onPageCount]);

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  return (
    <div className={cn("grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5", className)}>
      {thumbs.map((t) => {
        const isSelected = selected?.has(t.page);
        return (
          <button
            key={t.page}
            type="button"
            onClick={() => onToggle?.(t.page)}
            className={cn(
              "group relative overflow-hidden rounded-lg border-2 bg-secondary transition-all",
              onToggle
                ? isSelected
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-transparent hover:border-primary/50"
                : "border-border",
            )}
            aria-pressed={isSelected}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.src} alt={`Page ${t.page}`} className="h-auto w-full" />
            <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
              {t.page}
            </span>
            {onToggle && (
              <span
                className={cn(
                  "absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-black/40 text-white",
                )}
              >
                {isSelected ? "✓" : ""}
              </span>
            )}
          </button>
        );
      })}
      {total > maxThumbnails && (
        <p className="col-span-full text-center text-xs text-muted-foreground">
          Previewing first {maxThumbnails} of {total} pages
        </p>
      )}
    </div>
  );
}
