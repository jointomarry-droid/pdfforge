import Link from "next/link";
import {
  ArrowRight,
  FileStack,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { HomeJsonLd } from "@/components/seo/json-ld";
import { getFunctionalTools, tools } from "@/lib/tools/registry";
import { ToolCardLink } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config/site";

export const metadata = buildMetadata({
  title: "Free Online PDF Tools — Merge, Split, Convert & Compress",
  description:
    "Convert, merge, split, compress and edit PDFs for free. PDFForge runs core tools in your browser so your documents never leave your device. No watermarks, no sign-up required.",
  path: "/",
});

const FEATURES = [
  {
    icon: Zap,
    title: "Fast, in your browser",
    text: "Core tools run entirely on your device. Results appear instantly — no waiting for uploads or queues.",
  },
  {
    icon: Lock,
    title: "Private by design",
    text: "Your documents never leave your computer. Nothing is uploaded, stored or shared with third parties.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & safe",
    text: "Files are processed locally and deleted from our systems automatically. Optional AES-256 encryption for business users.",
  },
];

export default function HomePage() {
  const functional = getFunctionalTools();

  return (
    <>
      <HomeJsonLd />
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {tools.length}+ tools · Free forever · No sign-up for core tools
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            All your PDF tools in{" "}
            <span className="text-primary">one place</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {siteConfig.name} converts, merges, splits, compresses and edits PDFs — free and
            without watermarks. Core tools run in your browser, so your files stay private on
            your device.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/tools">
                Start converting free
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Popular tools</h2>
            <p className="text-sm text-muted-foreground">
              Fully functional right now, running in your browser.
            </p>
          </div>
          <Link
            href="/tools"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            View all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {functional.slice(0, 8).map((t) => (
            <ToolCardLink key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why choose {siteConfig.name}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title}>
                <CardContent className="p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mb-2 font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All categories strip */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">A tool for every document task</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Convert to PDF", href: "/tools", hint: "Word, Excel, PPT, images & more" },
            { label: "Convert from PDF", href: "/tools", hint: "JPG, PNG, Word, text & more" },
            { label: "Edit & organize", href: "/tools", hint: "Merge, split, rotate, watermark" },
            { label: "Compress & optimize", href: "/tools", hint: "Smaller files, great quality" },
          ].map((c) => (
            <Link key={c.label} href={c.href} className="group">
              <Card className="h-full transition-all hover:border-primary/50">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary">{c.label}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{c.hint}</p>
                  </div>
                  <FileStack className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-violet-600 p-10 text-center text-primary-foreground sm:p-16">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to get more done with your documents?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
            Join thousands of users converting and editing PDFs every day. Free to start — no
            credit card required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-lg bg-background px-6 py-3 text-sm font-semibold text-primary shadow hover:bg-background/90"
            >
              Get started free
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-primary-foreground/40 px-6 py-3 text-sm font-medium hover:bg-white/10"
            >
              Explore pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
