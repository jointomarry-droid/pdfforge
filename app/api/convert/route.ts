import { NextResponse } from "next/server";

import { conversionsLimiter } from "@/lib/rate-limit";
import { flags } from "@/lib/config/flags";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side conversion endpoint.
 *
 * Core tools run client-side and never call this endpoint. This route is the
 * contract for the server-side pipeline (Office conversion, OCR, AI) once the
 * job queue is configured. It enforces rate limits and validates payload size.
 */
export async function POST(request: Request) {
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!conversionsLimiter.check(clientIp)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Daily conversion limit reached. Try again tomorrow or upgrade to Pro." },
      { status: 429 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "bad_request", message: "Expected multipart/form-data upload." },
      { status: 400 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "bad_request", message: "Missing file field." },
        { status: 400 },
      );
    }
    const { name, size, type } = file;
    if (size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "file_too_large", message: "File exceeds the 10 MB free limit." },
        { status: 413 },
      );
    }

    const tool = formData.get("tool")?.toString() ?? "unknown";
    const queued = flags.queue.enabled;

    return NextResponse.json(
      {
        accepted: true,
        queued,
        file: { name, size, type },
        tool,
        message: queued
          ? "Conversion queued for processing."
          : "Server-side conversion is not configured. Set REDIS_URL to enable the job queue.",
      },
      { status: 202 },
    );
  } catch {
    return NextResponse.json(
      { error: "invalid_upload", message: "Could not parse the upload." },
      { status: 400 },
    );
  }
}
