/**
 * Sliding-window in-memory rate limiter.
 *
 * Suitable for development and single-instance deployments. Replace the store
 * with Redis (ioredis + BullMQ) when scaling horizontally — see `workers/`.
 */

interface Bucket {
  hits: number[];
}

export class RateLimiter {
  private buckets = new Map<string, Bucket>();

  constructor(
    private limit: number,
    private windowMs: number,
  ) {}

  /**
   * @returns `true` if the key is within its allowed limit.
   */
  check(key: string): boolean {
    const now = Date.now();
    const bucket = this.buckets.get(key) ?? { hits: [] };
    bucket.hits = bucket.hits.filter((t) => now - t < this.windowMs);
    if (bucket.hits.length >= this.limit) {
      this.buckets.set(key, bucket);
      return false;
    }
    bucket.hits.push(now);
    this.buckets.set(key, bucket);
    return true;
  }

  reset(key: string): void {
    this.buckets.delete(key);
  }
}

export const conversionsLimiter = new RateLimiter(
  Number(process.env.RATE_LIMIT_CONVERSIONS ?? 5),
  60 * 60 * 1000,
);

export const apiLimiter = new RateLimiter(
  Number(process.env.RATE_LIMIT_API ?? 60),
  60 * 1000,
);
