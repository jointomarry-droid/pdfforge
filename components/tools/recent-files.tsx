"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, FileText, Trash2, ArrowRight } from "lucide-react";

interface RecentFile {
  name: string;
  tool: string;
  timestamp: number;
}

const STORAGE_KEY = "pdfforge-recent-files";
const MAX_ITEMS = 6;

export function getRecentFiles(): RecentFile[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentFile(name: string, tool: string): void {
  if (typeof window === "undefined") return;
  try {
    const files = getRecentFiles();
    const updated = [
      { name, tool, timestamp: Date.now() },
      ...files.filter((f) => f.name !== name || f.tool !== tool),
    ].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore localStorage errors
  }
}

export function clearRecentFiles(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function RecentFiles() {
  const [files, setFiles] = React.useState<RecentFile[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setFiles(getRecentFiles());
  }, []);

  if (!mounted || files.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="rounded-xl border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Recent files</h2>
          </div>
          <button
            onClick={() => {
              clearRecentFiles();
              setFiles([]);
            }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((f, i) => (
            <Link
              key={`${f.name}-${f.timestamp}`}
              href={`/tools/${f.tool}`}
              className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{f.name}</p>
                <p className="text-xs text-muted-foreground">
                  {f.tool.replace(/-/g, " ")} · {formatTimeAgo(f.timestamp)}
                </p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
