const jwt = require("jsonwebtoken");
const User = require("../models/User");
const env = require("../config/env");

async function requireAuth(req, res, next) {
  const header = req.get("authorization") || "";
  const match = /^Bearer\s+(.+)$/i.exec(header);

  if (!match) {
    return res.status(401).json({ meta: { msg: "Authentication required", status: 401 } });
  }

  try {
    const payload = jwt.verify(match[1], env.jwtSecret, { algorithms: ["HS256"] });
    const user = await User.findByPk(payload.sub, { attributes: ["id", "username", "identity"] });

    if (!user) {
      return res.status(401).json({ meta: { msg: "Invalid token", status: 401 } });
    }

    req.auth = { id: user.id, username: user.username, identity: user.identity };
    return next();
  } catch (error) {
    return res.status(401).json({ meta: { msg: "Invalid or expired token", status: 401 } });
  }
}

function requireAdmin(req, res, next) {
  if (req.auth?.identity !== "admin") {
    return res.status(403).json({ meta: { msg: "Administrator access required", status: 403 } });
  }
  return next();
}

module.exports = { requireAuth, requireAdmin };
