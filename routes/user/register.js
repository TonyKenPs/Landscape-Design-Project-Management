const User = require("../../models/User");

//数据导出
module.exports = async (req, res) => {
  //接受前端发送的用户信息
  const { username, password, department, phone, gender, name, identity } =
    req.body;
  //根据传来数据查询重复用户名
  const model = await User.findOne({ where: { username } });
  console.log(req.body);
  //先判断是否已存在重复用户名，避免重复注册
  if (model) {
    console.log("ERROR")
    res.status(400).send({ data: null, msg: "用户名已存在", status: 400 });
  } else {
    //创建用户
    const CreateUser = await User.create({
      username,
      password,
      department,
      phone,
      gender,
      name,
      identity,
    });
    res
      .status(201)
      .send({ data: CreateUser, meta: { msg: "创建成功", status: 201 } });
  }
};
