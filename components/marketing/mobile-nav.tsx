"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { tools, categoryMeta } from "@/lib/tools/registry";
import type { ToolCategory } from "@/types/tool";

const LINKS = [
  { href: "/tools", label: "Tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/dashboard", label: "Dashboard" },
];

const CATEGORIES: ToolCategory[] = [
  "convert-to-pdf",
  "convert-from-pdf",
  "edit",
  "compress",
  "ocr",
  "ai",
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showCategories, setShowCategories] = React.useState(false);

  const filteredTools = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return tools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [searchQuery]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border text-foreground"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-b bg-background px-4 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>

          {/* Search results */}
          {filteredTools.length > 0 && (
            <div className="mb-4 space-y-1">
              {filteredTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-accent"
                >
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}

          {/* Links */}
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Categories */}
          <div className="mt-4 border-t pt-4">
            <button
              onClick={() => setShowCategories((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
            >
              Tool Categories
              <ChevronRight className={`h-4 w-4 transition-transform ${showCategories ? "rotate-90" : ""}`} />
            </button>
            {showCategories && (
              <div className="mt-1 space-y-1 pl-3">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href="/tools"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    {categoryMeta[cat].label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-6 space-y-2">
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Get started free
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block rounded-lg border px-3 py-2.5 text-center text-sm font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
