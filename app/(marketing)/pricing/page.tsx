import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { plans } from "@/lib/config/plans";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Simple pricing for every team. Start free, upgrade to Pro for unlimited conversions, OCR and AI tools, or scale with Business and Enterprise.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, transparent pricing</h1>
        <p className="text-muted-foreground">
          Start free and upgrade when you need more. Every paid plan includes unlimited
          conversions and no watermarks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "relative flex flex-col",
              plan.highlight && "border-primary shadow-lg ring-1 ring-primary/40",
            )}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most popular
              </span>
            )}
            <CardHeader>
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="text-sm text-muted-foreground">{plan.tagline}</p>
              <div className="pt-2">
                {plan.monthlyPrice >= 0 ? (
                  <p className="text-3xl font-bold">
                    ${plan.monthlyPrice}
                    <span className="text-sm font-normal text-muted-foreground">/mo</span>
                  </p>
                ) : (
                  <p className="text-3xl font-bold">Custom</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">{plan.priceNote}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2.5">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        f.included ? "text-primary" : "text-muted-foreground/40",
                      )}
                    />
                    <span className={cn(!f.included && "text-muted-foreground/60 line-through")}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={plan.highlight ? "default" : "outline"}>
                <Link href={plan.id === "enterprise" ? "/contact" : "/signup"}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Prices in USD. Yearly plans billed annually at a discount. Enterprise on-premises and
        white-label options available on request.
      </p>
    </div>
  );
}
