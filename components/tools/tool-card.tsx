import Link from "next/link";

import type { ToolDefinition } from "@/types/tool";
import { ToolGlyph } from "@/components/tools/tool-icon";
import { Card, CardContent } from "@/components/ui/card";

export function ToolCardLink({ tool }: { tool: ToolDefinition }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group h-full">
      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
        <CardContent className="flex flex-col gap-3 p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <ToolGlyph tool={tool} className="h-5 w-5" />
          </span>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold group-hover:text-primary">{tool.name}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
