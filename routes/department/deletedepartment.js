const Department = require("../../models/Department");

//数据导出
module.exports = async (req, res) => {
  //接受前端发送的部门信息
  const { id } = req.body;
  //根据传来数据查询重复部门
  const model = await Department.destroy({ where: { id: id } });
  res.status(201).send({ data: model, meta: { msg: "删除成功", status: 201 } });
};
