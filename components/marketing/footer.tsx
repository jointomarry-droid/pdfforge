import Link from "next/link";

import { siteConfig } from "@/lib/config/site";
import { tools, categoryMeta } from "@/lib/tools/registry";
import { Logo } from "@/components/marketing/logo";
import type { ToolCategory } from "@/types/tool";

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/docs", label: "Documentation" },
  { href: "/api", label: "API" },
];

const USE_CASE_LINKS = [
  { href: "/use-cases/students", label: "For Students" },
  { href: "/use-cases/lawyers", label: "For Lawyers" },
  { href: "/use-cases/business", label: "For Business" },
  { href: "/use-cases/healthcare", label: "For Healthcare" },
];

const CATEGORIES_FOR_FOOTER: ToolCategory[] = [
  "convert-to-pdf",
  "convert-from-pdf",
  "edit",
  "compress",
  "ocr",
  "ai",
  "image",
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">{siteConfig.description}</p>
          </div>

          {CATEGORIES_FOR_FOOTER.slice(0, 3).map((cat) => {
            const toolsInCat = tools.filter((t) => t.category === cat).slice(0, 6);
            return (
              <div key={cat}>
                <h3 className="mb-3 text-sm font-semibold">{categoryMeta[cat].label}</h3>
                <ul className="space-y-2">
                  {toolsInCat.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/tools/${t.slug}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 border-t pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold">Use Cases</h3>
            <ul className="space-y-2">
              {USE_CASE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  API
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
            {COMPANY_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ))}
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
