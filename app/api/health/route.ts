import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: siteConfig.name,
    version: "0.1.0",
    timestamp: new Date().toISOString(),
    features: {
      clientSideProcessing: true,
      auth: Boolean(process.env.AUTH_SECRET),
      database: Boolean(process.env.DATABASE_URL),
      billing: Boolean(process.env.STRIPE_SECRET_KEY),
      ai: Boolean(process.env.USER_LLM_API_KEY),
    },
  });
}
