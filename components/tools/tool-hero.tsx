import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { ToolDefinition } from "@/types/tool";
import { ToolGlyph } from "@/components/tools/tool-icon";
import { Badge } from "@/components/ui/badge";
import { categoryMeta } from "@/lib/tools/registry";

export function ToolBreadcrumbs({ tool }: { tool: ToolDefinition }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        <li>
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <Link href="/tools" className="transition-colors hover:text-foreground">
            Tools
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li className="font-medium text-foreground">{tool.name}</li>
      </ol>
    </nav>
  );
}

export function ToolHero({ tool }: { tool: ToolDefinition }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ToolGlyph tool={tool} className="h-6 w-6" />
        </span>
        <Badge variant="secondary">{categoryMeta[tool.category].label}</Badge>
        {tool.clientSide && <Badge>Runs in your browser</Badge>}
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{tool.name}</h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{tool.tagline}</p>
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {tool.longDescription}
      </p>
    </div>
  );
}

export function HowItWorks({ steps }: { steps: string[] }) {
  const defaultSteps = ["Upload or drop your file", "Adjust the options to your needs", "Download the result instantly"];
  const list = steps.length > 0 ? steps : defaultSteps;
  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="mb-5 text-lg font-semibold">How it works</h2>
      <ol className="grid gap-5 sm:grid-cols-3">
        {list.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {i + 1}
            </span>
            <span className="pt-1 text-sm leading-relaxed text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
