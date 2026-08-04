import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Scale, Briefcase, FileText, Users, Building2 } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { getFunctionalTools } from "@/lib/tools/registry";
import { ToolCardLink } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "Best Free PDF Tools for Students — Study Smarter",
  description:
    "Free PDF tools for students: merge lecture notes, convert papers to PDF, extract text from textbooks, compress files for submission. No signup, no watermarks.",
  path: "/use-cases/students",
});

const USE_CASES = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Merge lecture notes, convert essays to PDF, extract text from textbooks",
    href: "/use-cases/students",
  },
  {
    icon: Scale,
    title: "Lawyers",
    description: "Redact sensitive info, sign contracts, organize case files",
    href: "/use-cases/lawyers",
  },
  {
    icon: Briefcase,
    title: "Business",
    description: "Compress reports, batch convert invoices, protect confidential documents",
    href: "/use-cases/business",
  },
  {
    icon: Users,
    title: "Healthcare",
    description: "Organize patient records, extract data from medical forms",
    href: "/use-cases/healthcare",
  },
];

export default function StudentsPage() {
  const tools = getFunctionalTools();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Hero */}
      <div className="mb-12 max-w-3xl space-y-4">
        <Badge variant="secondary">For Students</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Best free PDF tools for students
        </h1>
        <p className="text-lg text-muted-foreground">
          Whether you&apos;re writing a thesis, organizing lecture notes, or preparing
          assignments, PDFForge has the free tools you need. No signup required, no
          watermarks, runs in your browser.
        </p>
      </div>

      {/* Use case links */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map((uc) => (
          <Link key={uc.href} href={uc.href} className="group">
            <Card className={`h-full transition-all ${uc.href === "/use-cases/students" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}>
              <CardContent className="flex items-center gap-3 p-4">
                <uc.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold">{uc.title}</p>
                  <p className="text-xs text-muted-foreground">{uc.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Top tools for students */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Top tools for students</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["merge-pdf", "split-pdf", "pdf-to-text", "compress-pdf", "text-to-pdf", "images-to-pdf"]
            .map((slug) => tools.find((t) => t.slug === slug))
            .filter(Boolean)
            .map((t) => t && <ToolCardLink key={t.slug} tool={t} />)}
        </div>
      </section>

      {/* Tips */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Student PDF tips</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Combine lecture notes", desc: "Merge multiple PDF notes into one file for easy reference during exams." },
            { title: "Convert to PDF for submission", desc: "Turn Word docs, Google Docs exports, or images into clean PDFs for assignment submission." },
            { title: "Extract text from textbooks", desc: "Use PDF to Text to pull quotes and passages from digital textbooks for your essays." },
            { title: "Compress for email", desc: "Shrink large PDF files so you can email them to professors or classmates." },
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

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-violet-600 p-10 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold tracking-tight">Start using free PDF tools today</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
          No account needed. Upload your file and get started in seconds.
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
