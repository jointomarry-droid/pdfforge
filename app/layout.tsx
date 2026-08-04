import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { siteConfig } from "@/lib/config/site";
import { absoluteUrl } from "@/lib/seo/metadata";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/components/marketing/theme-toggle";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { BackToTop } from "@/components/marketing/back-to-top";
import { KeyboardShortcuts } from "@/components/tools/keyboard-shortcuts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Free Online PDF Tools`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Free Online PDF Tools`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    images: [{ url: absoluteUrl(siteConfig.ogImage), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    title: `${siteConfig.name} — Free Online PDF Tools`,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: siteConfig.googleSiteVerification
    ? { google: siteConfig.googleSiteVerification }
    : undefined,
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeProvider>
          <OrganizationJsonLd />
          {children}
          <Toaster position="bottom-right" richColors closeButton />
          <CookieConsent />
          <BackToTop />
          <KeyboardShortcuts />
        </ThemeProvider>
      </body>
    </html>
  );
}
