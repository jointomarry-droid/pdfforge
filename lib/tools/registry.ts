import type { ToolCategory, ToolDefinition } from "@/types/tool";

export const categoryMeta: Record<
  ToolCategory,
  { label: string; description: string }
> = {
  "convert-to-pdf": {
    label: "Convert to PDF",
    description: "Turn documents and images into universal PDF files.",
  },
  "convert-from-pdf": {
    label: "Convert from PDF",
    description: "Extract your PDF content into other formats.",
  },
  edit: {
    label: "Edit PDF",
    description: "Merge, split, rotate and organize your PDF pages.",
  },
  compress: {
    label: "Compress",
    description: "Reduce file sizes without losing essential quality.",
  },
  ocr: {
    label: "OCR",
    description: "Turn scanned documents and images into editable text.",
  },
  ai: {
    label: "AI tools",
    description: "Summarize, translate and chat with your documents.",
  },
  image: {
    label: "Image tools",
    description: "Convert and optimize image files.",
  },
  office: {
    label: "Office tools",
    description: "Work with Word, Excel and PowerPoint files.",
  },
  sign: {
    label: "Sign & seal",
    description: "Add signatures to your documents.",
  },
  security: {
    label: "Security",
    description: "Protect your files with encryption and access controls.",
  },
  batch: {
    label: "Batch",
    description: "Process multiple files in one go.",
  },
};

interface PlaceholderSpec {
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  extensions?: string[];
  input?: ToolDefinition["input"];
}

