import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with the PDFForge team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-10 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Contact us</h1>
        <p className="text-muted-foreground">
          Questions about plans, enterprise deployments or anything else? We respond within one
          business day.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enterprise & sales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <a href="mailto:sales@example.com" className="text-primary underline underline-offset-2">
              sales@example.com
            </a>{" "}
            — dedicated infrastructure, on-premises, custom SLAs
          </p>
          <p>
            <a href="mailto:support@example.com" className="text-primary underline underline-offset-2">
              support@example.com
            </a>{" "}
            — account and billing help
          </p>
          <p>We do not require a phone number — email is fastest.</p>
        </CardContent>
      </Card>
    </div>
  );
}
