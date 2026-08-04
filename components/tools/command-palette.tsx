"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, ArrowRight, Command } from "lucide-react";

import { tools, categoryMeta } from "@/lib/tools/registry";
import { cn } from "@/lib/utils";
import type { ToolCategory } from "@/types/tool";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = React.useMemo(() => {
    if (!query.trim()) return tools.slice(0, 12);
    const q = query.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q)) ||
        t.category.replace(/-/g, " ").includes(q)
    );
  }, [query]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        }
      }
      if (!open) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        router.push(`/tools/${filtered[selectedIndex].slug}`);
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selectedIndex, router, onClose]);

  if (!open) return null;

  const grouped = filtered.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<ToolCategory, typeof tools>
  );

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-x-4 top-[15%] mx-auto max-w-xl">
        <div className="rounded-xl border bg-background shadow-2xl">
          <div className="flex items-center gap-3 border-b px-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tools... (e.g. merge, compress, word to pdf)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
              ESC
            </kbd>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No tools found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              Object.entries(grouped).map(([cat, catTools]) => (
                <div key={cat} className="mb-2">
                  <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {categoryMeta[cat as ToolCategory]?.label ?? cat}
                  </p>
                  {catTools.map((tool) => {
                    const idx = filtered.indexOf(tool);
                    return (
                      <button
                        key={tool.slug}
                        onClick={() => {
                          router.push(`/tools/${tool.slug}`);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors",
                          idx === selectedIndex
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent"
                        )}
                      >
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{tool.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {tool.description}
                          </p>
                        </div>
                        {tool.placeholder ? (
                          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            Soon
                          </span>
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
          <div className="flex items-center justify-between border-t px-4 py-2.5 text-xs text-muted-foreground">
            <span>↑↓ navigate · ↵ select · esc close</span>
            <span>{tools.length} tools</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommandPaletteTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search tools...</span>
      <kbd className="hidden rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
        <Command className="inline h-2.5 w-2.5" /> K
      </kbd>
    </button>
  );
}
