import Link from "next/link";

import type { ToolDefinition } from "@/types/tool";
import { ToolGlyph } from "@/components/tools/tool-icon";
import { Card, CardContent } from "@/components/ui/card";
import { getRelatedTools } from "@/lib/tools/registry";

export function RelatedTools({ tool }: { tool: ToolDefinition }) {
  const related = getRelatedTools(tool);
  if (related.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Related tools</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((t) => {
          return (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="group">
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardContent className="flex items-start gap-3 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ToolGlyph tool={t} className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold group-hover:text-primary">{t.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
