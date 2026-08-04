"use client";

import * as React from "react";
import { FileText } from "lucide-react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

export function WordToPdfTool() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [pageSize, setPageSize] = React.useState<"a4" | "letter">("a4");
  const [margin, setMargin] = React.useState(48);
  const [fontSize, setFontSize] = React.useState(13);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const process = async () => {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const { docxToPdf } = await import("@/lib/pdf/client/text-pdf");
      const out: ResultFile[] = [];
      for (const file of files) {
        const blob = await docxToPdf(file, { pageSize, margin, fontSize });
        const name = file.name.replace(/\.docx?$/i, "") + ".pdf";
        out.push({ name, blob });
      }
      setResults(out);
      toast.success(`Converted ${files.length} file${files.length > 1 ? "s" : ""} to PDF`);
    } catch {
      toast.error("Failed to convert Word document. Make sure the file is a valid .docx file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
        <FileText className="h-5 w-5 shrink-0" />
        Upload a Word document (.docx) and it will be converted to a clean PDF. Headings, lists,
        paragraphs and basic formatting are preserved.
      </div>

      {files.length === 0 ? (
        <FileDropzone
          accept={["docx", "doc"]}
          multiple
          maxFiles={10}
          onFiles={setFiles}
          hint="Accepts .docx and .doc files up to 50 MB"
        />
      ) : (
        <FileList
          files={files}
          onRemove={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
        />
      )}

      {files.length > 0 && (
        <>
          <div className="space-y-2">
            <Label>Page size</Label>
            <RadioGroup
              value={pageSize}
              onValueChange={(v) => setPageSize(v as "a4" | "letter")}
              className="flex flex-wrap gap-2"
            >
              {[
                { id: "a4", label: "A4" },
                { id: "letter", label: "Letter" },
              ].map((opt) => (
                <Label
                  key={opt.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <RadioGroupItem value={opt.id} />
                  {opt.label}
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="grid max-w-xs gap-2">
            <Label htmlFor="docx-margin">Margin (points): {margin}</Label>
            <Input
              id="docx-margin"
              type="range"
              min={24}
              max={96}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
            />
          </div>

          <div className="grid max-w-xs gap-2">
            <Label htmlFor="docx-font">Font size: {fontSize}pt</Label>
            <Input
              id="docx-font"
              type="number"
              min={9}
              max={24}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
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
