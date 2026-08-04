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
  title: "Best Free PDF Tools for Business — Document Workflow",
  description:
    "Free PDF tools for business: compress reports for email, batch convert invoices, merge contracts, protect confidential files. Professional results, no cost.",
  path: "/use-cases/business",
});

const USE_CASES = [
  { icon: GraduationCap, title: "Students", href: "/use-cases/students" },
  { icon: Scale, title: "Lawyers", href: "/use-cases/lawyers" },
  { icon: Briefcase, title: "Business", href: "/use-cases/business" },
  { icon: Users, title: "Healthcare", href: "/use-cases/healthcare" },
];

export default function BusinessPage() {
  const tools = getFunctionalTools();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-12 max-w-3xl space-y-4">
        <Badge variant="secondary">For Business</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Best free PDF tools for business
        </h1>
        <p className="text-lg text-muted-foreground">
          Streamline your document workflow. Compress reports for email, batch process
          invoices, merge contracts, and protect confidential files — all free with no
          watermarks.
        </p>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map((uc) => (
          <Link key={uc.href} href={uc.href} className="group">
            <Card className={`h-full transition-all ${uc.href === "/use-cases/business" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}>
              <CardContent className="flex items-center gap-3 p-4">
                <uc.icon className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">{uc.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Top tools for business</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["merge-pdf", "compress-pdf", "protect-pdf", "watermark-pdf", "pdf-to-excel", "split-pdf"]
            .map((slug) => tools.find((t) => t.slug === slug))
            .filter(Boolean)
            .map((t) => t && <ToolCardLink key={t.slug} tool={t} />)}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Business document tips</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Compress for email", desc: "Shrink large PDF reports and presentations so they fit email attachment limits." },
            { title: "Brand your documents", desc: "Add company watermarks and page numbers to professional documents." },
            { title: "Protect sensitive data", desc: "Encrypt contracts and financial reports before sharing externally." },
            { title: "Extract data for analysis", desc: "Convert PDF tables to Excel for financial analysis and reporting." },
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
        <h2 className="text-2xl font-bold tracking-tight">Upgrade your document workflow</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
          Free for individual use. Pro plans available for teams and batch processing.
        </p>
        <Button asChild size="lg" className="mt-6 bg-white text-primary hover:bg-white/90">
          <Link href="/pricing">
            See pricing
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
