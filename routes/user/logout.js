const { clearSessionCookie } = require("../../lib/session");

// Idempotent: clearing an absent cookie is harmless, so no auth is required.
module.exports = (req, res) => {
  clearSessionCookie(res);
  res.status(200).send({
    data: null,
    meta: { msg: "Logged out", status: 200 },
  });
};
