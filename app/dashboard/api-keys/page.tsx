"use client";

import * as React from "react";
import { KeyRound, Plus, Trash2, Copy, CheckCircle2, Eye, EyeOff } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: number;
  lastUsed?: number;
}

const API_KEYS_KEY = "pdfforge-api-keys";

function getApiKeys(): ApiKey[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(API_KEYS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function generateApiKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "pdfforge_";
  for (let i = 0; i < 40; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

function saveApiKeys(keys: ApiKey[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(API_KEYS_KEY, JSON.stringify(keys));
  } catch {
    // Ignore localStorage errors
  }
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ApiKeysPage() {
  const [keys, setKeys] = React.useState<ApiKey[]>([]);
  const [mounted, setMounted] = React.useState(false);
  const [newKeyName, setNewKeyName] = React.useState("");
  const [showKey, setShowKey] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
    setKeys(getApiKeys());
  }, []);

  const handleCreate = () => {
    if (!newKeyName.trim()) return;
    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      name: newKeyName.trim(),
      key: generateApiKey(),
      createdAt: Date.now(),
    };
    const updated = [newKey, ...keys];
    saveApiKeys(updated);
    setKeys(updated);
    setNewKeyName("");
    setShowKey(newKey.id);
  };

  const handleDelete = (id: string) => {
    const updated = keys.filter((k) => k.id !== id);
    saveApiKeys(updated);
    setKeys(updated);
  };

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
          <p className="text-sm text-muted-foreground">
            Manage your API keys for programmatic access.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create new key</CardTitle>
          <CardDescription>
            Generate a new API key for accessing PDFForge programmatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key name (e.g., My App)"
              className="max-w-sm"
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <Button onClick={handleCreate} disabled={!newKeyName.trim()}>
              <Plus className="mr-1.5 h-4 w-4" />
              Create key
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your keys</CardTitle>
          <CardDescription>
            {keys.length === 0
              ? "No API keys yet. Create one above."
              : `${keys.length} key${keys.length > 1 ? "s" : ""} configured.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {!mounted ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <KeyRound className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : keys.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <KeyRound className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">No API keys</p>
              <p className="max-w-sm text-xs text-muted-foreground">
                Create an API key to access PDFForge programmatically.
              </p>
            </div>
          ) : (
            <ul className="divide-y">
              {keys.map((k) => (
                <li key={k.id} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{k.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <code className="text-xs text-muted-foreground font-mono">
                          {showKey === k.id
                            ? k.key
                            : k.key.slice(0, 12) + "..." + k.key.slice(-4)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => setShowKey(showKey === k.id ? null : k.id)}
                        >
                          {showKey === k.id ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => handleCopy(k.key, k.id)}
                        >
                          {copied === k.id ? (
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Created {formatDate(k.createdAt)}
                        {k.lastUsed && ` · Last used ${formatDate(k.lastUsed)}`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(k.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Learn how to use your API keys.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium mb-2">Base URL</p>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded">
              https://api.pdfforge.example.com/v1
            </code>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium mb-2">Authentication</p>
            <p className="text-xs text-muted-foreground">
              Include your API key in the Authorization header:
            </p>
            <code className="text-xs font-mono bg-background px-2 py-1 rounded mt-2 block">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