const PLACEHOLDER_TOOLS: PlaceholderSpec[] = [
  { slug: "word-to-pdf", name: "Word to PDF", category: "convert-to-pdf", description: "Convert DOCX and DOC files to PDF in seconds.", extensions: ["docx", "doc"], input: "office" },
  { slug: "excel-to-pdf", name: "Excel to PDF", category: "convert-to-pdf", description: "Turn XLSX spreadsheets into PDF documents.", extensions: ["xlsx", "xls"], input: "office" },
  { slug: "ppt-to-pdf", name: "PowerPoint to PDF", category: "convert-to-pdf", description: "Convert PPTX presentations to PDF slides.", extensions: ["pptx", "ppt"], input: "office" },
  { slug: "html-to-pdf", name: "HTML to PDF", category: "convert-to-pdf", description: "Render web pages and HTML files as PDF.", extensions: ["html", "htm"], input: "html" },
  { slug: "epub-to-pdf", name: "EPUB to PDF", category: "convert-to-pdf", description: "Convert e-books to print-ready PDF.", extensions: ["epub"], input: "ebook" },
  { slug: "csv-to-pdf", name: "CSV to PDF", category: "convert-to-pdf", description: "Convert CSV data into a formatted PDF table.", extensions: ["csv"], input: "csv" },
  { slug: "xml-to-pdf", name: "XML to PDF", category: "convert-to-pdf", description: "Render structured XML documents as PDF.", extensions: ["xml"], input: "text" },
  { slug: "json-to-pdf", name: "JSON to PDF", category: "convert-to-pdf", description: "Pretty-print JSON data into a PDF file.", extensions: ["json"], input: "text" },
  { slug: "pdf-to-word", name: "PDF to Word", category: "convert-from-pdf", description: "Convert PDF to editable DOCX documents.", extensions: ["pdf"], input: "pdf" },
  { slug: "pdf-to-excel", name: "PDF to Excel", category: "convert-from-pdf", description: "Extract tables from PDF into XLSX.", extensions: ["pdf"], input: "pdf" },
  { slug: "pdf-to-ppt", name: "PDF to PowerPoint", category: "convert-from-pdf", description: "Turn PDF pages into editable PPTX slides.", extensions: ["pdf"], input: "pdf" },
  { slug: "pdf-to-svg", name: "PDF to SVG", category: "convert-from-pdf", description: "Convert PDF pages to scalable vector graphics.", extensions: ["pdf"], input: "pdf" },
  { slug: "pdf-to-html", name: "PDF to HTML", category: "convert-from-pdf", description: "Extract PDF content into web-ready HTML.", extensions: ["pdf"], input: "pdf" },
  { slug: "pdf-to-markdown", name: "PDF to Markdown", category: "convert-from-pdf", description: "Convert PDF text into Markdown files.", extensions: ["pdf"], input: "pdf" },
  { slug: "pdf-to-csv", name: "PDF to CSV", category: "convert-from-pdf", description: "Export tables from PDF into CSV.", extensions: ["pdf"], input: "pdf" },
  { slug: "extract-pages", name: "Extract Pages", category: "edit", description: "Pull selected pages out of a PDF.", extensions: ["pdf"], input: "pdf" },
  { slug: "rearrange-pages", name: "Rearrange Pages", category: "edit", description: "Reorder PDF pages with drag and drop.", extensions: ["pdf"], input: "pdf" },
  { slug: "remove-watermark", name: "Remove Watermark", category: "edit", description: "Clean watermarks from PDF documents.", extensions: ["pdf"], input: "pdf" },
  { slug: "crop-pdf", name: "Crop PDF", category: "edit", description: "Crop PDF pages to a custom area.", extensions: ["pdf"], input: "pdf" },
  { slug: "resize-pdf", name: "Resize PDF", category: "edit", description: "Change the page size of your PDF.", extensions: ["pdf"], input: "pdf" },
  { slug: "repair-pdf", name: "Repair PDF", category: "edit", description: "Fix corrupted or unreadable PDF files.", extensions: ["pdf"], input: "pdf" },
  { slug: "unlock-pdf", name: "Unlock PDF", category: "edit", description: "Remove a password from a protected PDF.", extensions: ["pdf"], input: "pdf" },
  { slug: "protect-pdf", name: "Protect PDF", category: "edit", description: "Add a password to restrict PDF access.", extensions: ["pdf"], input: "pdf" },
  { slug: "encrypt-pdf", name: "Encrypt PDF", category: "edit", description: "Encrypt PDFs with AES-256 encryption.", extensions: ["pdf"], input: "pdf" },
  { slug: "decrypt-pdf", name: "Decrypt PDF", category: "edit", description: "Decrypt PDFs protected with a password.", extensions: ["pdf"], input: "pdf" },
  { slug: "flatten-pdf", name: "Flatten PDF", category: "edit", description: "Flatten form fields and layers into the page.", extensions: ["pdf"], input: "pdf" },
  { slug: "compress-images", name: "Compress Images", category: "compress", description: "Reduce image file sizes for the web.", extensions: ["jpg", "png", "webp"], input: "images" },
  { slug: "smart-compress", name: "Smart Compress", category: "compress", description: "Auto-tuned compression that balances size and quality.", extensions: ["pdf", "jpg", "png"], input: "pdf" },
  { slug: "image-ocr", name: "Image OCR", category: "ocr", description: "Extract text from scanned images.", extensions: ["jpg", "png", "webp"], input: "images" },
  { slug: "pdf-ocr", name: "PDF OCR", category: "ocr", description: "Recognize text in scanned PDF documents.", extensions: ["pdf"], input: "pdf" },
  { slug: "searchable-pdf", name: "Searchable PDF", category: "ocr", description: "Add a searchable text layer to scanned PDFs.", extensions: ["pdf"], input: "pdf" },
  { slug: "handwriting-ocr", name: "Handwriting OCR", category: "ocr", description: "Digitize handwritten notes and forms.", extensions: ["jpg", "png"], input: "images" },
  { slug: "invoice-ocr", name: "Invoice OCR", category: "ocr", description: "Extract invoice data into structured output.", extensions: ["pdf", "jpg", "png"], input: "pdf" },
  { slug: "receipt-ocr", name: "Receipt OCR", category: "ocr", description: "Parse receipts and itemize expenses.", extensions: ["jpg", "png"], input: "images" },
  { slug: "table-ocr", name: "Table OCR", category: "ocr", description: "Extract tables from documents into spreadsheets.", extensions: ["pdf", "jpg", "png"], input: "pdf" },
  { slug: "passport-ocr", name: "Passport OCR", category: "ocr", description: "Read passport data with MRZ recognition.", extensions: ["jpg", "png"], input: "images" },
  { slug: "id-card-ocr", name: "ID Card OCR", category: "ocr", description: "Extract data from ID cards and driver licenses.", extensions: ["jpg", "png"], input: "images" },
  { slug: "ai-pdf-summary", name: "AI PDF Summary", category: "ai", description: "Summarize long PDF documents with AI.", extensions: ["pdf"], input: "pdf" },
  { slug: "ai-translator", name: "AI Translator", category: "ai", description: "Translate PDFs into 30+ languages.", extensions: ["pdf"], input: "pdf" },
  { slug: "ai-rewrite", name: "AI Rewrite", category: "ai", description: "Rewrite and rephrase document content.", extensions: ["pdf"], input: "pdf" },
  { slug: "ai-grammar-fix", name: "AI Grammar Fix", category: "ai", description: "Fix grammar and spelling across documents.", extensions: ["pdf"], input: "pdf" },
  { slug: "chat-with-pdf", name: "Chat with PDF", category: "ai", description: "Ask questions and get answers from your PDF.", extensions: ["pdf"], input: "pdf" },
  { slug: "ai-document-comparison", name: "AI Document Comparison", category: "ai", description: "Diff two documents and highlight changes.", extensions: ["pdf"], input: "pdf" },
  { slug: "ai-contract-review", name: "AI Contract Review", category: "ai", description: "Flag risky clauses in contracts automatically.", extensions: ["pdf"], input: "pdf" },
  { slug: "ai-resume-analyzer", name: "AI Resume Analyzer", category: "ai", description: "Get feedback on your resume or CV.", extensions: ["pdf"], input: "pdf" },
  { slug: "ai-extract-tables", name: "AI Extract Tables", category: "ai", description: "Extract structured tables from any document.", extensions: ["pdf"], input: "pdf" },
  { slug: "ai-extract-forms", name: "AI Extract Forms", category: "ai", description: "Pull form fields into structured data.", extensions: ["pdf"], input: "pdf" },
  { slug: "ai-citation-generator", name: "AI Citation Generator", category: "ai", description: "Generate citations from academic PDFs.", extensions: ["pdf"], input: "pdf" },
  { slug: "avif-to-png", name: "AVIF to PNG", category: "image", description: "Convert AVIF images to PNG.", extensions: ["avif"], input: "images" },
  { slug: "heic-to-jpg", name: "HEIC to JPG", category: "image", description: "Convert iPhone HEIC photos to JPG.", extensions: ["heic", "heif"], input: "images" },
  { slug: "svg-converter", name: "SVG Converter", category: "image", description: "Convert SVG files to raster images.", extensions: ["svg"], input: "images" },
  { slug: "gif-converter", name: "GIF Converter", category: "image", description: "Convert between GIF and other formats.", extensions: ["gif"], input: "images" },
  { slug: "resize-images", name: "Resize Images", category: "image", description: "Resize images to exact dimensions.", extensions: ["jpg", "png", "webp"], input: "images" },
  { slug: "remove-background", name: "Remove Background", category: "image", description: "Cut out image backgrounds automatically.", extensions: ["jpg", "png", "webp"], input: "images" },
  { slug: "watermark-images", name: "Watermark Images", category: "image", description: "Add text or logo watermarks to photos.", extensions: ["jpg", "png", "webp"], input: "images" },
  { slug: "docx-converter", name: "DOCX Converter", category: "office", description: "Convert between Word formats and more.", extensions: ["docx"], input: "office" },
  { slug: "xlsx-converter", name: "XLSX Converter", category: "office", description: "Convert Excel files between formats.", extensions: ["xlsx"], input: "office" },
  { slug: "pptx-converter", name: "PPTX Converter", category: "office", description: "Convert PowerPoint files between formats.", extensions: ["pptx"], input: "office" },
  { slug: "odt-support", name: "ODT Converter", category: "office", description: "Open and convert OpenDocument files.", extensions: ["odt"], input: "office" },
  { slug: "rtf-support", name: "RTF Converter", category: "office", description: "Convert rich text files to modern formats.", extensions: ["rtf"], input: "office" },
  { slug: "mobi-support", name: "MOBI Converter", category: "office", description: "Convert Kindle e-book files.", extensions: ["mobi"], input: "ebook" },
  { slug: "add-signature", name: "Add Signature", category: "sign", description: "Sign PDFs digitally in seconds.", extensions: ["pdf"], input: "pdf" },
  { slug: "draw-signature", name: "Draw Signature", category: "sign", description: "Draw a signature with your mouse or finger.", extensions: ["pdf"], input: "pdf" },
  { slug: "upload-signature", name: "Upload Signature", category: "sign", description: "Upload and reuse an existing signature.", extensions: ["pdf"], input: "pdf" },
  { slug: "certificate-signature", name: "Certificate Signature", category: "sign", description: "Apply a digital certificate signature.", extensions: ["pdf"], input: "pdf" },
  { slug: "timestamp-signature", name: "Timestamp Signature", category: "sign", description: "Add a trusted timestamp to PDFs.", extensions: ["pdf"], input: "pdf" },
  { slug: "password-protection", name: "Password Protection", category: "security", description: "Protect PDFs with a strong password.", extensions: ["pdf"], input: "pdf" },
  { slug: "aes-256-encryption", name: "AES-256 Encryption", category: "security", description: "Encrypt files with military-grade AES-256.", extensions: ["pdf"], input: "pdf" },
  { slug: "virus-scan", name: "Virus Scan", category: "security", description: "Scan uploads for malware before processing.", extensions: ["pdf"], input: "pdf" },
  { slug: "secure-file-deletion", name: "Secure File Deletion", category: "security", description: "Permanently erase files after conversion.", extensions: ["pdf"], input: "pdf" },
  { slug: "temporary-storage", name: "Temporary Storage", category: "security", description: "Files auto-delete after one hour.", extensions: ["pdf"], input: "pdf" },
  { slug: "auto-delete", name: "Auto Delete", category: "security", description: "Schedule automatic deletion of uploads.", extensions: ["pdf"], input: "pdf" },
  { slug: "audit-logs", name: "Audit Logs", category: "security", description: "Track every document action for compliance.", extensions: ["pdf"], input: "pdf" },
  { slug: "bulk-upload", name: "Bulk Upload", category: "batch", description: "Upload and convert many files at once.", extensions: ["pdf"], input: "any" },
  { slug: "batch-conversion", name: "Batch Conversion", category: "batch", description: "Convert entire folders of files.", extensions: ["pdf"], input: "any" },
  { slug: "batch-ocr", name: "Batch OCR", category: "batch", description: "OCR hundreds of pages automatically.", extensions: ["pdf", "jpg", "png"], input: "any" },
  { slug: "batch-compression", name: "Batch Compression", category: "batch", description: "Compress many files in one job.", extensions: ["pdf", "jpg", "png"], input: "any" },
  { slug: "zip-download", name: "ZIP Download", category: "batch", description: "Download processed files as a ZIP archive.", extensions: ["pdf"], input: "any" },
];

