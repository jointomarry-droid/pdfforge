"use client";

import * as React from "react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { pdfToText } from "@/lib/pdf/client/operations";
import { PdfThumbnails } from "@/components/pdf/pdf-thumbnails";

export function PdfToTextTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [result, setResult] = React.useState<ResultFile | null>(null);
  const [loading, setLoading] = React.useState(false);

  const process = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const text = await pdfToText(file);
      setResult({
        name: file.name.replace(/\.pdf$/i, "") + ".txt",
        blob: new Blob([text], { type: "text/plain;charset=utf-8" }),
      });
      toast.success("Text extracted successfully");
    } catch {
      toast.error("No text layer found. This PDF may be a scanned document — try PDF OCR.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file && <FileDropzone accept={["pdf"]} onFiles={(f) => setFile(f[0])} />}
      {file && (
        <>
          <FileList files={[file]} onRemove={() => { setFile(null); setResult(null); }} />
          <PdfThumbnails key={file.name} file={file} />
          <ProcessButton loading={loading} onClick={process}>
            Extract text
          </ProcessButton>
          {result && <ResultCard results={[result]} />}
        </>
      )}
    </div>
  );
}

interface SplitToolProps {
  mode?: "ranges" | "each";
}

export function SplitTool({ mode = "ranges" }: SplitToolProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [ranges, setRanges] = React.useState("1-3, 4-6");
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const process = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const { splitPdf, splitEveryPage, parseRanges } = await import("@/lib/pdf/client/operations");
      const outputs =
        mode === "each"
          ? await splitEveryPage(file)
          : await splitPdf(file, parseRanges(ranges, pageCount));
      if (outputs.length === 0) {
        toast.warning("No valid page ranges were entered.");
        return;
      }
      setResults(outputs.map((o) => ({ name: o.name, blob: o.blob })));
      toast.success(`Created ${outputs.length} file${outputs.length > 1 ? "s" : ""}`);
    } catch {
      toast.error("Failed to split the PDF.");
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
          <PdfThumbnails key={file.name} file={file} onPageCount={setPageCount} maxThumbnails={24} />
          {mode === "ranges" && (
            <div className="space-y-2">
              <Label htmlFor="ranges">
                Page ranges (e.g. <code>1-3, 4-6, 8</code>) — each range becomes a file
              </Label>
              <Input
                id="ranges"
                value={ranges}
                onChange={(e) => setRanges(e.target.value)}
                placeholder="1-3, 4-6, 8"
              />
            </div>
          )}
          {mode === "each" && pageCount > 0 && (
            <p className="text-sm text-muted-foreground">
              Every page will be extracted as its own PDF file ({pageCount} files).
            </p>
          )}
          <ProcessButton loading={loading} disabled={mode === "ranges" && ranges.trim() === ""} onClick={process}>
            Split PDF
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}

export function RotateTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [angle, setAngle] = React.useState<90 | 180 | 270>(90);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const process = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const { rotatePdf } = await import("@/lib/pdf/client/operations");
      const blob = await rotatePdf(file, angle);
      setResults([{ name: `rotated-${angle}.pdf`, blob }]);
      toast.success("PDF rotated successfully");
    } catch {
      toast.error("Failed to rotate the PDF.");
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
            <Label>Rotation angle</Label>
            <RadioGroup value={String(angle)} onValueChange={(v) => setAngle(Number(v) as 90 | 180 | 270)} className="flex gap-2">
              {[90, 180, 270].map((a) => (
                <Label
                  key={a}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value={String(a)} />
                  {a}°
                </Label>
              ))}
            </RadioGroup>
          </div>
          <ProcessButton loading={loading} onClick={process}>
            Rotate all pages
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}
