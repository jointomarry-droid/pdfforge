"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Graduate Student",
    text: "PDFForge saved me hours during thesis writing. Merging hundreds of research papers into one document took seconds. The fact that my files never leave my browser is a huge plus.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Small Business Owner",
    text: "I use PDFForge daily to compress invoices and contracts before emailing clients. Fast, free, and no watermarks. It's replaced all the paid tools I was using.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Legal Assistant",
    text: "The privacy-first approach sold me. Handling sensitive legal documents through browser-based processing means I never have to worry about data breaches.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Freelance Designer",
    text: "I convert client mockups to PDF daily. The Images to PDF tool is incredibly fast and preserves quality perfectly. No more installing desktop software.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Healthcare Administrator",
    text: "We use PDFForge for organizing patient records. The browser-based processing gives us peace of mind about HIPAA compliance since files never leave our devices.",
    rating: 5,
  },
  {
    name: "James Kim",
    role: "Marketing Manager",
    text: "The command palette search makes finding the right tool instant. Love the dark mode too. Best PDF tool suite I've found online.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Loved by users worldwide</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Join thousands of people who trust PDFForge for their document needs.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Card key={i} className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="flex-1 text-sm text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