function buildPlaceholder(spec: PlaceholderSpec): ToolDefinition {
  return {
    ...spec,
    extensions: spec.extensions ?? [],
    input: spec.input ?? "any",
    tagline: spec.description,
    longDescription: spec.description,
    clientSide: false,
    placeholder: true,
    maxFiles: 10,
    keywords: [spec.name.toLowerCase(), ...(spec.extensions ?? []).map((e) => `${e} to pdf`)],
    faq: [
      {
        q: `How do I use the ${spec.name} tool?`,
        a: `Select your file, choose any options, and click convert. Your files are processed securely and never shared with third parties.`,
      },
      {
        q: `Is the ${spec.name} tool free?`,
        a: `Yes. All core PDF tools are free with a daily conversion limit. Upgrade to Pro for unlimited conversions, OCR and AI features.`,
      },
      {
        q: `Are my files kept private?`,
        a: `Files are processed in-memory and automatically deleted after one hour. We never sell or share your documents.`,
      },
    ],
    related: [],
  };
}

function buildFunctional(spec: PlaceholderSpec, extra: Partial<ToolDefinition>): ToolDefinition {
  return {
    ...buildPlaceholder(spec),
    ...extra,
    placeholder: false,
    clientSide: true,
  };
}

const FUNCTIONAL_TOOLS: ToolDefinition[] = [
  buildFunctional(
    { slug: "merge-pdf", name: "Merge PDF", category: "edit", description: "Combine multiple PDFs into one file in the order you choose.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Combine multiple PDF files into a single document",
      longDescription:
        "Merge PDF lets you combine several PDF files into one polished document in seconds. Reorder files with drag and drop, then download a single merged PDF that preserves the original quality of every page. Everything happens in your browser — your documents never leave your device.",
      maxFiles: 20,
      keywords: ["merge pdf", "combine pdf", "join pdf", "concatenate pdf"],
      related: ["split-pdf", "delete-pages", "rearrange-pages"],
      faq: [
        { q: "Can I merge more than two PDFs?", a: "Yes, you can merge up to 20 PDF files at once. Drag files to reorder them before merging." },
        { q: "Does merging reduce PDF quality?", a: "No. Pages are copied byte-for-byte into the output, so original quality and resolution are fully preserved." },
        { q: "Is merging free and unlimited?", a: "Merging is free up to your daily conversion limit. Pro and Business plans remove the limit." },
      ],
    },
  ),
  buildFunctional(
    { slug: "split-pdf", name: "Split PDF", category: "edit", description: "Split a PDF into separate files by page range or per page.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Separate one PDF into multiple files",
      longDescription:
        "Split PDF breaks a large document into smaller files. Split by exact page ranges (for example 1–3, 4–8) or extract every page as its own PDF. Output files are generated locally in your browser and ready to download instantly.",
      keywords: ["split pdf", "extract pages", "divide pdf", "separate pdf"],
      related: ["merge-pdf", "extract-pages", "delete-pages"],
      faq: [
        { q: "How do I split a PDF into individual pages?", a: "Choose the 'Extract every page' option and each page becomes a separate PDF file." },
        { q: "Can I split a PDF into custom ranges?", a: "Yes. Enter ranges like 1-3, 5, 8-10 and each range is saved as its own file." },
        { q: "Are split files smaller than the original?", a: "Each output file contains only the pages you selected, so total size is roughly proportional to the pages included." },
      ],
    },
  ),
  buildFunctional(
    { slug: "rotate-pdf", name: "Rotate PDF", category: "edit", description: "Rotate PDF pages 90, 180 or 270 degrees.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Fix upside-down or sideways PDF pages",
      longDescription:
        "Rotate PDF lets you correct page orientation in seconds. Rotate every page in one click, or pick individual pages and rotate them 90, 180 or 270 degrees. Orientation is applied to the PDF metadata so no quality is lost.",
      keywords: ["rotate pdf", "rotate pages", "flip pdf", "fix pdf orientation"],
      related: ["merge-pdf", "split-pdf", "crop-pdf"],
      faq: [
        { q: "Can I rotate a single page of a PDF?", a: "Yes. Select the specific pages you want to rotate and choose an angle, leaving the rest untouched." },
        { q: "Does rotation affect file quality?", a: "No. Rotation is a metadata-only operation, so pages keep their original quality." },
        { q: "Can I rotate multiple PDFs at once?", a: "Rotate applies to all pages of the uploaded document; you can run it again after uploading a new file." },
      ],
    },
  ),
  buildFunctional(
    { slug: "compress-pdf", name: "Compress PDF", category: "compress", description: "Reduce PDF file size while keeping good quality.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Shrink your PDF file size dramatically",
      longDescription:
        "Compress PDF reduces large documents to a fraction of their original size so they are easier to email, upload and store. Choose from four compression levels — from 'Maximum quality' to 'Maximum compression' — and preview the exact size reduction before downloading. Compression runs entirely in your browser.",
      keywords: ["compress pdf", "reduce pdf size", "shrink pdf", "small pdf"],
      related: ["compress-images", "smart-compress", "convert-to-pdf"],
      faq: [
        { q: "How much can I compress a PDF?", a: "Compression depends on the content. Image-heavy PDFs can shrink by 60-90%; text-only PDFs compress less because they are already small." },
        { q: "Does compression hurt quality?", a: "Use 'Maximum quality' mode for lossless-ish results, or lower levels when file size matters more than pixel-perfect output." },
        { q: "Is compression processed on the server?", a: "No. Everything runs locally in your browser, so documents never leave your device." },
      ],
    },
  ),
  buildFunctional(
    { slug: "images-to-pdf", name: "Images to PDF", category: "convert-to-pdf", description: "Turn JPG, PNG and WebP images into a single PDF.", extensions: ["jpg", "jpeg", "png", "webp"], input: "images" },
    {
      tagline: "Convert images into a beautiful PDF in one click",
      longDescription:
        "Images to PDF converts JPG, PNG, WebP and more into a single PDF document. Reorder images with drag and drop, choose a page size (A4, Letter, original) and download a PDF that preserves image quality. Ideal for scanning documents, building photo albums or preparing presentation handouts.",
      maxFiles: 50,
      keywords: ["images to pdf", "jpg to pdf", "png to pdf", "photo to pdf"],
      related: ["pdf-to-jpg", "pdf-to-png", "image-to-pdf"],
      faq: [
        { q: "Can I combine JPG and PNG in one PDF?", a: "Yes, you can mix image formats freely within a single PDF." },
        { q: "What page size can I choose?", a: "Pick A4, Letter, or keep the original size of each image." },
        { q: "Are my photos compressed?", a: "Images are embedded at their original resolution, so output quality matches your source files." },
      ],
    },
  ),
  buildFunctional(
    { slug: "pdf-to-jpg", name: "PDF to JPG", category: "convert-from-pdf", description: "Extract each PDF page as a high-quality JPG image.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Export PDF pages as high-quality JPG images",
      longDescription:
        "PDF to JPG renders every page of your PDF as a crisp JPEG image. Choose the export quality and whether you want all pages as a ZIP archive or a single page. Great for inserting PDF content into documents, slides or web pages.",
      keywords: ["pdf to jpg", "pdf to image", "extract jpg from pdf", "pdf to jpeg"],
      related: ["pdf-to-png", "images-to-pdf", "pdf-to-text"],
      faq: [
        { q: "Can I convert a specific page to JPG?", a: "Yes. Preview the pages and pick the exact page you want to export." },
        { q: "What resolution do JPGs have?", a: "Exports are rendered at the PDF's native resolution up to 300 DPI for print-quality results." },
        { q: "Do I get all pages or just one?", a: "By default every page is exported. If the PDF has multiple pages you can download them as a ZIP." },
      ],
    },
  ),
  buildFunctional(
    { slug: "pdf-to-png", name: "PDF to PNG", category: "convert-from-pdf", description: "Convert PDF pages to transparent-capable PNG images.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Render PDF pages as sharp PNG images",
      longDescription:
        "PDF to PNG converts each page into a lossless PNG image, ideal for graphics, presentations and web design. PNG preserves fine detail and supports transparency, making it the go-to format when quality matters.",
      keywords: ["pdf to png", "pdf to image", "convert pdf page to png"],
      related: ["pdf-to-jpg", "images-to-pdf", "svg-converter"],
      faq: [
        { q: "What is the difference between JPG and PNG export?", a: "PNG is lossless and supports transparency, while JPG is smaller but lossy. Use PNG for graphics and JPG for photos." },
        { q: "Is PNG output larger than JPG?", a: "Usually yes, because PNG is lossless. This is the trade-off for maximum quality." },
      ],
    },
  ),
  buildFunctional(
    { slug: "pdf-to-text", name: "PDF to Text", category: "convert-from-pdf", description: "Extract all text from a PDF into a plain TXT file.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Extract the text from any PDF in seconds",
      longDescription:
        "PDF to Text pulls the text layer out of your PDF and saves it as a plain .txt file. Useful for copy-paste editing, content repurposing, keyword research and feeding documents into other tools. Preserves reading order and paragraph structure.",
      keywords: ["pdf to text", "extract text from pdf", "pdf text extraction"],
      related: ["pdf-to-markdown", "pdf-to-word", "pdf-ocr"],
      faq: [
        { q: "Does this work with scanned PDFs?", a: "Only for PDFs that contain a text layer. For scanned documents, run PDF OCR first." },
        { q: "Will formatting be preserved?", a: "Text is exported in reading order. Complex layouts and tables are linearized but content is fully preserved." },
      ],
    },
  ),
  buildFunctional(
    { slug: "watermark-pdf", name: "Watermark PDF", category: "edit", description: "Add text or image watermarks to every PDF page.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Protect your documents with custom watermarks",
      longDescription:
        "Watermark PDF stamps every page with your text — like 'CONFIDENTIAL', 'DRAFT' or your company name. Choose the font size, opacity, color and rotation, and place the watermark diagonally across the page or at a custom position. The watermark is burned into the document so it cannot be easily removed.",
      keywords: ["watermark pdf", "add text to pdf", "stamp pdf", "confidential pdf"],
      related: ["protect-pdf", "page-numbers", "encrypt-pdf"],
      faq: [
        { q: "Can I watermark only some pages?", a: "Yes, choose 'all pages' or specify custom page ranges." },
        { q: "Can a watermark be removed?", a: "Text watermarks are drawn into the page content and are not trivially removable." },
        { q: "Does a watermark change file size?", a: "Watermarks add negligible size since they are rendered as vector text." },
      ],
    },
  ),
  buildFunctional(
    { slug: "page-numbers", name: "Page Numbers", category: "edit", description: "Add page numbers to your PDF in any position.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Number your PDF pages in one click",
      longDescription:
        "Page Numbers adds clean page numbers to your PDF. Choose the position (bottom center, bottom right, top center...), the starting number and whether to include a prefix like 'Page 3 of 12'. Perfect for reports, proposals, contracts and e-books.",
      keywords: ["page numbers pdf", "add page numbers", "number pdf pages"],
      related: ["watermark-pdf", "merge-pdf", "split-pdf"],
      faq: [
        { q: "Can I start numbering from a specific page?", a: "Yes, set a custom start number and choose the first page to number." },
        { q: "Can I add 'Page X of Y'?", a: "Yes, enable the total format option to display 'Page 2 of 40'." },
      ],
    },
  ),
  buildFunctional(
    { slug: "delete-pages", name: "Delete Pages", category: "edit", description: "Remove unwanted pages from a PDF.", extensions: ["pdf"], input: "pdf" },
    {
      tagline: "Remove unwanted pages from your PDF",
      longDescription:
        "Delete Pages removes blank, duplicate or unwanted pages from your PDF. Preview thumbnails, click the pages you want to drop, and download a clean document. The rest of your PDF stays byte-for-byte identical.",
      keywords: ["delete pages pdf", "remove pages from pdf", "delete pdf pages"],
      related: ["extract-pages", "split-pdf", "merge-pdf"],
      faq: [
        { q: "Can I delete multiple pages at once?", a: "Yes, select as many pages as you like before applying." },
        { q: "Is the deleted content recoverable?", a: "Download the new file — deleted pages are not included. Keep the original if you need them back." },
      ],
    },
  ),
  buildFunctional(
    { slug: "image-converter", name: "Image Converter", category: "image", description: "Convert between JPG, PNG and WebP formats.", extensions: ["jpg", "jpeg", "png", "webp"], input: "images" },
    {
      tagline: "Convert images between JPG, PNG and WebP",
      longDescription:
        "Image Converter transforms your pictures between JPG, PNG and WebP with adjustable quality and resizing. Perfect for optimizing images for the web, preparing files for upload, or simply changing formats. Batch mode lets you convert many images at once.",
      maxFiles: 50,
      keywords: ["image converter", "jpg to png", "png to jpg", "webp to jpg"],
      related: ["jpg-to-png", "png-to-jpg", "webp-to-jpg", "resize-images"],
      faq: [
        { q: "Which formats are supported?", a: "JPG, PNG and WebP conversions are supported directly in your browser." },
        { q: "Can I batch convert images?", a: "Yes, upload up to 50 images and convert them all at once." },
      ],
    },
  ),
  buildFunctional(
    { slug: "text-to-pdf", name: "Text to PDF", category: "convert-to-pdf", description: "Turn plain text into a clean PDF document.", extensions: ["txt"], input: "text" },
    {
      tagline: "Turn plain text into a clean PDF document",
      longDescription:
        "Text to PDF converts .txt files — or text you paste directly — into a neatly formatted PDF. Choose font size, margins and page size, and export a document that looks great on screen and in print.",
      keywords: ["text to pdf", "txt to pdf", "plain text to pdf"],
      related: ["markdown-to-pdf", "images-to-pdf", "html-to-pdf"],
      faq: [
        { q: "Can I paste text without a file?", a: "Yes, paste your content directly into the editor and convert it." },
      ],
    },
  ),
  buildFunctional(
    { slug: "markdown-to-pdf", name: "Markdown to PDF", category: "convert-to-pdf", description: "Render Markdown files as styled PDF documents.", extensions: ["md"], input: "markdown" },
    {
      tagline: "Render Markdown into a beautifully styled PDF",
      longDescription:
        "Markdown to PDF converts .md files into a professionally styled PDF with proper headings, lists, code blocks and emphasis. Perfect for documentation, README files, notes and lightweight reports.",
      keywords: ["markdown to pdf", "md to pdf", "convert markdown"],
      related: ["text-to-pdf", "pdf-to-markdown", "html-to-pdf"],
      faq: [
        { q: "Is Markdown formatting supported?", a: "Yes — headings, bold, italics, lists, blockquotes, links and code blocks are all styled." },
      ],
    },
  ),
];

export const tools: ToolDefinition[] = [
  ...FUNCTIONAL_TOOLS,
  ...PLACEHOLDER_TOOLS.map(buildPlaceholder),
];

const bySlug = new Map(tools.map((t) => [t.slug, t]));

export function getTool(slug: string): ToolDefinition | undefined {
  return bySlug.get(slug);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return tools.filter((t) => t.category === category);
}

export function getFunctionalTools(): ToolDefinition[] {
  return tools.filter((t) => t.clientSide && !t.placeholder);
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return tool.related
    .map((slug) => bySlug.get(slug))
    .filter((t): t is ToolDefinition => Boolean(t));
}
