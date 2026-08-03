import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo/metadata";
import { flags } from "@/lib/config/flags";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to your account.",
  path: "/login",
  robots: { index: false, follow: false },
});

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          {flags.auth.enabled
            ? "Sign in to access your dashboard."
            : "Authentication is not configured. Set AUTH_SECRET to enable sign-in."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <Button className="w-full" disabled={!flags.auth.enabled}>
            Sign in
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          No account yet?{" "}
          <Link href="/signup" className="text-primary underline underline-offset-2">
            Sign up free
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
