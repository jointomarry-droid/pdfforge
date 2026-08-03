"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

import { cn, formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileDropzoneProps {
  accept: string[];
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMb?: number;
  onFiles: (files: File[]) => void;
  className?: string;
  hint?: string;
}

function matchesAccept(file: File, accept: string[]): boolean {
  if (accept.includes("any")) return true;
  const name = file.name.toLowerCase();
  return accept.some((ext) => name.endsWith(`.${ext.replace(/^\./, "")}`));
}

export function FileDropzone({
  accept,
  multiple = false,
  maxFiles = 1,
  maxSizeMb = 50,
  onFiles,
  className,
  hint,
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const handleFiles = React.useCallback(
    (list: FileList | File[]) => {
      const files = Array.from(list);
      if (!multiple && files.length > 1) {
        toast.warning("Only one file can be uploaded for this tool.");
        files.splice(1);
      }
      const valid = files.filter((f) => {
        if (!matchesAccept(f, accept)) {
          toast.error(`"${f.name}" has an unsupported file type.`);
          return false;
        }
        if (f.size > maxSizeMb * 1024 * 1024) {
          toast.error(`"${f.name}" exceeds the ${maxSizeMb} MB limit.`);
          return false;
        }
        return true;
      });
      if (valid.length > 0) {
        onFiles(multiple ? valid.slice(0, maxFiles) : [valid[0]]);
      }
    },
    [accept, multiple, maxFiles, maxSizeMb, onFiles],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        dragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-accent/50",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={accept.map((e) => (e === "any" ? "" : `.${e.replace(/^\./, "")}`)).join(",")}
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <motion.div
        initial={{ scale: 1 }}
        animate={dragging ? { scale: 1.08 } : { scale: 1 }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
      >
        <UploadCloud className="h-7 w-7" />
      </motion.div>
      <div className="space-y-1">
        <p className="text-sm font-medium">
          {dragging ? "Drop your files here" : "Drag & drop your files here"}
        </p>
        <p className="text-xs text-muted-foreground">
          or <span className="text-primary underline underline-offset-2">browse</span> from your
          device
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        {hint ?? `Accepts ${accept.join(", ")} files up to ${maxSizeMb} MB`}
      </p>
    </div>
  );
}

interface FileListProps {
  files: File[];
  onRemove?: (index: number) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;
  return (
    <ul className="space-y-2">
      {files.map((file, i) => (
        <li
          key={`${file.name}-${file.lastModified}-${i}`}
          className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onRemove(i)}
              aria-label={`Remove ${file.name}`}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
