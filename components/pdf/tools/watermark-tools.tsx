"use client";

import * as React from "react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PdfThumbnails } from "@/components/pdf/pdf-thumbnails";
import type { PageNumberOptions } from "@/lib/pdf/client/operations";

export function WatermarkTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [text, setText] = React.useState("CONFIDENTIAL");
  const [opacity, setOpacity] = React.useState(0.25);
  const [fontSize, setFontSize] = React.useState(48);
  const [angle, setAngle] = React.useState(-45);
  const [color, setColor] = React.useState("#4f46e5");
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const process = async () => {
    if (!file) return;
    if (!text.trim()) {
      toast.warning("Enter the watermark text.");
      return;
    }
    setLoading(true);
    try {
      const { watermarkPdf } = await import("@/lib/pdf/client/operations");
      const blob = await watermarkPdf(file, { text, opacity, fontSize, angle, color });
      setResults([{ name: file.name.replace(/\.pdf$/i, "") + "-watermarked.pdf", blob }]);
      toast.success("Watermark applied");
    } catch {
      toast.error("Failed to apply the watermark.");
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wm-text">Watermark text</Label>
              <Input id="wm-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="CONFIDENTIAL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wm-color">Color</Label>
              <div className="flex gap-2">
                <input
                  id="wm-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-lg border border-input bg-background"
                />
                <Input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wm-opacity">Opacity: {Math.round(opacity * 100)}%</Label>
              <input
                id="wm-opacity"
                type="range"
                min={0.05}
                max={0.9}
                step={0.05}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wm-size">Font size: {fontSize}</Label>
              <input
                id="wm-size"
                type="range"
                min={16}
                max={120}
                step={2}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wm-angle">Rotation: {angle}°</Label>
              <input
                id="wm-angle"
                type="range"
                min={-90}
                max={90}
                step={5}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
          <PdfThumbnails key={file.name} file={file} maxThumbnails={12} />
          <ProcessButton loading={loading} onClick={process}>
            Add watermark
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}

export function PageNumbersTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [position, setPosition] = React.useState<PageNumberOptions["position"]>("bottom-center");
  const [startNumber, setStartNumber] = React.useState(1);
  const [prefix, setPrefix] = React.useState("");
  const [showTotal, setShowTotal] = React.useState(false);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const positions = [
    { id: "bottom-center", label: "Bottom center" },
    { id: "bottom-left", label: "Bottom left" },
    { id: "bottom-right", label: "Bottom right" },
    { id: "top-center", label: "Top center" },
    { id: "top-right", label: "Top right" },
  ] as const;

  const process = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const { addPageNumbers } = await import("@/lib/pdf/client/operations");
      const blob = await addPageNumbers(file, {
        position,
        startNumber,
        prefix,
        showTotal,
        fontSize: 12,
      });
      setResults([{ name: file.name.replace(/\.pdf$/i, "") + "-numbered.pdf", blob }]);
      toast.success("Page numbers added");
    } catch {
      toast.error("Failed to add page numbers.");
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
          <div className="space-y-2">
            <Label>Position</Label>
            <div className="flex flex-wrap gap-2">
              {positions.map((p) => (
                <label key={p.id} className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input type="radio" name="pos" checked={position === p.id} onChange={() => setPosition(p.id)} className="h-4 w-4 accent-primary" />
                  {p.label}
                </label>
              ))}
            </div>
          </div>
          <div className="grid max-w-xs gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start numbering at</Label>
              <Input id="start" type="number" min={1} value={startNumber} onChange={(e) => setStartNumber(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prefix">Prefix (optional)</Label>
              <Input id="prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="Page " />
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={showTotal} onChange={(e) => setShowTotal(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
              Show total (e.g. 3 / 12)
            </label>
          </div>
          <ProcessButton loading={loading} onClick={process}>
            Add page numbers
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}
