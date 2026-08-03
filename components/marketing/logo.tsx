import Link from "next/link";
import { FileStack } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <FileStack className="h-5 w-5" />
      </span>
      <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}
