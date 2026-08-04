"use client";

import * as React from "react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PdfThumbnails } from "@/components/pdf/pdf-thumbnails";

interface PdfToImagesToolProps {
  format: "jpeg" | "png";
}

const PRESETS = [
  { id: "screen", label: "Screen (72 DPI)", scale: 1 },
  { id: "print", label: "Print (150 DPI)", scale: 2 },
  { id: "high", label: "High (300 DPI)", scale: 4 },
] as const;

export function PdfToImagesTool({ format }: PdfToImagesToolProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [quality, setQuality] = React.useState(90);
  const [scale, setScale] = React.useState(2);
  const [pageCount, setPageCount] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = React.useState(true);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });

  const toggle = (page: number) => {
    setSelectAll(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(page)) next.delete(page);
      else next.add(page);
      return next;
    });
  };

  const process = async () => {
    if (!file) return;
    setLoading(true);
    setProgress({ current: 0, total: 0 });
    try {
      const { pdfToImages } = await import("@/lib/pdf/client/pdf-to-images");
      const pages = selectAll ? [] : [...selected].sort((a, b) => a - b);
      const { blobs } = await pdfToImages(file, { format, quality, scale, pages }, (current, total) => {
        setProgress({ current, total });
      });
      setResults(blobs.map((b) => ({ name: b.name, blob: b.blob })));
      toast.success(`Exported ${blobs.length} image${blobs.length > 1 ? "s" : ""}`);
    } catch {
      toast.error("Failed to export images.");
    } finally {
      setLoading(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  return (
    <div className="space-y-6">
      {!file && <FileDropzone accept={["pdf"]} onFiles={(f) => setFile(f[0])} />}
      {file && (
        <>
          <FileList files={[file]} onRemove={() => { setFile(null); setResults([]); }} />
          <PdfThumbnails key={file.name} file={file} onPageCount={setPageCount} selected={selected} onToggle={toggle} maxThumbnails={30} />
          {pageCount > 1 && (
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => {
                  setSelectAll(e.target.checked);
                  if (e.target.checked) setSelected(new Set());
                }}
                className="h-4 w-4 rounded border-input accent-primary"
              />
              Export all {pageCount} pages
            </label>
          )}
          <div className="space-y-2">
            <Label>Resolution</Label>
            <RadioGroup value={String(scale)} onValueChange={(v) => setScale(Number(v))} className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <Label key={p.id} className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value={String(p.scale)} />
                  {p.label}
                </Label>
              ))}
            </RadioGroup>
          </div>
          {format === "jpeg" && (
            <div className="grid max-w-xs gap-2">
              <Label htmlFor="quality">JPEG quality</Label>
              <Input id="quality" type="number" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
            </div>
          )}
          {loading && progress.total > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rendering pages...</span>
                <span className="font-medium">{progress.current} / {progress.total}</span>
              </div>
              <Progress value={(progress.current / progress.total) * 100} />
            </div>
          )}
          <ProcessButton
            loading={loading}
            disabled={!selectAll && selected.size === 0}
            onClick={process}
          >
            Export as {format.toUpperCase()}
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}
