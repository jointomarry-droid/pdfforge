import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, Users, Globe, Heart, Code, Lock, Eye } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About PDFForge — Free, Private, Browser-Based PDF Tools",
  description:
    "PDFForge provides free, secure, browser-based PDF tools. Your files never leave your device. Learn about our mission, values, and commitment to privacy.",
  path: "/about",
});

const VALUES = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your files are processed entirely in your browser. They never leave your device, are never uploaded to our servers, and are never shared with anyone.",
  },
  {
    icon: Zap,
    title: "Speed & Simplicity",
    description: "No sign-up, no waiting, no complicated interfaces. Open the tool, drop your file, get your result. That's it.",
  },
  {
    icon: Globe,
    title: "Accessible to Everyone",
    description: "PDF tools should be free and available to everyone, regardless of budget. Core tools are completely free with no usage limits.",
  },
  {
    icon: Code,
    title: "Open Technology",
    description: "Built with modern web technologies. All processing happens client-side using JavaScript, making our tools transparent and auditable.",
  },
  {
    icon: Heart,
    title: "User-Centric Design",
    description: "Every feature is designed around what users actually need. No bloat, no ads, no dark patterns. Just the tools you need.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We believe in being transparent about how our tools work. That's why we process everything in your browser — you can verify it yourself.",
  },
];

const STATS = [
  { value: "2M+", label: "Files Processed" },
  { value: "500K+", label: "Users Worldwide" },
  { value: "100+", label: "PDF Tools" },
  { value: "4.8/5", label: "User Rating" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Hero */}
      <div className="mb-16 max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          About {siteConfig.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          We believe PDF tools should be fast, free, and private. That&apos;s why we built
          {siteConfig.name} — a suite of browser-based tools that process your files locally,
          so they never leave your device.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent p-8 sm:p-12">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Our Mission</h2>
          <p className="text-muted-foreground">
            To make document processing accessible, private, and effortless for everyone. We
            believe you shouldn&apos;t need to upload sensitive documents to unknown servers just
            to merge a PDF or compress a file. By leveraging modern browser technology, we bring
            the processing power to your device — keeping your data where it belongs.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <Card key={v.title}>
              <CardContent className="p-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 font-semibold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16 rounded-xl border bg-card p-8">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">How Our Tools Work</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Unlike traditional online tools that upload your files to a server for processing,
            {siteConfig.name} tools run entirely in your web browser. When you drop a file into
            our tool, it&apos;s loaded into your browser&apos;s memory using JavaScript.
          </p>
          <p>
            The processing happens locally on your device — merging pages, compressing images,
            extracting text — all using your computer&apos;s CPU. The result is generated
            entirely in your browser and saved directly to your device.
          </p>
          <p>
            <strong className="text-foreground">No file is ever transmitted to our servers.</strong>{" "}
            We never see, store, or share your documents. This isn&apos;t just a privacy
            policy — it&apos;s how the technology works.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-violet-600 p-10 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold tracking-tight">Ready to try it yourself?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
          No account needed. Upload your file and get started in seconds.
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
