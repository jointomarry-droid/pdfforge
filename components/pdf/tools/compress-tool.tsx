"use client";

import * as React from "react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import type { CompressionLevel } from "@/lib/pdf/client/compress";
import { trackRecentFile } from "@/lib/utils";

const LEVEL_OPTIONS: { id: CompressionLevel; label: string; hint: string }[] = [
  { id: "max-quality", label: "Maximum quality", hint: "Best quality, modest size reduction" },
  { id: "balanced", label: "Balanced", hint: "Great quality with strong compression" },
  { id: "max-compression", label: "Maximum compression", hint: "Smallest file size" },
];

export function CompressTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [level, setLevel] = React.useState<CompressionLevel>("balanced");
  const [result, setResult] = React.useState<ResultFile | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });

  const process = async () => {
    if (!file) return;
    setLoading(true);
    setProgress({ current: 0, total: 0 });
    try {
      const { compressPdf } = await import("@/lib/pdf/client/compress");
      const out = await compressPdf(file, level, (current, total) => {
        setProgress({ current, total });
      });
      const pct = Math.max(0, Math.round((1 - out.compressedSize / out.originalSize) * 100));
      setResult({
        name: file.name.replace(/\.pdf$/i, "") + "-compressed.pdf",
        blob: out.blob,
      });
      toast.success(`File compressed — ${pct}% smaller`);
      trackRecentFile(file.name, "compress-pdf");
    } catch {
      toast.error("Failed to compress the PDF.");
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
          <FileList files={[file]} onRemove={() => { setFile(null); setResult(null); }} />
          <div className="space-y-2">
            <Label>Compression level</Label>
            <RadioGroup
              value={level}
              onValueChange={(v) => setLevel(v as CompressionLevel)}
              className="grid gap-2 sm:grid-cols-3"
            >
              {LEVEL_OPTIONS.map((opt) => (
                <Label
                  key={opt.id}
                  className="flex cursor-pointer flex-col gap-1 rounded-lg border p-4 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value={opt.id} className="absolute opacity-0" />
                  <span>{opt.label}</span>
                  <span className="text-xs font-normal text-muted-foreground">{opt.hint}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
          {loading && progress.total > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Compressing pages...</span>
                <span className="font-medium">{progress.current} / {progress.total}</span>
              </div>
              <Progress value={(progress.current / progress.total) * 100} />
            </div>
          )}
          <ProcessButton loading={loading} onClick={process}>
            Compress PDF
          </ProcessButton>
          {result && (
            <div className="rounded-lg border bg-muted/50 p-4 text-sm">
              {result.blob.size < file.size ? (
                <p className="text-foreground">
                  Size reduced from <span className="font-medium">{(file.size / 1024 / 1024).toFixed(1)} MB</span> to{" "}
                  <span className="font-medium">{(result.blob.size / 1024 / 1024).toFixed(1)} MB</span>.
                </p>
              ) : (
                <p className="text-foreground">
                  This file did not compress well at the selected level — try &quot;Maximum compression&quot;.
                </p>
              )}
            </div>
          )}
          <ResultCard results={result ? [result] : []} />
        </>
      )}
    </div>
  );
}
