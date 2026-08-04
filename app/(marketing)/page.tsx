import Link from "next/link";
import {
  ArrowRight,
  FileStack,
  Lock,
  ShieldCheck,
  Zap,
  Globe,
  CreditCard,
  Sparkles,
  Star,
  Users,
  FileCheck,
} from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { HomeJsonLd } from "@/components/seo/json-ld";
import { getFunctionalTools, tools, categoryMeta } from "@/lib/tools/registry";
import { ToolCardLink } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/config/site";
import { Testimonials } from "@/components/marketing/testimonials";
import { RecentFiles } from "@/components/tools/recent-files";

export const metadata = buildMetadata({
  title: "Free Online PDF Tools — Merge, Split, Convert & Compress",
  description:
    "Convert, merge, split, compress and edit PDFs for free. PDFForge runs core tools in your browser so your documents never leave your device. No watermarks, no sign-up required.",
  path: "/",
});

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    text: "Core tools run entirely on your device. Results appear instantly — no waiting for uploads or queues.",
  },
  {
    icon: Lock,
    title: "Private by Design",
    text: "Your documents never leave your computer. Nothing is uploaded, stored or shared with third parties.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Level Security",
    text: "Files are processed locally and deleted automatically. Optional AES-256 encryption for business users.",
  },
  {
    icon: CreditCard,
    title: "100% Free",
    text: "No hidden fees, no watermarks, no trial limits. Core tools are completely free forever.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    text: "Use on any device — desktop, tablet or phone. No software to install, works in any browser.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Tools",
    text: "Summarize, translate and chat with your documents using cutting-edge AI technology.",
  },
];

const STATS = [
  { value: "2M+", label: "Files Processed", icon: FileCheck },
  { value: "500K+", label: "Happy Users", icon: Users },
  { value: "100+", label: "PDF Tools", icon: FileStack },
  { value: "4.8", label: "User Rating", icon: Star },
];

const CATEGORIES = [
  {
    label: "Convert to PDF",
    href: "/tools",
    hint: "Word, Excel, PPT, images & more",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    label: "Convert from PDF",
    href: "/tools",
    hint: "JPG, PNG, Word, text & more",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    label: "Edit & Organize",
    href: "/tools",
    hint: "Merge, split, rotate, watermark",
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    label: "Compress & Optimize",
    href: "/tools",
    hint: "Smaller files, great quality",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "OCR & AI",
    href: "/tools",
    hint: "Scan, recognize text, AI features",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    label: "Security & Signing",
    href: "/tools",
    hint: "Protect, encrypt, sign documents",
    color: "bg-red-500/10 text-red-600",
  },
];

export default function HomePage() {
  const functional = getFunctionalTools();

  return (
    <>
      <HomeJsonLd />
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-accent/60 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,primary/5,transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {tools.length}+ tools · Free forever · No sign-up required
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            All your PDF tools in{" "}
            <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
              one place
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {siteConfig.name} converts, merges, splits, compresses and edits PDFs — free and
            without watermarks. Core tools run in your browser, so your files stay private on
            your device.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="shadow-lg">
              <Link href="/tools">
                Start converting free
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> No login required</span>
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Instant processing</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Files never uploaded</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-1">
            <Badge variant="secondary" className="mb-2">Popular</Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Most used tools</h2>
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
        <div className="mt-6 text-center sm:hidden">
          <Link href="/tools" className="text-sm font-medium text-primary hover:underline">
            View all {tools.length}+ tools →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-2">Categories</Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">A tool for every document task</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link key={c.label} href={c.href} className="group">
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.color}`}>
                      <FileStack className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary">{c.label}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{c.hint}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-2">Why Us</Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why choose {siteConfig.name}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Built for privacy, speed, and ease of use. No compromises.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How it works</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Upload your file", desc: "Drag and drop or click to select. Supports PDF, DOCX, images, and more." },
              { step: "2", title: "Choose your options", desc: "Select compression level, page range, output format — whatever you need." },
              { step: "3", title: "Download instantly", desc: "Your processed file is ready in seconds. Download or share with one click." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {s.step}
                </div>
                <h3 className="mb-2 font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent files */}
      <RecentFiles />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
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
