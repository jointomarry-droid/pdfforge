import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo/metadata";
import { flags } from "@/lib/config/flags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "API",
  description: "Programmatic document conversion for developers and businesses.",
  path: "/api",
});

const ENDPOINTS = [
  {
    method: "POST",
    path: "/api/convert",
    desc: "Upload a file for server-side conversion. Returns 202 when queued.",
    params: "multipart/form-data: file, tool",
  },
  {
    method: "GET",
    path: "/api/health",
    desc: "Service health and capability flags.",
    params: "none",
  },
];

export default function ApiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">API</h1>
          <Badge variant={flags.billing.enabled ? "secondary" : "outline"}>
            {flags.billing.enabled ? "Business plan" : "Requires Business plan"}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Convert documents programmatically with a simple REST API. API access is included in
          Business and Enterprise plans. SDKs (Node, Python, PHP) and webhooks are on the
          roadmap.
        </p>
      </div>

      <div className="space-y-4">
        {ENDPOINTS.map((e) => (
          <Card key={e.path}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {e.method}
                </span>
                <CardTitle className="font-mono text-base">{e.path}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>{e.desc}</p>
              <p className="mt-1 font-mono text-xs">{e.params}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-xl border bg-muted/40 p-6 text-sm text-muted-foreground">
        <p className="mb-2 font-medium text-foreground">Authentication</p>
        <p>
          Authenticate with an API key in the <code className="font-mono text-xs">Authorization: Bearer</code>{" "}
          header. Generate keys from the dashboard under API Keys. SDKs and webhook signing are
          coming soon.
        </p>
      </div>
    </div>
  );
}
