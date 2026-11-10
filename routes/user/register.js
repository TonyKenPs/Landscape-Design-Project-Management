const User = require("../../models/User");
const { hashPassword } = require("../../lib/password");

const MIN_PASSWORD_LENGTH = 8;
// bcrypt only looks at the first 72 bytes, so longer input is rejected instead
// of being silently truncated.
const MAX_PASSWORD_BYTES = 72;

function asText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function badRequest(res, msg) {
  return res.status(400).send({ data: null, meta: { msg, status: 400 } });
}

//数据导出
module.exports = async (req, res) => {
  //接受前端发送的用户信息
  const body = req.body || {};
  const username = asText(body.username);
  const password = typeof body.password === "string" ? body.password : "";
  const department = body.department;
  const phone = asText(body.phone);
  const gender = asText(body.gender);
  const name = asText(body.name);

  if (!username || !password || !department || !phone || !gender || !name) {
    return badRequest(res, "Missing required fields");
  }
  if (username.length < 2 || username.length > 30) {
    return badRequest(res, "用户名长度需在 2 到 30 个字符之间");
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return badRequest(res, `密码至少 ${MIN_PASSWORD_LENGTH} 位`);
  }
  if (Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES) {
    return badRequest(res, "密码过长");
  }
  if (name.length > 50 || phone.length > 20) {
    return badRequest(res, "姓名或电话过长");
  }

  //根据传来数据查询重复用户名
  const model = await User.findOne({ where: { username } });
  //先判断是否已存在重复用户名，避免重复注册
  if (model) {
    return badRequest(res, "用户名已存在");
  }

  //创建用户
  const createUser = await User.create({
    username,
    password: await hashPassword(password),
    department,
    phone,
    gender,
    name,
    identity: "staff",
  });
  createUser.password = undefined;
  res
    .status(201)
    .send({ data: createUser, meta: { msg: "创建成功", status: 201 } });
};
