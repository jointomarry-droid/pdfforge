import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Scale, Briefcase, Users } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { getFunctionalTools } from "@/lib/tools/registry";
import { ToolCardLink } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "Best Free PDF Tools for Lawyers — Legal Document Management",
  description:
    "Free PDF tools for lawyers: redact sensitive information, sign contracts digitally, merge case files, protect confidential documents. Secure and private.",
  path: "/use-cases/lawyers",
});

const USE_CASES = [
  { icon: GraduationCap, title: "Students", href: "/use-cases/students" },
  { icon: Scale, title: "Lawyers", href: "/use-cases/lawyers" },
  { icon: Briefcase, title: "Business", href: "/use-cases/business" },
  { icon: Users, title: "Healthcare", href: "/use-cases/healthcare" },
];

export default function LawyersPage() {
  const tools = getFunctionalTools();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-12 max-w-3xl space-y-4">
        <Badge variant="secondary">For Legal Professionals</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Best free PDF tools for lawyers
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage legal documents with confidence. Redact sensitive information, digitally
          sign contracts, merge case files, and protect confidential documents — all free,
          all private.
        </p>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map((uc) => (
          <Link key={uc.href} href={uc.href} className="group">
            <Card className={`h-full transition-all ${uc.href === "/use-cases/lawyers" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}>
              <CardContent className="flex items-center gap-3 p-4">
                <uc.icon className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">{uc.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Top tools for legal work</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["merge-pdf", "split-pdf", "protect-pdf", "watermark-pdf", "page-numbers", "pdf-to-text"]
            .map((slug) => tools.find((t) => t.slug === slug))
            .filter(Boolean)
            .map((t) => t && <ToolCardLink key={t.slug} tool={t} />)}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Legal document tips</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Protect confidential documents", desc: "Add password protection to sensitive legal documents before sharing with clients." },
            { title: "Merge case files", desc: "Combine depositions, evidence, and filings into a single organized PDF." },
            { title: "Add page numbers for references", desc: "Professional page numbering makes it easy to reference specific pages in court." },
            { title: "Extract text for analysis", desc: "Convert PDFs to text for search, analysis, and document review." },
          ].map((tip) => (
            <Card key={tip.title}>
              <CardContent className="p-5">
                <h3 className="font-semibold">{tip.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tip.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="rounded-2xl bg-gradient-to-br from-primary to-violet-600 p-10 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold tracking-tight">Manage documents with confidence</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
          Your files never leave your browser. Private, secure, and free.
        </p>
        <Button asChild size="lg" className="mt-6 bg-white text-primary hover:bg-white/90">
          <Link href="/tools">
            Browse all tools
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
