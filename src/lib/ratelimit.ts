import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// In-memory rate limiter for development or if Upstash is not configured
class InMemoryRatelimit {
  private requests: Map<string, number[]> = new Map();

  async limit(identifier: string): Promise<{ success: boolean; reset: number }> {
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 5;

    const requests = this.requests.get(identifier) || [];
    const recentRequests = requests.filter((time) => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      const oldestRequest = Math.min(...recentRequests);
      return {
        success: false,
        reset: oldestRequest + windowMs,
      };
    }

    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    // Cleanup old entries
    if (this.requests.size > 1000) {
      const cutoff = now - windowMs;
      for (const [key, times] of this.requests.entries()) {
        if (times.every((t) => t < cutoff)) {
          this.requests.delete(key);
        }
      }
    }

    return {
      success: true,
      reset: now + windowMs,
    };
  }
}

// Create rate limiter instance
let ratelimit: Ratelimit | InMemoryRatelimit;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  // Production: Use Upstash Redis
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute
    analytics: true,
  });
} else {
  // Development: Use in-memory rate limiter
  ratelimit = new InMemoryRatelimit();
}

export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  reset: number;
}> {
  const result = await ratelimit.limit(identifier);
  return result;
}

// Specific rate limiters for different endpoints
export const loginRateLimit = (ip: string) => checkRateLimit(`login:${ip}`);
export const contactRateLimit = (ip: string) => checkRateLimit(`contact:${ip}`);
export const apiRateLimit = (ip: string) => checkRateLimit(`api:${ip}`);
