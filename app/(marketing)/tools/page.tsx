import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo/metadata";
import { tools, categoryMeta } from "@/lib/tools/registry";
import { ToolCardLink } from "@/components/tools/tool-card";

export const metadata: Metadata = buildMetadata({
  title: "All PDF Tools",
  description:
    "Every free PDF tool you need in one place — convert, merge, split, compress, edit, OCR and more. No watermarks, no sign-up, files never leave your browser.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10 max-w-2xl space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All PDF tools</h1>
        <p className="text-muted-foreground">
          {tools.length} tools to convert, edit, compress and understand your documents. Core
          tools run entirely in your browser — your files never leave your device.
        </p>
      </div>

      <div className="space-y-14">
        {Object.entries(categoryMeta).map(([cat, meta]) => {
          const toolsInCat = tools.filter((t) => t.category === cat);
          if (toolsInCat.length === 0) return null;
          return (
            <section key={cat} className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{meta.label}</h2>
                <p className="text-sm text-muted-foreground">{meta.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {toolsInCat.map((t) => (
                  <ToolCardLink key={t.slug} tool={t} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent p-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Need a full document workflow?</h2>
        <p className="max-w-lg text-sm text-muted-foreground">
          Sign up free to track conversions, save favorites and unlock batch processing. Upgrade
          to Pro for OCR, AI tools and no watermarks.
        </p>
        <div className="flex gap-3">
          <Link
            href="/pricing"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            See pricing
          </Link>
          <Link
            href="/signup"
            className="rounded-lg border bg-background px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-accent"
          >
            Get started free
          </Link>
        </div>
      </div>
    </div>
  );
}
