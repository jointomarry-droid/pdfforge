import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Scale, Briefcase, Users, Shield, FileText, Lock } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { getFunctionalTools } from "@/lib/tools/registry";
import { ToolCardLink } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "Best Free PDF Tools for Healthcare — Medical Document Management",
  description:
    "Free PDF tools for healthcare professionals: organize patient records, extract data from medical forms, compress reports. HIPAA-friendly with client-side processing.",
  path: "/use-cases/healthcare",
});

const USE_CASES = [
  { icon: GraduationCap, title: "Students", href: "/use-cases/students" },
  { icon: Scale, title: "Lawyers", href: "/use-cases/lawyers" },
  { icon: Briefcase, title: "Business", href: "/use-cases/business" },
  { icon: Users, title: "Healthcare", href: "/use-cases/healthcare" },
];

export default function HealthcarePage() {
  const tools = getFunctionalTools();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-12 max-w-3xl space-y-4">
        <Badge variant="secondary">For Healthcare</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Best free PDF tools for healthcare
        </h1>
        <p className="text-lg text-muted-foreground">
          Organize patient records, extract data from medical forms, compress reports for
          sharing, and protect sensitive information — all with client-side processing that
          keeps patient data private.
        </p>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map((uc) => (
          <Link key={uc.href} href={uc.href} className="group">
            <Card className={`h-full transition-all ${uc.href === "/use-cases/healthcare" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}>
              <CardContent className="flex items-center gap-3 p-4">
                <uc.icon className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">{uc.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Privacy callout */}
      <section className="mb-16 rounded-xl border bg-primary/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Patient privacy first</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              All PDFForge tools run directly in your browser. Patient files are never uploaded
              to any server, never stored, and never shared. This makes PDFForge ideal for
              handling sensitive medical documents where privacy is paramount.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Top tools for healthcare</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["merge-pdf", "split-pdf", "compress-pdf", "pdf-to-text", "protect-pdf", "page-numbers"]
            .map((slug) => tools.find((t) => t.slug === slug))
            .filter(Boolean)
            .map((t) => t && <ToolCardLink key={t.slug} tool={t} />)}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Healthcare document tips</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Organize patient records", desc: "Merge multiple patient documents — intake forms, lab results, notes — into a single organized PDF." },
            { title: "Extract text from forms", desc: "Use PDF to Text to pull data from scanned intake forms and medical questionnaires." },
            { title: "Compress for secure sharing", desc: "Shrink large medical reports so they can be shared securely via encrypted email." },
            { title: "Add page numbers for reference", desc: "Number pages in multi-page reports so colleagues can reference specific sections." },
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
        <h2 className="text-2xl font-bold tracking-tight">Handle medical documents with confidence</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
          Client-side processing means patient data never leaves your device.
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
