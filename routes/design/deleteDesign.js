const Design = require("../../models/Design");

//数据导出
module.exports = async (req, res) => {
  //接受前端发送的设计项目信息
  const { id } = req.body;
  //根据传来数据查询重复设计
  const model = await Design.destroy({ where: { id: id } });
  res.status(201).send({ data: model, meta: { msg: "删除成功", status: 201 } });
};
