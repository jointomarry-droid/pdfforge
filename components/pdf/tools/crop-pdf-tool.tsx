"use client";

import * as React from "react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PdfThumbnails } from "@/components/pdf/pdf-thumbnails";
import { trackRecentFile } from "@/lib/utils";

type CropPreset = "custom" | "half-top" | "half-bottom" | "half-left" | "half-right" | "center-50" | "center-75";

const CROP_PRESETS: { id: CropPreset; label: string }[] = [
  { id: "custom", label: "Custom" },
  { id: "half-top", label: "Top half" },
  { id: "half-bottom", label: "Bottom half" },
  { id: "half-left", label: "Left half" },
  { id: "half-right", label: "Right half" },
  { id: "center-50", label: "Center 50%" },
  { id: "center-75", label: "Center 75%" },
];

interface CropSettings {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function CropPdfTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = React.useState(true);
  const [preset, setPreset] = React.useState<CropPreset>("custom");
  const [crop, setCrop] = React.useState<CropSettings>({ top: 0, bottom: 0, left: 0, right: 0 });
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const toggle = (page: number) => {
    setSelectAll(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(page)) next.delete(page);
      else next.add(page);
      return next;
    });
  };

  const handlePresetChange = (newPreset: CropPreset) => {
    setPreset(newPreset);
    if (newPreset === "custom") return;

    // Default to A4-like proportions for preset calculations
    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 36; // 0.5 inch margin

    switch (newPreset) {
      case "half-top":
        setCrop({ top: 0, bottom: pageHeight / 2, left: 0, right: 0 });
        break;
      case "half-bottom":
        setCrop({ top: pageHeight / 2, bottom: 0, left: 0, right: 0 });
        break;
      case "half-left":
        setCrop({ top: 0, bottom: 0, left: 0, right: pageWidth / 2 });
        break;
      case "half-right":
        setCrop({ top: 0, bottom: 0, left: pageWidth / 2, right: 0 });
        break;
      case "center-50":
        setCrop({
          top: pageHeight * 0.25,
          bottom: pageHeight * 0.25,
          left: pageWidth * 0.25,
          right: pageWidth * 0.25,
        });
        break;
      case "center-75":
        setCrop({
          top: pageHeight * 0.125,
          bottom: pageHeight * 0.125,
          left: pageWidth * 0.125,
          right: pageWidth * 0.125,
        });
        break;
    }
  };

  const process = async () => {
    if (!file) return;
    if (preset === "custom" && crop.top === 0 && crop.bottom === 0 && crop.left === 0 && crop.right === 0) {
      toast.warning("Set crop margins or choose a preset.");
      return;
    }
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const srcBytes = await file.arrayBuffer();
      const src = await PDFDocument.load(srcBytes);
      const doc = await PDFDocument.create();

      const pageIndices = selectAll
        ? src.getPageIndices()
        : [...selected].sort((a, b) => a - b).map((p) => p - 1);

      const pages = await doc.copyPages(src, pageIndices);

      for (const page of pages) {
        const { width, height } = page.getSize();
        const left = crop.left;
        const bottom = crop.bottom;
        const newWidth = width - crop.left - crop.right;
        const newHeight = height - crop.top - crop.bottom;

        if (newWidth <= 0 || newHeight <= 0) {
          toast.warning("Crop margins are too large for the page size.");
          setLoading(false);
          return;
        }

        page.setMediaBox(left, bottom, newWidth, newHeight);
        page.setCropBox(left, bottom, newWidth, newHeight);
        doc.addPage(page);
      }

      const saved = await doc.save();
      const blob = new Blob([new Uint8Array(saved)], { type: "application/pdf" });
      const baseName = file.name.replace(/\.pdf$/i, "");
      setResults([{ name: `${baseName}-cropped.pdf`, blob }]);
      toast.success("PDF cropped successfully");
      trackRecentFile(file.name, "crop-pdf");
    } catch {
      toast.error("Failed to crop PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file && <FileDropzone accept={["pdf"]} onFiles={(f) => setFile(f[0])} />}
      {file && (
        <>
          <FileList files={[file]} onRemove={() => { setFile(null); setResults([]); }} />
          <PdfThumbnails
            key={file.name}
            file={file}
            onPageCount={setPageCount}
            selected={selected}
            onToggle={toggle}
            maxThumbnails={30}
          />

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
              Crop all {pageCount} pages
            </label>
          )}

          <div className="space-y-3">
            <Label>Crop preset</Label>
            <RadioGroup value={preset} onValueChange={(v) => handlePresetChange(v as CropPreset)} className="flex flex-wrap gap-2">
              {CROP_PRESETS.map((p) => (
                <Label key={p.id} className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value={p.id} />
                  {p.label}
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="crop-top">Top margin (points)</Label>
              <Input
                id="crop-top"
                type="number"
                min={0}
                value={crop.top}
                onChange={(e) => { setCrop((c) => ({ ...c, top: Number(e.target.value) })); setPreset("custom"); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crop-bottom">Bottom margin (points)</Label>
              <Input
                id="crop-bottom"
                type="number"
                min={0}
                value={crop.bottom}
                onChange={(e) => { setCrop((c) => ({ ...c, bottom: Number(e.target.value) })); setPreset("custom"); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crop-left">Left margin (points)</Label>
              <Input
                id="crop-left"
                type="number"
                min={0}
                value={crop.left}
                onChange={(e) => { setCrop((c) => ({ ...c, left: Number(e.target.value) })); setPreset("custom"); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crop-right">Right margin (points)</Label>
              <Input
                id="crop-right"
                type="number"
                min={0}
                value={crop.right}
                onChange={(e) => { setCrop((c) => ({ ...c, right: Number(e.target.value) })); setPreset("custom"); }}
              />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
            1 point = 1/72 inch. Typical margins: 36pt = 0.5in, 72pt = 1in.
          </div>

          <ProcessButton loading={loading} onClick={process}>
            Crop PDF
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}
