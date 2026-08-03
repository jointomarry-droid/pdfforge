import { Loader2 } from "lucide-react";

export default function ToolLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm">Loading tool…</span>
      </div>
    </div>
  );
}
