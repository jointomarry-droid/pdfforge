"use client";

import * as React from "react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { PdfThumbnails } from "@/components/pdf/pdf-thumbnails";
import { cn } from "@/lib/utils";

export function DeletePagesTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
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

  const process = async () => {
    if (!file) return;
    if (selected.size === 0) {
      toast.warning("Select at least one page to delete.");
      return;
    }
    setLoading(true);
    try {
      const { deletePages } = await import("@/lib/pdf/client/operations");
      const blob = await deletePages(file, [...selected].sort((a, b) => a - b));
      setResults([{ name: file.name.replace(/\.pdf$/i, "") + "-reduced.pdf", blob }]);
      toast.success(`Deleted ${selected.size} page${selected.size > 1 ? "s" : ""}`);
    } catch {
      toast.error("Failed to delete pages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file && <FileDropzone accept={["pdf"]} onFiles={(f) => setFile(f[0])} />}
      {file && (
        <>
          <FileList files={[file]} onRemove={() => { setFile(null); setSelected(new Set()); setResults([]); }} />
          <p className="text-sm text-muted-foreground">
            Click pages to mark them for deletion. Selected pages show a {selected.size > 0 && <span className="font-semibold text-destructive">— {selected.size} selected</span>}.
          </p>
          <PdfThumbnails key={file.name} file={file} selected={selected} onToggle={toggle} maxThumbnails={40} />
          <ProcessButton loading={loading} disabled={selected.size === 0} onClick={process}>
            Delete selected pages
          </ProcessButton>
          {selected.size > 0 && (
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="text-sm text-primary underline underline-offset-2"
            >
              Clear selection
            </button>
          )}
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}

export function RotatePagesTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const [all, setAll] = React.useState(true);
  const [angle, setAngle] = React.useState<90 | 180 | 270>(90);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const toggle = (page: number) => {
    setAll(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(page)) next.delete(page);
      else next.add(page);
      return next;
    });
  };

  const process = async () => {
    if (!file) return;
    if (!all && selected.size === 0) {
      toast.warning("Select the pages to rotate, or choose 'All pages'.");
      return;
    }
    setLoading(true);
    try {
      const { rotatePdf } = await import("@/lib/pdf/client/operations");
      const pages = all ? undefined : [...selected].sort((a, b) => a - b);
      const blob = await rotatePdf(file, angle, pages);
      setResults([{ name: `rotated-${angle}.pdf`, blob }]);
      toast.success("Pages rotated");
    } catch {
      toast.error("Failed to rotate pages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file && <FileDropzone accept={["pdf"]} onFiles={(f) => setFile(f[0])} />}
      {file && (
        <>
          <FileList files={[file]} onRemove={() => { setFile(null); setSelected(new Set()); setAll(true); setResults([]); }} />
          <div className="flex flex-wrap gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="radio" name="rot" checked={all} onChange={() => setAll(true)} className="h-4 w-4 accent-primary" />
              All pages
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="radio" name="rot" checked={!all} onChange={() => setAll(false)} className="h-4 w-4 accent-primary" />
              Selected pages
            </label>
          </div>
          {!all && (
            <PdfThumbnails key={file.name} file={file} selected={selected} onToggle={toggle} maxThumbnails={40} />
          )}
          <div className="flex flex-wrap gap-2">
            {([90, 180, 270] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAngle(a)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                  angle === a ? "border-primary bg-primary/5 text-primary" : "hover:bg-accent",
                )}
              >
                {a}°
              </button>
            ))}
          </div>
          <ProcessButton loading={loading} onClick={process}>
            Rotate
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}
