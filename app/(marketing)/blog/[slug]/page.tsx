import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Tag, ChevronRight } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string[];
  relatedSlugs: string[];
}

const BLOG_POSTS: Record<string, BlogPost> = {
  "how-to-merge-pdf-files": {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge PDF Files: Complete Guide (2026)",
    excerpt: "Learn the fastest way to combine multiple PDF files into one document.",
    category: "Tutorial",
    readTime: "5 min read",
    date: "2026-01-15",
    relatedSlugs: ["compress-pdf-for-email", "convert-word-to-pdf-free"],
    content: [
      "Merging PDF files is one of the most common document tasks. Whether you're combining lecture notes, assembling a report, or organizing receipts, a PDF merger saves you time and keeps everything in one place.",
      "## Why Merge PDF Files?",
      "There are many reasons you might need to combine PDFs. Students merge lecture notes into a single study guide. Professionals combine contracts with appendices. Personal users group receipts for expense reports. Whatever your use case, merging PDFs is quick and free with the right tool.",
      "## Step-by-Step Guide",
      "1. **Upload your files** — Drag and drop up to 20 PDF files into the merge tool. You can also click to browse your device.",
      "2. **Reorder as needed** — Drag files up or down to arrange them in the order you want. The first file in the list becomes the first pages of your merged PDF.",
      "3. **Download** — Click the merge button and your combined PDF downloads instantly. The entire process happens in your browser — no uploads to any server.",
      "## Tips for Best Results",
      "- **Check page counts** before merging to make sure you have everything in order.\n- **Merge related documents** to keep your file organization clean.\n- **Compress after merging** if the combined file is too large for email.",
      "## Privacy & Security",
      "When you use a browser-based tool like PDFForge, your files never leave your device. The merge happens entirely in your browser using JavaScript. No files are uploaded to any server, so your documents stay private.",
      "## Frequently Asked Questions",
      "**Can I merge more than two PDFs?** Yes, you can merge up to 20 PDF files at once.\n\n**Does merging reduce quality?** No. Pages are copied byte-for-byte, preserving original quality.\n\n**Is it free?** Yes, merging is completely free with no watermarks.",
    ],
  },
  "compress-pdf-for-email": {
    slug: "compress-pdf-for-email",
    title: "How to Compress PDF for Email (Reduce Size by 90%)",
    excerpt: "Shrink large PDF files so they fit email attachment limits.",
    category: "Guide",
    readTime: "4 min read",
    date: "2026-01-10",
    relatedSlugs: ["how-to-merge-pdf-files", "convert-word-to-pdf-free"],
    content: [
      "Email providers typically limit attachments to 25MB. Large PDF files — especially those with images — often exceed this limit. Compressing your PDF before sending is the quickest solution.",
      "## Why PDFs Are Large",
      "PDF files with high-resolution images, embedded fonts, or many pages can be surprisingly large. A 50-page report with images might be 50MB or more. Compression reduces file size by optimizing images and removing unnecessary data.",
      "## How to Compress",
      "1. **Upload your PDF** — Drag and drop your file into the compression tool.\n2. **Choose compression level** — Select from Maximum Quality, Recommended, or Maximum Compression.\n3. **Download** — Your compressed PDF is ready in seconds.",
      "## Compression Levels Explained",
      "- **Maximum Quality** — Minimal compression, best for print documents.\n- **Recommended** — Good balance of size and quality, ideal for email.\n- **Maximum Compression** — Smallest file size, slight quality reduction.",
      "## When to Use Each Level",
      "Use Maximum Quality for documents you'll print. Use Recommended for most email and sharing scenarios. Use Maximum Compression when file size is critical and quality is less important.",
    ],
  },
  "convert-word-to-pdf-free": {
    slug: "convert-word-to-pdf-free",
    title: "Convert Word to PDF Free — No Software Needed",
    excerpt: "Turn DOCX files into professional PDFs in your browser.",
    category: "Tutorial",
    readTime: "3 min read",
    date: "2026-01-05",
    relatedSlugs: ["how-to-merge-pdf-files", "compress-pdf-for-email"],
    content: [
      "Converting Word documents to PDF ensures your formatting stays consistent across all devices and operating systems. Here's how to do it for free, without installing any software.",
      "## Why Convert to PDF?",
      "PDFs look the same everywhere. When you send a Word document, the recipient might see different fonts, spacing, or layout. PDF eliminates this problem by preserving your exact formatting.",
      "## How to Convert",
      "1. **Upload your DOCX file** — Drag and drop your Word document into the converter.\n2. **Wait a moment** — The conversion happens in your browser.\n3. **Download your PDF** — Your converted file is ready instantly.",
      "## Tips",
      "- Convert before sending important documents to preserve formatting.\n- Combine with compression if the PDF is larger than expected.\n- Add page numbers or watermarks after conversion for professional touch.",
    ],
  },
  "pdf-privacy-why-browser-tools-are-safer": {
    slug: "pdf-privacy-why-browser-tools-are-safer",
    title: "Why Browser-Based PDF Tools Are Safer Than Desktop Software",
    excerpt: "Your files never leave your device.",
    category: "Security",
    readTime: "6 min read",
    date: "2025-12-28",
    relatedSlugs: ["how-to-merge-pdf-files", "best-pdf-tools-students-2026"],
    content: [
      "When you use online PDF tools, privacy is a major concern. Most web-based tools upload your files to their servers for processing. Browser-based tools like PDFForge take a different approach — your files never leave your device.",
      "## How Traditional Tools Work",
      "When you upload a file to a typical online converter, it travels to a remote server, gets processed, and then you download the result. During this process, the server has access to your file contents. Even if they delete it afterward, there's a window of exposure.",
      "## How Browser-Based Tools Work",
      "Browser-based tools use JavaScript to process files directly on your device. The file never leaves your computer — it's loaded into your browser's memory, processed locally, and the result is saved directly to your device. No uploads, no servers, no exposure.",
      "## Key Privacy Benefits",
      "- **No file transmission** — Your data stays on your device.\n- **No server storage** — Files are never stored on remote servers.\n- **No third-party access** — Only you can see your documents.\n- **No data collection** — Tool providers can't analyze your file contents.",
      "## When to Choose Browser-Based",
      "Always choose browser-based tools for sensitive documents — contracts, medical records, financial statements, legal documents, and personal information. The privacy advantage is significant.",
    ],
  },
  "best-pdf-tools-students-2026": {
    slug: "best-pdf-tools-students-2026",
    title: "Best Free PDF Tools for Students in 2026",
    excerpt: "From merging lecture notes to converting papers.",
    category: "Roundup",
    readTime: "7 min read",
    date: "2025-12-20",
    relatedSlugs: ["how-to-merge-pdf-files", "convert-word-to-pdf-free"],
    content: [
      "Students deal with PDFs constantly — lecture notes, research papers, textbook excerpts, assignment submissions. Here are the essential free PDF tools every student needs in 2026.",
      "## Must-Have Tools",
      "### 1. Merge PDF\nCombine lecture notes from multiple sessions into one study guide. Merge PDF lets you combine up to 20 files and reorder them before merging.",
      "### 2. PDF to Text\nExtract quotes and passages from digital textbooks for essays and citations. Perfect for research papers.",
      "### 3. Compress PDF\nShrink large PDF files so you can email them to professors or submit through online portals with size limits.",
      "### 4. Split PDF\nExtract specific chapters or sections from textbooks. Save only the pages you need for a particular assignment.",
      "### 5. Text to PDF\nConvert your essays and reports from plain text to properly formatted PDFs for submission.",
      "## Study Tips",
      "- Merge all lecture notes for a course into one file before exams.\n- Use PDF to Text to search for keywords across large documents.\n- Compress PDFs before submitting through learning management systems.",
    ],
  },
  "ocr-extract-text-scanned-pdf": {
    slug: "ocr-extract-text-scanned-pdf",
    title: "How to Extract Text from Scanned PDFs (OCR Guide)",
    excerpt: "Turn scanned documents into editable text.",
    category: "Tutorial",
    readTime: "5 min read",
    date: "2025-12-15",
    relatedSlugs: ["pdf-privacy-why-browser-tools-are-safer", "best-pdf-tools-students-2026"],
    content: [
      "OCR (Optical Character Recognition) converts scanned documents and images into editable, searchable text. Here's how to use OCR to extract text from scanned PDFs.",
      "## What Is OCR?",
      "OCR technology analyzes the visual patterns in a scanned document or image and converts them into machine-readable text. This makes scanned documents searchable, copy-pasteable, and editable.",
      "## How to Use OCR",
      "1. **Upload your scanned PDF** — Drag and drop the file into the OCR tool.\n2. **Wait for processing** — OCR analyzes each page and extracts text.\n3. **Download the result** — Get your text as a TXT file or searchable PDF.",
      "## Tips for Better Results",
      "- Use high-resolution scans (300 DPI or higher) for best accuracy.\n- Ensure documents are straight and well-lit.\n- Clean up any noise or artifacts before OCR processing.",
      "## Use Cases",
      "- Extract text from printed books for research papers.\n- Digitize handwritten notes (with handwriting OCR).\n- Make scanned legal documents searchable.\n- Convert paper receipts for expense tracking.",
    ],
  },
  "how-to-split-pdf": {
    slug: "how-to-split-pdf",
    title: "How to Split a PDF into Multiple Files (2026)",
    excerpt: "Extract specific pages or split a PDF into individual files for free.",
    category: "Tutorial",
    readTime: "4 min read",
    date: "2025-12-10",
    relatedSlugs: ["how-to-merge-pdf-files", "compress-pdf-for-email"],
    content: [
      "Sometimes you need to extract just a few pages from a large PDF. Whether it's pulling a chapter from a textbook or separating sections of a report, splitting PDFs is quick and free.",
      "## When to Split PDFs",
      "Splitting is useful when you need to share only specific pages, reduce file size by removing unnecessary pages, or organize a large document into smaller parts.",
      "## How to Split",
      "1. **Upload your PDF** — Drag and drop the file into the split tool.\n2. **Choose your method** — Extract by page range (e.g., 1-3, 5) or extract every page as a separate file.\n3. **Download** — Your split files download instantly.",
      "## Tips",
      "- Use page ranges to extract specific sections.\n- Extract every page when you need individual files.\n- Merge the extracted pages back later if needed.",
    ],
  },
  "how-to-compress-pdf": {
    slug: "how-to-compress-pdf",
    title: "How to Compress PDF Files Without Losing Quality",
    excerpt: "Reduce PDF file size while keeping the quality you need.",
    category: "Guide",
    readTime: "4 min read",
    date: "2025-12-05",
    relatedSlugs: ["compress-pdf-for-email", "how-to-merge-pdf-files"],
    content: [
      "Large PDF files are hard to share, slow to load, and waste storage. Compression reduces file size while maintaining acceptable quality for your use case.",
      "## Understanding Compression",
      "PDF compression works by optimizing images, removing redundant data, and simplifying fonts. The level of compression determines the trade-off between file size and quality.",
      "## Compression Levels",
      "- **Maximum Quality** — Best for print. Minimal size reduction.\n- **Recommended** — Good for most purposes. Balanced size and quality.\n- **Maximum Compression** — Best for email. Slight quality reduction.",
      "## When to Compress",
      "Compress before emailing, uploading to web forms, or storing large archives. For documents you'll print, use Maximum Quality. For screen viewing, Recommended is fine.",
    ],
  },
  "best-free-pdf-tools-2026": {
    slug: "best-free-pdf-tools-2026",
    title: "Best Free PDF Tools in 2026 — Complete Comparison",
    excerpt: "Compare the top free PDF tools and find the best one for your needs.",
    category: "Roundup",
    readTime: "8 min read",
    date: "2025-11-28",
    relatedSlugs: ["pdf-privacy-why-browser-tools-are-safer", "how-to-merge-pdf-files"],
    content: [
      "There are dozens of free PDF tools available. Here's our comprehensive comparison of the best options in 2026, based on features, privacy, speed, and ease of use.",
      "## What We Evaluated",
      "We tested each tool on: file processing speed, output quality, privacy (where files are processed), supported formats, ease of use, and additional features.",
      "## Top Picks",
      "### Best for Privacy: PDFForge\nAll processing happens in your browser. Files never leave your device. 14 functional tools, no watermarks, no sign-up.",
      "### Best for Features: iLovePDF\nWide range of tools including OCR and e-sign. Server-side processing means files are uploaded.",
      "### Best for Teams: SmallPDF\nCollaboration features and team plans. Limited free tier (2 tasks/day).",
      "### Best Free Tier: PDF24\nUnlimited free usage with server-side processing. Good feature set.",
      "## Privacy Considerations",
      "If privacy matters, choose browser-based tools like PDFForge. If you need advanced features like OCR, you may need server-side tools that upload your files.",
    ],
  },
  "protect-pdf-with-password": {
    slug: "protect-pdf-with-password",
    title: "How to Protect a PDF with Password (2026)",
    excerpt: "Add password protection to your PDF files for free.",
    category: "Tutorial",
    readTime: "3 min read",
    date: "2025-11-20",
    relatedSlugs: ["pdf-privacy-why-browser-tools-are-safer", "how-to-merge-pdf-files"],
    content: [
      "Password-protecting a PDF prevents unauthorized access to sensitive documents. Here's how to add password protection to any PDF file.",
      "## Why Protect PDFs",
      "Protect PDFs containing confidential information — contracts, financial records, personal documents, legal filings. Password protection ensures only authorized users can open them.",
      "## How to Add Password",
      "1. **Upload your PDF** — Drag and drop the file.\n2. **Set your password** — Choose a strong password.\n3. **Download** — Your protected PDF downloads with encryption applied.",
      "## Password Tips",
      "- Use at least 12 characters.\n- Mix uppercase, lowercase, numbers, and symbols.\n- Don't reuse passwords from other accounts.\n- Store passwords securely.",
    ],
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getAllSlugs(): string[] {
  return Object.keys(BLOG_POSTS);
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) notFound();

  const related = post.relatedSlugs
    .map((s) => BLOG_POSTS[s])
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li className="font-medium text-foreground">{post.title}</li>
        </ol>
      </nav>

      {/* Back link */}
      <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      {/* Article header */}
      <article className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Badge variant="secondary"><Tag className="mr-1 h-3 w-3" />{post.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />{post.readTime}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />{formatDate(post.date)}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mb-8 text-lg text-muted-foreground">{post.excerpt}</p>

        {/* Article content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return <h2 key={i} className="mt-8 mb-4 text-2xl font-bold">{block.replace("## ", "")}</h2>;
            }
            if (block.startsWith("### ")) {
              return <h3 key={i} className="mt-6 mb-3 text-xl font-semibold">{block.replace("### ", "")}</h3>;
            }
            if (block.startsWith("- ")) {
              const items = block.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="my-4 list-disc space-y-2 pl-6">
                  {items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground">{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            if (block.includes("\n\n")) {
              return (
                <div key={i} className="space-y-4">
                  {block.split("\n\n").map((p, j) => (
                    <p key={j} className="text-sm leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                </div>
              );
            }
            return <p key={i} className="text-sm leading-relaxed text-muted-foreground">{block}</p>;
          })}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t pt-8">
          <h2 className="mb-4 text-xl font-semibold">Related articles</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="mb-2 text-xs">{r.category}</Badge>
                    <h3 className="font-semibold group-hover:text-primary">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{r.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
