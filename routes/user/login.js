const User = require("../../models/User");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  //查询页面传回数据
  const { username, password } = req.body;
  //根据数据查人
  const findUser = await User.findOne({
    where: {
      username,
    },
  });
  if (!findUser) {
    res.status(400).send({
      data: "user not found!",
      meta: {
        msg: "user not found!",
        status: 400,
      },
    });
    return;
  }
  if (username != findUser.username || password != findUser.password) {
    res.status(400).send({
      data: "用户信息错误",
      meta: {
        msg: "用户信息错误",
        status: 400,
      },
    });
    return;
  }
  const token = jwt.sign({ username }, "tonyken");
  res.status(200).send({
    data: {
      username: username,
      identity:findUser.identity,
      token,
    },
    meta: {
      msg: "Logined!",
      status: 200,
    },
  });
};
