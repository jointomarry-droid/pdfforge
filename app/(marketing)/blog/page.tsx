import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "Blog — PDF Tips, Tutorials & Guides",
  description:
    "Learn how to merge, split, compress, convert and manage PDF files. Expert tips, step-by-step tutorials, and productivity guides for working with documents.",
  path: "/blog",
});

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge PDF Files: Complete Guide (2026)",
    excerpt: "Learn the fastest way to combine multiple PDF files into one document. Free, no signup required.",
    category: "Tutorial",
    readTime: "5 min read",
    date: "2026-01-15",
  },
  {
    slug: "compress-pdf-for-email",
    title: "How to Compress PDF for Email (Reduce Size by 90%)",
    excerpt: "Shrink large PDF files so they fit email attachment limits without losing quality.",
    category: "Guide",
    readTime: "4 min read",
    date: "2026-01-10",
  },
  {
    slug: "convert-word-to-pdf-free",
    title: "Convert Word to PDF Free — No Software Needed",
    excerpt: "Turn DOCX files into professional PDFs in your browser. No account, no watermarks.",
    category: "Tutorial",
    readTime: "3 min read",
    date: "2026-01-05",
  },
  {
    slug: "how-to-split-pdf",
    title: "How to Split a PDF into Multiple Files (2026)",
    excerpt: "Extract specific pages or split a PDF into individual files for free.",
    category: "Tutorial",
    readTime: "4 min read",
    date: "2025-12-10",
  },
  {
    slug: "how-to-compress-pdf",
    title: "How to Compress PDF Files Without Losing Quality",
    excerpt: "Reduce PDF file size while keeping the quality you need.",
    category: "Guide",
    readTime: "4 min read",
    date: "2025-12-05",
  },
  {
    slug: "best-free-pdf-tools-2026",
    title: "Best Free PDF Tools in 2026 — Complete Comparison",
    excerpt: "Compare the top free PDF tools and find the best one for your needs.",
    category: "Roundup",
    readTime: "8 min read",
    date: "2025-11-28",
  },
  {
    slug: "protect-pdf-with-password",
    title: "How to Protect a PDF with Password (2026)",
    excerpt: "Add password protection to your PDF files for free.",
    category: "Tutorial",
    readTime: "3 min read",
    date: "2025-11-20",
  },
  {
    slug: "pdf-privacy-why-browser-tools-are-safer",
    title: "Why Browser-Based PDF Tools Are Safer Than Desktop Software",
    excerpt: "Your files never leave your device. Here's why client-side processing is the most private option.",
    category: "Security",
    readTime: "6 min read",
    date: "2025-12-28",
  },
  {
    slug: "best-pdf-tools-students-2026",
    title: "Best Free PDF Tools for Students in 2026",
    excerpt: "From merging lecture notes to converting papers — the tools every student needs.",
    category: "Roundup",
    readTime: "7 min read",
    date: "2025-12-20",
  },
  {
    slug: "ocr-extract-text-scanned-pdf",
    title: "How to Extract Text from Scanned PDFs (OCR Guide)",
    excerpt: "Turn scanned documents into editable text with OCR technology. Step-by-step guide.",
    category: "Tutorial",
    readTime: "5 min read",
    date: "2025-12-15",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10 max-w-2xl space-y-3">
        <Badge variant="secondary">Blog</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          PDF tips, tutorials & guides
        </h1>
        <p className="text-muted-foreground">
          Learn how to work with PDF files like a pro. Expert tips, step-by-step tutorials,
          and productivity guides.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
              <CardContent className="flex flex-col gap-3 p-5">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Tag className="mr-1 h-3 w-3" />
                    {post.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-semibold group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="text-xs font-medium text-primary group-hover:underline">
                    Read more
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
