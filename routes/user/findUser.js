const User = require("../../models/User");

module.exports = async (req, res) => {
  const UserList = await User.findAll({
    attributes: ["id", "name", "identity","username"],
  }).then((Userlist) => {
    // 转换为 json 字符串
    //console.log("All designs:", JSON.stringify(designs, null, 4));
    res.json(Userlist);
  });
};
