// Rate limiting for the Express routes.
//
// express-rate-limit is used instead of a hand-rolled limiter: it is the
// middleware CodeQL recognises for js/missing-rate-limiting, and it handles
// IPv6, standard rate-limit headers and memory-store expiry correctly.

const { rateLimit } = require("express-rate-limit");

const WINDOW_MS = 15 * 60 * 1000;

function buildLimiter(limit, message) {
  return rateLimit({
    windowMs: WINDOW_MS,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { data: null, meta: { msg: message, status: 429 } },
  });
}

// Broad protection for every route.
const apiLimiter = buildLimiter(300, "请求过于频繁，请稍后再试");

// Stricter budget for the unauthenticated entry points, so credential
// stuffing and mass registration stay expensive.
const authLimiter = buildLimiter(10, "尝试次数过多，请稍后再试");

module.exports = { apiLimiter, authLimiter, WINDOW_MS };
