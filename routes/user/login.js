const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const { hashPassword, isPasswordHash, verifyPassword } = require("../../lib/password");
const { setSessionCookie } = require("../../lib/session");

// One response for every failed login: the caller must not learn whether the
// username exists.
function sendInvalidCredentials(res) {
  return res.status(400).send({
    data: null,
    meta: { msg: "用户名或密码错误", status: 400 },
  });
}

module.exports = async (req, res) => {
  //查询页面传回数据
  const { username, password } = req.body || {};
  if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
    return res.status(400).send({
      data: null,
      meta: { msg: "请输入用户名和密码", status: 400 },
    });
  }
  //根据数据查人
  const findUser = await User.findOne({
    where: {
      username,
    },
  });
  if (!findUser) {
    // Spend comparable time to a real bcrypt compare so response timing does
    // not reveal whether the username exists.
    await hashPassword(password);
    return sendInvalidCredentials(res);
  }
  if (!(await verifyPassword(findUser.password, password))) {
    return sendInvalidCredentials(res);
  }
  if (!isPasswordHash(findUser.password)) {
    await findUser.update({ password: await hashPassword(password) });
  }
  const token = jwt.sign(
    { sub: findUser.id, username: findUser.username, identity: findUser.identity },
    env.jwtSecret,
    { algorithm: "HS256", expiresIn: env.jwtExpiresIn }
  );
  // The token only travels in the httpOnly cookie; the body carries just the
  // display data the UI needs.
  setSessionCookie(res, token, env.jwtExpiresIn);
  res.status(200).send({
    data: {
      username: findUser.username,
      name: findUser.name,
      identity: findUser.identity,
    },
    meta: {
      msg: "Logined!",
      status: 200,
    },
  });
};
