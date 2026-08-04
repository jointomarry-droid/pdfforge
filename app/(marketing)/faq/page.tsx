import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions — PDFForge Help Center",
  description:
    "Get answers to common questions about PDFForge: privacy, pricing, supported formats, file limits, and how our browser-based PDF tools work.",
  path: "/faq",
});

const FAQ_CATEGORIES = [
  {
    title: "General",
    items: [
      {
        q: "What is PDFForge?",
        a: "PDFForge is a collection of free, browser-based PDF tools. You can merge, split, compress, convert, and edit PDF files directly in your browser without uploading anything to a server.",
      },
      {
        q: "Is PDFForge really free?",
        a: "Yes. Core PDF tools are completely free with no watermarks, no trial limits, and no credit card required. Pro plans are available for advanced features like OCR and AI tools.",
      },
      {
        q: "Do I need to create an account?",
        a: "No. You can use all core tools without creating an account. Sign up is optional and unlocks features like conversion history, favorites, and batch processing.",
      },
      {
        q: "What browsers are supported?",
        a: "PDFForge works in all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.",
      },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      {
        q: "Are my files uploaded to your servers?",
        a: "No. All processing happens entirely in your browser. Your files are loaded into your browser's memory, processed locally, and saved directly to your device. No files are ever transmitted to our servers.",
      },
      {
        q: "Do you store my documents?",
        a: "No. We never store, cache, or retain your documents. Since files are processed locally in your browser, we never have access to them.",
      },
      {
        q: "Is my data safe?",
        a: "Yes. Since your files never leave your device, there's no risk of interception, unauthorized access, or data breaches on our end. Your documents stay on your computer.",
      },
      {
        q: "Can you see my files?",
        a: "No. We have no technical ability to access your files. All processing occurs in your browser, which is software running on your device.",
      },
    ],
  },
  {
    title: "File Formats",
    items: [
      {
        q: "What file formats are supported?",
        a: "We support PDF, DOCX, DOC, XLSX, XLS, PPTX, PPT, JPG, PNG, WebP, TIFF, TXT, Markdown, HTML, CSV, XML, JSON, and more. Each tool specifies which formats it accepts.",
      },
      {
        q: "Is there a file size limit?",
        a: "Free tools accept files up to 100MB. Pro users can process files up to 500MB. The exact limit depends on the tool and your plan.",
      },
      {
        q: "Can I process multiple files at once?",
        a: "Yes. Most tools support multiple file uploads. Merge PDF accepts up to 20 files. Images to PDF accepts up to 50 images. Check each tool's specifications for limits.",
      },
    ],
  },
  {
    title: "Tools & Features",
    items: [
      {
        q: "Which tools are available right now?",
        a: "We have 14 fully functional tools including Merge PDF, Split PDF, Compress PDF, Rotate PDF, PDF to JPG, PDF to PNG, PDF to Text, Images to PDF, Watermark PDF, Page Numbers, Delete Pages, Image Converter, Text to PDF, and Markdown to PDF.",
      },
      {
        q: "When will new tools be released?",
        a: "We're constantly adding new tools. Word to PDF, Excel to PDF, PDF to Word, OCR, and AI-powered tools are on our roadmap. Use the 'Notify Me' feature on any coming-soon tool to get alerted when it launches.",
      },
      {
        q: "Can I use PDFForge on my phone?",
        a: "Yes. All PDFForge tools are mobile-friendly and work on any device with a modern browser — phones, tablets, and desktops.",
      },
      {
        q: "Do you have an API?",
        a: "Yes. Our API is available for developers who want to integrate PDF processing into their applications. Check our documentation for details.",
      },
    ],
  },
  {
    title: "Pricing",
    items: [
      {
        q: "What's included in the free plan?",
        a: "The free plan includes access to all core tools with a daily usage limit. No watermarks, no sign-up required. Perfect for occasional use.",
      },
      {
        q: "What do I get with Pro?",
        a: "Pro plans remove daily limits and unlock advanced features like OCR, AI tools, batch processing, priority support, and larger file size limits.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. There are no contracts or commitments. Cancel your subscription anytime from your dashboard.",
      },
      {
        q: "Do you offer team plans?",
        a: "Yes. Business and Enterprise plans include team features, shared workspaces, admin controls, and volume discounts.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-10 max-w-2xl space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground">
          Get answers to common questions about PDFForge, privacy, pricing, and our tools.
        </p>
      </div>

      <div className="space-y-10">
        {FAQ_CATEGORIES.map((category) => (
          <section key={category.title}>
            <h2 className="mb-4 text-xl font-semibold">{category.title}</h2>
            <Accordion type="single" collapsible className="w-full rounded-xl border bg-card px-6">
              {category.items.map((item, i) => (
                <AccordionItem key={i} value={`${category.title}-${i}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent p-8 text-center">
        <h2 className="text-xl font-bold tracking-tight">Still have questions?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Can&apos;t find what you&apos;re looking for? Reach out to our support team.
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Contact us
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-accent"
          >
            Try our tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
