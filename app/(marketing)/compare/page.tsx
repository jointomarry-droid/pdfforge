import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Shield, Zap, Lock, Globe } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "PDFForge vs SmallPDF vs iLovePDF — Best Free PDF Tool Comparison (2026)",
  description:
    "Compare PDFForge, SmallPDF, iLovePDF, and PDF24. Find the best free PDF tool based on features, privacy, speed, and pricing. Browser-based vs server-side processing.",
  path: "/compare",
});

interface ComparisonFeature {
  feature: string;
  pdfforge: string | boolean;
  smallpdf: string | boolean;
  ilovepdf: string | boolean;
  pdf24: string | boolean;
}

const FEATURES: ComparisonFeature[] = [
  { feature: "Free to use", pdfforge: true, smallpdf: "Limited", ilovepdf: true, pdf24: true },
  { feature: "No sign-up required", pdfforge: true, smallpdf: false, ilovepdf: true, pdf24: true },
  { feature: "No watermarks", pdfforge: true, smallpdf: false, ilovepdf: true, pdf24: true },
  { feature: "Browser-based processing", pdfforge: true, smallpdf: false, ilovepdf: false, pdf24: false },
  { feature: "Files never uploaded", pdfforge: true, smallpdf: false, ilovepdf: false, pdf24: false },
  { feature: "Merge PDF", pdfforge: true, smallpdf: true, ilovepdf: true, pdf24: true },
  { feature: "Split PDF", pdfforge: true, smallpdf: true, ilovepdf: true, pdf24: true },
  { feature: "Compress PDF", pdfforge: true, smallpdf: true, ilovepdf: true, pdf24: true },
  { feature: "PDF to Word", pdfforge: "Coming soon", smallpdf: true, ilovepdf: true, pdf24: true },
  { feature: "Word to PDF", pdfforge: "Coming soon", smallpdf: true, ilovepdf: true, pdf24: true },
  { feature: "OCR", pdfforge: "Coming soon", smallpdf: true, ilovepdf: true, pdf24: true },
  { feature: "AI features", pdfforge: "Coming soon", smallpdf: true, ilovepdf: false, pdf24: false },
  { feature: "Mobile friendly", pdfforge: true, smallpdf: true, ilovepdf: true, pdf24: true },
  { feature: "API available", pdfforge: true, smallpdf: true, ilovepdf: true, pdf24: true },
  { feature: "Unlimited free usage", pdfforge: true, smallpdf: false, ilovepdf: false, pdf24: true },
];

const COMPARISON_CARDS = [
  {
    name: "PDFForge",
    badge: "Best for Privacy",
    description: "Browser-based processing. Files never leave your device.",
    href: "/tools",
    icon: Shield,
    color: "text-primary",
    pros: ["100% private", "No sign-up", "No watermarks", "Unlimited free"],
    cons: ["Fewer tools (14 functional)", "No OCR yet", "No AI features yet"],
  },
  {
    name: "SmallPDF",
    badge: "Best for Teams",
    description: "Good feature set with collaboration tools. Limited free tier.",
    href: "https://smallpdf.com",
    icon: Zap,
    color: "text-emerald-600",
    pros: ["Many tools", "Team features", "AI features", "Good UX"],
    cons: ["2 tasks/day free", "Requires sign-up", "Files uploaded to servers"],
    external: true,
  },
  {
    name: "iLovePDF",
    badge: "Most Tools",
    description: "Widest selection of PDF tools. Server-side processing.",
    href: "https://ilovepdf.com",
    icon: Globe,
    color: "text-red-600",
    pros: ["Huge tool selection", "OCR included", "Good free tier", "Batch processing"],
    cons: ["Files uploaded", "Ads on free tier", "Daily limits"],
    external: true,
  },
  {
    name: "PDF24",
    badge: "Best Free Tier",
    description: "Unlimited free usage with good features. Server-side processing.",
    href: "https://tools.pdf24.org",
    icon: Lock,
    color: "text-blue-600",
    pros: ["Unlimited free", "Many tools", "Desktop app", "No sign-up"],
    cons: ["Files uploaded", "Dated interface", "Slower processing"],
    external: true,
  },
];

function FeatureIcon({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="h-4 w-4 text-emerald-500" />;
  if (value === false) return <X className="h-4 w-4 text-red-400" />;
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10 max-w-3xl space-y-3">
        <Badge variant="secondary">Comparison</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          PDFForge vs Competitors — 2026 Comparison
        </h1>
        <p className="text-lg text-muted-foreground">
          Compare the best free PDF tools based on features, privacy, speed, and pricing.
          Find the right tool for your needs.
        </p>
      </div>

      {/* Cards */}
      <section className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {COMPARISON_CARDS.map((card) => (
          <Card key={card.name} className="relative overflow-hidden">
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-3">{card.badge}</Badge>
              <div className="mb-3 flex items-center gap-2">
                <card.icon className={`h-5 w-5 ${card.color}`} />
                <h2 className="text-lg font-bold">{card.name}</h2>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{card.description}</p>
              <div className="mb-4 space-y-1">
                {card.pros.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-xs">
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <div className="mb-4 space-y-1">
                {card.cons.map((c) => (
                  <div key={c} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <X className="h-3 w-3 text-red-400" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
              <Link
                href={card.href}
                {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {card.external ? "Visit site" : "Try now"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Feature comparison table */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Feature Comparison</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold">Feature</th>
                <th className="px-4 py-3 text-center font-semibold text-primary">PDFForge</th>
                <th className="px-4 py-3 text-center font-semibold">SmallPDF</th>
                <th className="px-4 py-3 text-center font-semibold">iLovePDF</th>
                <th className="px-4 py-3 text-center font-semibold">PDF24</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{f.feature}</td>
                  <td className="px-4 py-3 text-center"><FeatureIcon value={f.pdfforge} /></td>
                  <td className="px-4 py-3 text-center"><FeatureIcon value={f.smallpdf} /></td>
                  <td className="px-4 py-3 text-center"><FeatureIcon value={f.ilovepdf} /></td>
                  <td className="px-4 py-3 text-center"><FeatureIcon value={f.pdf24} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Privacy section */}
      <section className="mb-16 rounded-xl border bg-primary/5 p-8">
        <div className="flex items-start gap-4">
          <Shield className="h-8 w-8 shrink-0 text-primary" />
          <div>
            <h2 className="text-xl font-bold">Why Privacy Matters</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Most PDF tools upload your files to their servers for processing. This means
              your documents — potentially containing sensitive information — are transmitted
              across the internet and temporarily stored on someone else&apos;s computer.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong className="text-foreground">PDFForge processes everything in your browser.</strong>{" "}
              Your files never leave your device. There&apos;s no upload, no server storage,
              and no third-party access. This isn&apos;t just a privacy policy — it&apos;s
              how the technology works.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-violet-600 p-10 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold tracking-tight">Try PDFForge — 100% Private</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
          All processing happens in your browser. Your files never leave your device.
        </p>
        <Link
          href="/tools"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow hover:bg-white/90"
        >
          Browse all tools
        </Link>
      </div>
    </div>
  );
}
