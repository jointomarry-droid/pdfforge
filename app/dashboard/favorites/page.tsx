"use client";

import * as React from "react";
import Link from "next/link";
import { Star, FileText, Trash2, ArrowRight, Inbox, Plus } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Favorite {
  id: string;
  name: string;
  tool: string;
  timestamp: number;
}

const FAVORITES_KEY = "pdfforge-favorites";

function getFavorites(): Favorite[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function removeFavorite(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const favorites = getFavorites();
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites.filter((f) => f.id !== id)),
    );
  } catch {
    // Ignore localStorage errors
  }
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

function formatToolName(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = React.useState<Favorite[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Favorites</h1>
          <p className="text-sm text-muted-foreground">
            Your saved documents and frequently used tools.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/tools">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add tool
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {!mounted ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Star className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <Inbox className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">No favorites yet</p>
              <p className="max-w-sm text-xs text-muted-foreground">
                Save your favorite tools and documents for quick access.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href="/tools">Browse tools</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y">
              {favorites.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatToolName(f.tool)} · {formatTimeAgo(f.timestamp)}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    Favorite
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-destructive hover:text-destructive"
                    onClick={() => handleRemove(f.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
