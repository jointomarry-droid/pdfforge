import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo/metadata";
import { flags } from "@/lib/config/flags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "Admin",
  description: "Platform administration: users, orders, revenue, analytics and job queues.",
  path: "/admin",
  robots: { index: false, follow: false },
});

const ADMIN_SECTIONS = [
  { title: "Dashboard", desc: "Platform-wide KPIs and health.", enabled: true },
  { title: "Users", desc: "Manage accounts and roles.", enabled: true },
  { title: "Orders & Revenue", desc: "MRR, churn and transaction history.", enabled: flags.billing.enabled },
  { title: "Coupons", desc: "Create and track discount codes.", enabled: flags.billing.enabled },
  { title: "File Storage", desc: "Inspect and purge stored objects.", enabled: flags.storage.enabled },
  { title: "API Monitoring", desc: "Rate limits, usage and errors.", enabled: true },
  { title: "Job Queue", desc: "Monitor BullMQ workers and retries.", enabled: flags.queue.enabled },
  { title: "Logs & Errors", desc: "Sentry and structured logs.", enabled: flags.sentry.enabled },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
          <p className="text-sm text-muted-foreground">
            Internal operations console. Requires administrator access.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIN_SECTIONS.map((s) => (
          <Card key={s.title} className={!s.enabled ? "opacity-60" : undefined}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{s.title}</CardTitle>
                <Badge variant={s.enabled ? "secondary" : "outline"}>
                  {s.enabled ? "Live" : "Disabled"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              {!s.enabled && (
                <Link href="/docs" className="mt-2 inline-block text-xs text-primary underline underline-offset-2">
                  Configure in env
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
