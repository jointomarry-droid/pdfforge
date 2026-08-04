"use client";

import * as React from "react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import type { PageSizeOption } from "@/lib/pdf/client/operations";
import { trackRecentFile } from "@/lib/utils";

export function ImagesToPdfTool() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [pageSize, setPageSize] = React.useState<PageSizeOption>("a4");
  const [margin, setMargin] = React.useState(24);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const process = async () => {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const { imagesToPdf } = await import("@/lib/pdf/client/operations");
      const blob = await imagesToPdf(files, { pageSize, margin, preserveAspect: true });
      setResults([{ name: "images.pdf", blob }]);
      toast.success(`Created PDF with ${files.length} image${files.length > 1 ? "s" : ""}`);
      trackRecentFile(files[0].name, "images-to-pdf");
    } catch {
      toast.error("Failed to convert images to PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {files.length === 0 ? (
        <FileDropzone
          accept={["jpg", "jpeg", "png", "webp"]}
          multiple
          maxFiles={50}
          onFiles={setFiles}
        />
      ) : (
        <FileList files={files} onRemove={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))} />
      )}

      {files.length > 0 && (
        <>
          <div className="space-y-2">
            <Label>Page size</Label>
            <RadioGroup value={pageSize} onValueChange={(v) => setPageSize(v as PageSizeOption)} className="flex flex-wrap gap-2">
              {[
                { id: "a4", label: "A4" },
                { id: "letter", label: "Letter" },
                { id: "original", label: "Original size" },
              ].map((opt) => (
                <Label key={opt.id} className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value={opt.id} />
                  {opt.label}
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className="grid max-w-xs gap-2">
            <Label htmlFor="margin">Margin (points)</Label>
            <Input
              id="margin"
              type="number"
              min={0}
              max={100}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
            />
          </div>
          <ProcessButton loading={loading} onClick={process}>
            Convert to PDF
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}
