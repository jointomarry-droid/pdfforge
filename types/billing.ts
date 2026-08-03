export type PlanId = "free" | "pro" | "business" | "enterprise";

export interface Subscription {
  plan: PlanId;
  status: "active" | "trialing" | "past_due" | "canceled" | "paused";
  renewsAt?: string;
}

export interface UsageLimit {
  plan: PlanId;
  maxFileSizeMb: number;
  dailyConversions: number | "unlimited";
  watermark: boolean;
  ocr: boolean;
  ai: boolean;
  batch: boolean;
  api: boolean;
}
