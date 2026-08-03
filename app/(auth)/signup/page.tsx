import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo/metadata";
import { flags } from "@/lib/config/flags";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = buildMetadata({
  title: "Sign up",
  description: "Create your free account.",
  path: "/signup",
  robots: { index: false, follow: false },
});

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your free account</CardTitle>
        <CardDescription>
          {flags.auth.enabled
            ? "Start converting documents in seconds."
            : "Authentication is not configured. Set AUTH_SECRET to enable sign-up."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Ada Lovelace" autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" autoComplete="new-password" />
          </div>
          <Button className="w-full" disabled={!flags.auth.enabled}>
            Create account
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
