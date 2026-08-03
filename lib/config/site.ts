export const siteConfig = {
  name: "PDFForge",
  nameShort: "PDFForge",
  legalName: "PDFForge Inc.",
  description:
    "Fast, secure, browser-based PDF tools: convert, merge, split, compress, edit and OCR documents — free with no watermarks.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pdfforge.example.com",
  ogImage: "/og.svg",
  twitterHandle: "@pdfforge",
  keywords: [
    "pdf tools",
    "merge pdf",
    "split pdf",
    "compress pdf",
    "pdf to word",
    "word to pdf",
    "pdf converter",
    "ocr pdf",
  ],
  nav: {
    tools: { label: "Tools", href: "/tools" },
    pricing: { label: "Pricing", href: "/pricing" },
    docs: { label: "Docs", href: "/docs" },
    dashboard: { label: "Dashboard", href: "/dashboard" },
    admin: { label: "Admin", href: "/admin" },
  },
} as const;

export type SiteConfig = typeof siteConfig;
