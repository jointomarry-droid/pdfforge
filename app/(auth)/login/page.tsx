import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/auth-forms";

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
          Sign in to access your dashboard and conversion history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense>
          <LoginForm />
        </Suspense>
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
