/**
 * Sliding-window rate limiter kept in memory.
 *
 * On Vercel every serverless instance has its own memory, so this is a best-effort
 * first line of defence. Turnstile is the main protection; a shared store
 * (e.g. Upstash Redis) or a Vercel Firewall rule can be added later.
 */
export interface RateLimitRule {
  limit: number;
  windowMs: number;
}

export function createRateLimiter(rules: RateLimitRule[], maxKeys = 10_000) {
  const hits = new Map<string, number[]>();
  const longestWindow = Math.max(...rules.map((rule) => rule.windowMs));

  return function check(key: string, now = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((time) => now - time < longestWindow);
    const blocked = rules.some(
      (rule) => recent.filter((time) => now - time < rule.windowMs).length >= rule.limit,
    );

    if (!blocked) recent.push(now);
    hits.set(key, recent);

    // Keep memory bounded: drop the oldest keys when the map grows too large.
    if (hits.size > maxKeys) {
      const overflow = hits.size - maxKeys;
      let removed = 0;
      for (const oldKey of hits.keys()) {
        if (removed++ >= overflow) break;
        hits.delete(oldKey);
      }
    }

    return !blocked;
  };
}
