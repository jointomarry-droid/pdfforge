"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";

import { cn, downloadBlob, formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface ResultFile {
  name: string;
  blob: Blob;
}

export function ToolCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4 sm:p-6">{children}</CardContent>
    </Card>
  );
}

export function ProcessButton({
  disabled,
  loading,
  onClick,
  children,
}: {
  disabled?: boolean;
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button size="lg" disabled={disabled || loading} onClick={onClick} className="w-full sm:w-auto">
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? "Processing…" : children}
    </Button>
  );
}

export function ResultCard({ results }: { results: ResultFile[] }) {
  if (results.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          {results.length === 1 ? "Your file is ready" : `${results.length} files ready`}
        </h3>
        {results.length > 1 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (results.length > 1 && results.some((r) => r.name.endsWith(".pdf"))) {
                import("@/lib/pdf/client/zip").then(({ createZipFromBlobs }) =>
                  createZipFromBlobs(results).then((zip) => {
                    downloadBlob(zip, "pdfforge-outputs.zip");
                    toast.success("ZIP archive downloaded");
                  }),
                );
              } else {
                results.forEach((r) => downloadBlob(r.blob, r.name));
              }
            }}
          >
            <Download className="h-4 w-4" />
            Download all (ZIP)
          </Button>
        )}
      </div>
      <ul className="space-y-2">
        {results.map((r, i) => (
          <li
            key={`${r.name}-${i}`}
            className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(r.blob.size)}</p>
            </div>
            <Button
              size="sm"
              onClick={() => {
                downloadBlob(r.blob, r.name);
                toast.success("Download started");
              }}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function SectionHeading({
  step,
  title,
  description,
}: {
  step?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-1">
      {step && (
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{step}</p>
      )}
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
