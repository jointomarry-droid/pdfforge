"use client";

import * as React from "react";
import { FileText, Code, FileSpreadsheet, FileDown } from "lucide-react";
import { toast } from "sonner";

import { FileDropzone, FileList } from "@/components/pdf/dropzone";
import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trackRecentFile } from "@/lib/utils";

type ExportFormat = "html" | "markdown" | "csv" | "docx";

interface PdfExportToolProps {
  format: ExportFormat;
}

const FORMAT_CONFIG: Record<ExportFormat, { label: string; icon: React.ElementType; extension: string; mimeType: string }> = {
  html: { label: "HTML", icon: Code, extension: "html", mimeType: "text/html" },
  markdown: { label: "Markdown", icon: FileText, extension: "md", mimeType: "text/markdown" },
  csv: { label: "CSV", icon: FileSpreadsheet, extension: "csv", mimeType: "text/csv" },
  docx: { label: "Word", icon: FileDown, extension: "docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
};

export function PdfExportTool({ format }: PdfExportToolProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  const config = FORMAT_CONFIG[format];
  const Icon = config.icon;

  const process = async () => {
    if (!file) return;
    setLoading(true);
    try {
      let blob: Blob;
      const baseName = file.name.replace(/\.pdf$/i, "");

      switch (format) {
        case "html": {
          const mod = await import("@/lib/pdf/client/pdf-to-html");
          const html = await mod.pdfToHtml(file, { includeStyles: true });
          blob = new Blob([html], { type: config.mimeType });
          break;
        }
        case "markdown": {
          const mod = await import("@/lib/pdf/client/pdf-to-markdown");
          const md = await mod.pdfToMarkdown(file);
          blob = new Blob([md], { type: config.mimeType });
          break;
        }
        case "csv": {
          const mod = await import("@/lib/pdf/client/pdf-to-csv");
          const csv = await mod.pdfToCsv(file);
          blob = new Blob([csv], { type: config.mimeType });
          break;
        }
        case "docx": {
          const mod = await import("@/lib/pdf/client/pdf-to-docx");
          blob = await mod.pdfToDocx(file);
          break;
        }
        default:
          throw new Error(`Unknown format: ${format}`);
      }

      setResults([{ name: `${baseName}.${config.extension}`, blob }]);
      toast.success(`Converted to ${config.label}`);
      trackRecentFile(file.name, `pdf-to-${format}`);
    } catch {
      toast.error(`Failed to convert to ${config.label}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file && (
        <FileDropzone accept={["pdf"]} onFiles={(f) => setFile(f[0])} />
      )}
      {file && (
        <>
          <FileList
            files={[file]}
            onRemove={() => { setFile(null); setResults([]); }}
          />
          <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
            <Icon className="h-5 w-5 shrink-0" />
            {format === "html" && "Extract text and structure from your PDF into a clean HTML file."}
            {format === "markdown" && "Convert your PDF text into well-structured Markdown format."}
            {format === "csv" && "Extract tables from your PDF into CSV format for spreadsheets."}
            {format === "docx" && "Convert your PDF to an editable Word document."}
          </div>
          <ProcessButton loading={loading} onClick={process}>
            Convert to {config.label}
          </ProcessButton>
          <ResultCard results={results} />
        </>
      )}
    </div>
  );
}

export function PdfToHtmlTool() {
  return <PdfExportTool format="html" />;
}

export function PdfToMarkdownTool() {
  return <PdfExportTool format="markdown" />;
}

export function PdfToCsvTool() {
  return <PdfExportTool format="csv" />;
}

export function PdfToDocxTool() {
  return <PdfExportTool format="docx" />;
}
