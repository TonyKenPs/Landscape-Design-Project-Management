const Department = require("../../models/Department");

//数据导出
module.exports = async (req, res) => {
  //接受前端发送的设计项目信息
  const { name, department_id, budget, id } = req.body;
  //根据传来数据查询重复设计
  const model = await Department.update(
    { name, department_id, budget },
    { where: { id: id } }
  );
  res.status(201).send({ data: model, meta: { msg: "修改成功", status: 201 } });
};
