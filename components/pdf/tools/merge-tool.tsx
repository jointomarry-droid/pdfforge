"use client";

import * as React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { toast } from "sonner";

import { FileDropzone } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Button } from "@/components/ui/button";
import { mergePdfs } from "@/lib/pdf/client/operations";

export function MergeTool() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const move = (index: number, dir: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const process = async () => {
    if (files.length < 2) {
      toast.warning("Add at least two PDF files to merge.");
      return;
    }
    setLoading(true);
    try {
      const blob = await mergePdfs(files);
      setResults([{ name: "merged.pdf", blob }]);
      toast.success("PDFs merged successfully");
    } catch {
      toast.error("Failed to merge PDFs. One of the files may be corrupted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {files.length === 0 ? (
        <FileDropzone accept={["pdf"]} multiple maxFiles={20} onFiles={setFiles} />
      ) : (
        <div className="space-y-3">
          <ul className="space-y-2">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    {file.name}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => move(i, 1)} disabled={i === files.length - 1} aria-label="Move down">
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    aria-label="Remove"
                  >
                    ✕
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setFiles([])}>
              Add more files
            </Button>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <ProcessButton loading={loading} disabled={files.length < 2} onClick={process}>
          Merge PDFs
        </ProcessButton>
      )}
      <ResultCard results={results} />
    </div>
  );
}
