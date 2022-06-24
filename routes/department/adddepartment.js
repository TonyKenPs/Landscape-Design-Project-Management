const Department = require("../../models/Department");

//数据导出
module.exports = async (req, res) => {
  //接受前端发送的设计项目信息
  const { name, department_id, budget } = req.body;
  //根据传来数据查询重复设计
  const model = await Department.findOne({ where: { name } });
  //先判断是否已存在重复设计
  if (model) {
    res.status(400).send({ data: null, msg: "此部门已存在", status: 400 });
  } else {
    //创建新设计项目
    const AddDepartment = await Department.create({
      name,
      department_id,
      budget,
    });
    res
      .status(201)
      .send({ data: AddDepartment, meta: { msg: "创建成功", status: 201 } });
  }
};
