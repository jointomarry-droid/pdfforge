import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Download,
  FolderHeart,
  KeyRound,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { flags } from "@/lib/config/flags";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "Dashboard",
  description: "Manage your conversions, favorites, storage and subscription.",
  path: "/dashboard",
});

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, active: true },
  { label: "Conversions", href: "/dashboard/conversions", icon: Clock },
  { label: "Downloads", href: "/dashboard/downloads", icon: Download },
  { label: "Favorites", href: "/dashboard/favorites", icon: FolderHeart },
  { label: "API Keys", href: "/dashboard/api-keys", icon: KeyRound },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Team", href: "/dashboard/team", icon: Users },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-56 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">
                {flags.auth.enabled
                  ? "Signed in and ready to convert."
                  : "Authentication is not configured yet. Set AUTH_SECRET in your environment to enable it."}
              </p>
            </div>
            <Button asChild>
              <Link href="/tools">New conversion</Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Plan</CardDescription>
                <CardTitle className="text-2xl">Free</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                5 conversions / day
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Conversions today</CardDescription>
                <CardTitle className="text-2xl">0 / 5</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Resets at midnight
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Storage used</CardDescription>
                <CardTitle className="text-2xl">0 MB</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Files auto-delete after 1 hour
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Saved documents</CardDescription>
                <CardTitle className="text-2xl">0</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Favorites & history
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent conversions</CardTitle>
                  <CardDescription>Your conversion history will appear here.</CardDescription>
                </div>
                {flags.billing.enabled ? (
                  <Badge>Pro</Badge>
                ) : (
                  <Badge variant="secondary">Billing not configured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-12 text-center">
                <p className="text-sm font-medium">No conversions yet</p>
                <p className="max-w-sm text-xs text-muted-foreground">
                  Start with a free tool like Merge PDF or Compress PDF and your history will show
                  up here once storage and auth are configured.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link href="/tools">Browse tools</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
