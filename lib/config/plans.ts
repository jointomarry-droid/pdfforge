import type { PlanId } from "@/types/billing";

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  priceNote: string;
  cta: string;
  highlight: boolean;
  features: PlanFeature[];
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For occasional use",
    monthlyPrice: 0,
    yearlyPrice: 0,
    priceNote: "No credit card required",
    cta: "Start for free",
    highlight: false,
    features: [
      { text: "10 MB file limit", included: true },
      { text: "5 conversions per day", included: true },
      { text: "Watermarked output", included: true },
      { text: "Basic tools", included: true },
      { text: "OCR & AI tools", included: false },
      { text: "Batch processing", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For power users",
    monthlyPrice: 9,
    yearlyPrice: 7,
    priceNote: "Billed monthly or yearly",
    cta: "Go Pro",
    highlight: true,
    features: [
      { text: "500 MB file limit", included: true },
      { text: "Unlimited conversions", included: true },
      { text: "OCR & AI tools", included: true },
      { text: "No watermark", included: true },
      { text: "Batch processing", included: true },
      { text: "Priority processing", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For teams",
    monthlyPrice: 24,
    yearlyPrice: 19,
    priceNote: "Per user / month",
    cta: "Start trial",
    highlight: false,
    features: [
      { text: "Team workspace", included: true },
      { text: "API access", included: true },
      { text: "Priority processing", included: true },
      { text: "Advanced security", included: true },
      { text: "Audit logs", included: true },
      { text: "SSO support", included: true },
      { text: "Dedicated infrastructure", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For organizations",
    monthlyPrice: -1,
    yearlyPrice: -1,
    priceNote: "Custom pricing",
    cta: "Contact sales",
    highlight: false,
    features: [
      { text: "Dedicated infrastructure", included: true },
      { text: "Unlimited storage", included: true },
      { text: "Custom branding", included: true },
      { text: "SLA & support", included: true },
      { text: "Private API", included: true },
      { text: "On-premises deployment", included: true },
      { text: "Everything in Business", included: true },
    ],
  },
];
