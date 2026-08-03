/**
 * Feature flags gate infrastructure-dependent capabilities.
 *
 * The app is designed to run fully client-side for core PDF operations, so
 * these services are optional. Enable them by providing the corresponding
 * environment variables (see `.env.example`).
 */

export const flags = {
  auth: {
    enabled: Boolean(process.env.AUTH_SECRET),
    provider: process.env.AUTH_PROVIDER ?? "clerk",
  },
  database: {
    enabled: Boolean(process.env.DATABASE_URL),
  },
  billing: {
    enabled: Boolean(process.env.STRIPE_SECRET_KEY),
    providers: ["stripe", "lemonsqueezy", "paddle"].filter((p) =>
      Boolean(process.env[`${p.toUpperCase()}_SECRET_KEY`]),
    ),
  },
  storage: {
    enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    provider: process.env.STORAGE_PROVIDER ?? "vercel-blob",
  },
  ai: {
    enabled: Boolean(process.env.USER_LLM_API_KEY),
    provider: process.env.USER_LLM_PROVIDER ?? "openai",
  },
  ocr: {
    enabled: Boolean(process.env.OCR_SERVICE_URL),
  },
  queue: {
    enabled: Boolean(process.env.REDIS_URL),
  },
  analytics: {
    ga4: Boolean(process.env.NEXT_PUBLIC_GA4_ID),
    posthog: Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY),
  },
  sentry: {
    enabled: Boolean(process.env.SENTRY_DSN),
  },
  email: {
    enabled: Boolean(process.env.RESEND_API_KEY),
  },
} as const;
