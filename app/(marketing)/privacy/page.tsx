import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How PDFForge handles your data and documents.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "Your documents",
    body: "Core PDF tools run entirely in your browser. Files are read locally, processed on your device and are never uploaded to our servers. Server-side features (office conversion, OCR, AI) process files in memory, store them temporarily for a maximum of one hour, and then permanently delete them.",
  },
  {
    title: "What we collect",
    body: "We collect only what is needed to operate the service: account details, usage metrics (anonymous), and — when you opt in — analytics events. We never sell personal data.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies for authentication and security, plus optional analytics cookies (Google Analytics 4 / PostHog) which you can disable.",
  },
  {
    title: "Security",
    body: "Transfers are encrypted with TLS. At-rest encryption uses AES-256. Business plans add audit logging, SSO and configurable data residency.",
  },
  {
    title: "Contact",
    body: "Questions about this policy? Email privacy@example.com and we will respond within 30 days.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <div className="space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="mb-2 text-lg font-semibold">{s.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
