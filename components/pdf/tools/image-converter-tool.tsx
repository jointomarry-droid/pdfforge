"use client";

import * as React from "react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ConvertFormat } from "@/lib/pdf/client/image-convert";

const FORMATS: { id: ConvertFormat; label: string }[] = [
  { id: "jpg", label: "JPG" },
  { id: "png", label: "PNG" },
  { id: "webp", label: "WEBP" },
];

export function ImageConverterTool() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [format, setFormat] = React.useState<ConvertFormat>("jpg");
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const process = async () => {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const { convertImage } = await import("@/lib/pdf/client/image-convert");
      const out: ResultFile[] = [];
      for (const file of files) {
        const blob = await convertImage(file, { format, quality: 92 });
        const base = file.name.replace(/\.[^.]+$/, "");
        out.push({ name: `${base}.${format}`, blob });
      }
      setResults(out);
      toast.success(`Converted ${out.length} image${out.length > 1 ? "s" : ""}`);
    } catch {
      toast.error("One or more images could not be converted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {files.length === 0 ? (
        <FileDropzone accept={["jpg", "jpeg", "png", "webp", "avif", "heic"]} multiple maxFiles={50} onFiles={setFiles} />
      ) : (
        <FileList files={files} onRemove={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))} />
      )}

      {files.length > 0 && (
        <>
          <div className="space-y-2">
            <Label>Convert to</Label>
            <RadioGroup value={format} onValueChange={(v) => setFormat(v as ConvertFormat)} className="flex gap-2">
              {FORMATS.map((f) => (
                <Label key={f.id} className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value={f.id} />
                  {f.label}
                </Label>
              ))}
            </RadioGroup>
          </div>
          <ProcessButton loading={loading} onClick={process}>
            Convert {files.length} image{files.length > 1 ? "s" : ""}
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}
