const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

const ipTimestamps = new Map<string, number[]>();

// Periodic cleanup to prevent memory leaks
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of ipTimestamps) {
      const valid = timestamps.filter((t) => now - t < WINDOW_MS);
      if (valid.length === 0) {
        ipTimestamps.delete(ip);
      } else {
        ipTimestamps.set(ip, valid);
      }
    }
    if (ipTimestamps.size === 0 && cleanupTimer) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
  }, CLEANUP_INTERVAL_MS);
  // Allow the process to exit naturally
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfterMs?: number;
} {
  ensureCleanup();

  const now = Date.now();
  const timestamps = (ipTimestamps.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - oldest) };
  }

  timestamps.push(now);
  ipTimestamps.set(ip, timestamps);
  return { allowed: true };
}
