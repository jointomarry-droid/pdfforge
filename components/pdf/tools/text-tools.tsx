"use client";

import * as React from "react";
import { FileText } from "lucide-react";
import { toast } from "sonner";

import { ProcessButton, ResultCard, type ResultFile } from "@/components/pdf/tool-shell";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileDropzone } from "@/components/pdf/dropzone";

interface TextToPdfToolProps {
  markdown?: boolean;
}

export function TextToPdfTool({ markdown = false }: TextToPdfToolProps) {
  const [text, setText] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [fontSize, setFontSize] = React.useState(13);
  const [results, setResults] = React.useState<ResultFile[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (file) {
      file.text().then((content) => setText(content));
    }
  }, [file]);

  const process = async () => {
    if (!text.trim()) {
      toast.warning("Enter some text or upload a file first.");
      return;
    }
    setLoading(true);
    try {
      const mod = await import("@/lib/pdf/client/text-pdf");
      const blob = markdown
        ? await mod.markdownToPdf(text, { fontSize, margin: 48, pageSize: "a4" })
        : await mod.textToPdf(text, { fontSize, margin: 48, pageSize: "a4" });
      const ext = markdown ? "md" : "txt";
      setResults([{ name: `document.${ext}.pdf`, blob }]);
      toast.success("PDF created");
    } catch {
      toast.error("Failed to generate the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
        <FileText className="h-5 w-5 shrink-0" />
        {markdown
          ? "Paste Markdown or upload a .md file. Headings, lists, code blocks and quotes are styled automatically."
          : "Paste plain text or upload a .txt file. Text is wrapped and paginated automatically."}
      </div>
      {!file && !text && (
        <FileDropzone accept={markdown ? ["md"] : ["txt"]} onFiles={(f) => setFile(f[0])} />
      )}
      {text.length === 0 && file === null ? null : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="doc-text">{markdown ? "Markdown content" : "Text content"}</Label>
            <button type="button" onClick={() => { setText(""); setFile(null); }} className="text-xs text-primary underline underline-offset-2">
              Clear
            </button>
          </div>
          <Textarea
            id="doc-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[280px] font-mono text-xs"
            placeholder={markdown ? "# Heading\n\nSome **bold** text…" : "Type or paste your text here…"}
          />
          <div className="grid max-w-xs gap-2">
            <Label htmlFor="fs">Font size: {fontSize}pt</Label>
            <Input id="fs" type="number" min={9} max={24} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
          </div>
          <ProcessButton loading={loading} onClick={process}>
            Convert to PDF
          </ProcessButton>
          <ResultCard results={results} />
        </div>
      )}
    </div>
  );
}
