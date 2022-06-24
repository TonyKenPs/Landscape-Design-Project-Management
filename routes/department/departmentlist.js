const Department = require("../../models/Department");

module.exports = async (req, res) => {
  const Designlist = await Department.findAll().then((Departmentlist) => {
    // 转换为 json 字符串
    //console.log("All designs:", JSON.stringify(designs, null, 4));
    res.json(Departmentlist);
  });
};
