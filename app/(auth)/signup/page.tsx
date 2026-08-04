import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupForm } from "@/components/auth/auth-forms";

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
          Start converting documents in seconds. No credit card required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
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
