// Minimal in-process fixed-window limiter for the authentication endpoints.
// Intentionally dependency-free: there is no third-party package to audit, and
// the state never leaves the process.

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

const attempts = new Map();

// Drop expired buckets so the map cannot grow without bound.
const sweeper = setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of attempts) {
    if (bucket.resetAt <= now) {
      attempts.delete(key);
    }
  }
}, WINDOW_MS);
if (typeof sweeper.unref === "function") {
  sweeper.unref();
}

function authRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || (req.socket && req.socket.remoteAddress) || "unknown";
  const bucket = attempts.get(key);

  if (!bucket || bucket.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  bucket.count += 1;
  if (bucket.count > MAX_ATTEMPTS) {
    const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({
      data: null,
      meta: { msg: "尝试次数过多，请稍后再试", status: 429 },
    });
  }

  return next();
}

module.exports = { authRateLimit, WINDOW_MS, MAX_ATTEMPTS };
