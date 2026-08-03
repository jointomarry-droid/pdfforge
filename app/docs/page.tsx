import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = buildMetadata({
  title: "Documentation",
  description: "Developer and product documentation for the PDFForge platform.",
  path: "/docs",
});

const SECTIONS = [
  {
    title: "Browser-based processing",
    body: [
      "Core PDF tools — merge, split, rotate, compress, watermark, page numbers, delete pages, PDF-to-image and PDF-to-text — run entirely in your browser using pdf-lib and pdf.js (WASM). Files are read locally and never uploaded to a server.",
      "This gives you instant results, strong privacy guarantees and near-zero infrastructure cost for the most popular tools.",
    ],
  },
  {
    title: "Server-side pipeline",
    body: [
      "Office conversions (Word, Excel, PowerPoint), OCR and AI features require a server-side pipeline. The reference architecture uses a job queue (BullMQ + Redis) with worker containers running LibreOffice, Ghostscript, Tesseract and FFmpeg.",
      "Configure the queue by setting REDIS_URL. When the queue is unavailable, tools degrade to a 'coming soon' state instead of failing.",
    ],
  },
  {
    title: "Authentication & data",
    body: [
      "Auth is provided by Clerk or Better Auth and gated behind the AUTH_SECRET environment variable. The Prisma schema (prisma/schema.prisma) models users, workspaces, conversions, favorites, API keys and audit logs.",
      "PostgreSQL is the primary store. Redis caches rate-limit counters and session data. File payloads are stored in Vercel Blob / S3 with auto-delete after one hour.",
    ],
  },
  {
    title: "Billing",
    body: [
      "Plans are defined in lib/config/plans.ts and billed through Stripe, Lemon Squeezy or Paddle depending on which SECRET_KEY is provided. Webhooks update subscriptions and usage limits in real time.",
    ],
  },
  {
    title: "AI features",
    body: [
      "AI tools (summary, chat, translation, rewrite) call your own LLM provider via the USER_LLM_API_KEY / USER_LLM_BASE_URL / USER_LLM_MODEL environment variables. You bring your own key — the platform never ships one.",
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-10 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground">
          How the platform works and how to configure it.
        </p>
      </div>
      <div className="space-y-6">
        {SECTIONS.map((s) => (
          <Card key={s.title}>
            <CardContent className="p-6">
              <h2 className="mb-3 text-lg font-semibold">{s.title}</h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
