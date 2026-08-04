"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, FileText, Trash2, ArrowRight, Inbox } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRecentFiles, clearRecentFiles, type RecentFile } from "@/components/tools/recent-files";

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

function formatToolName(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ConversionsPage() {
  const [files, setFiles] = React.useState<RecentFile[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setFiles(getRecentFiles());
  }, []);

  const handleClear = () => {
    clearRecentFiles();
    setFiles([]);
  };

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Conversions</h1>
          <p className="text-sm text-muted-foreground">
            Your recent file conversions. Stored locally in your browser.
          </p>
        </div>
        {files.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Clear all
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          {!mounted ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Clock className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Inbox className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">No conversions yet</p>
              <p className="max-w-sm text-xs text-muted-foreground">
                Use any PDF tool and your conversion history will appear here.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href="/tools">Browse tools</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${f.timestamp}-${i}`}
                  className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatToolName(f.tool)} · {formatTimeAgo(f.timestamp)}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {f.tool.includes("pdf") ? "PDF" : "File"}
                  </Badge>
                  <Button asChild variant="ghost" size="sm" className="shrink-0">
                    <Link href={`/tools/${f.tool}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
