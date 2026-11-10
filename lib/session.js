// Session cookie helpers.
//
// The JWT lives in an httpOnly cookie so page scripts cannot read it, and the
// login response never contains the token itself.

const SESSION_COOKIE = "session";
const DEFAULT_MAX_AGE_MS = 8 * 60 * 60 * 1000;

function readCookie(req, name) {
  const header = req.headers && req.headers.cookie;
  if (!header) {
    return "";
  }

  for (const part of header.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) {
      continue;
    }
    if (part.slice(0, separator).trim() !== name) {
      continue;
    }
    const raw = part.slice(separator + 1).trim();
    try {
      return decodeURIComponent(raw);
    } catch (error) {
      return raw;
    }
  }

  return "";
}

function readSessionToken(req) {
  return readCookie(req, SESSION_COOKIE);
}

// Accepts the jwt `expiresIn` forms: "8h", "30m", "7d", "900" (seconds).
function durationToMs(value, fallbackMs) {
  const text = String(value == null ? "" : value).trim();
  const match = /^(\d+)\s*(ms|s|m|h|d)?$/i.exec(text);
  if (!match) {
    return fallbackMs;
  }

  const amount = Number(match[1]);
  const unit = (match[2] || "ms").toLowerCase();
  const factor = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 }[unit];
  const result = amount * factor;
  return Number.isFinite(result) && result > 0 ? result : fallbackMs;
}

// COOKIE_SECURE=1 forces the Secure flag, COOKIE_SECURE=0 disables it, and
// otherwise it follows NODE_ENV. Only enable it when the app is served over
// HTTPS, or browsers will refuse to send the cookie back.
function isSecureCookie() {
  if (process.env.COOKIE_SECURE === "1") {
    return true;
  }
  if (process.env.COOKIE_SECURE === "0") {
    return false;
  }
  return process.env.NODE_ENV === "production";
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: isSecureCookie(),
  };
}

function setSessionCookie(res, token, expiresIn) {
  res.cookie(SESSION_COOKIE, token, {
    ...cookieOptions(),
    maxAge: durationToMs(expiresIn, DEFAULT_MAX_AGE_MS),
  });
}

function clearSessionCookie(res) {
  res.clearCookie(SESSION_COOKIE, cookieOptions());
}

module.exports = {
  SESSION_COOKIE,
  readCookie,
  readSessionToken,
  durationToMs,
  setSessionCookie,
  clearSessionCookie,
  isSecureCookie,
};
