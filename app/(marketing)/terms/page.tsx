import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing your use of PDFForge.",
  path: "/terms",
});

const SECTIONS = [
  {
    title: "Acceptance",
    body: "By creating an account or using any PDFForge tool, you agree to these terms. If you are using the service on behalf of an organization, you represent that you have authority to bind it.",
  },
  {
    title: "Use of the service",
    body: "You may use the service to convert, edit and process documents that you own or have permission to process. You may not upload content that is illegal, infringes third-party rights, or contains malware.",
  },
  {
    title: "Plans & billing",
    body: "Free plans include usage limits described on the pricing page. Paid plans are billed in advance and renew automatically until canceled. Refunds are available within 14 days of a first purchase.",
  },
  {
    title: "Intellectual property",
    body: "You retain all rights to your documents. We claim no ownership over content you process. Our software, branding and site content are our property.",
  },
  {
    title: "Liability",
    body: "The service is provided 'as is'. To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from use of the service.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Terms of Service</h1>
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
