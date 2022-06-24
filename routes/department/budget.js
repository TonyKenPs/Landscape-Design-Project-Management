const Budget = require("../../models/Budget");
const Department = require("../../models/Department");
const Design = require("../../models/Design");
const { Sequelize, sequelize } = require("../../models/init");

module.exports = async (req, res) => {
  const DepartmentBudget = await Department.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("budget")), "total_budget"],
    ],
  });
  const DesignBudget = await Design.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("budget")), "total_design_budget"],
    ],
  });
  //先转换一次清除多余数据，转换为JSON字符串
  let sum = JSON.stringify(DepartmentBudget);
  let designsum = JSON.stringify(DesignBudget);
  //重新转换为JSON模型
  let total = JSON.parse(sum);
  let designtotal = JSON.parse(designsum);
  //计算剩余预算
  let remaining = total[0].total_budget - designtotal[0].total_design_budget;
  console.log(designtotal[0].total_design_budget);
  const budget = await Budget.update(
    {
      total_budget: total[0].total_budget,
      remaining_budget: remaining,
    },
    {
      where: {
        id: 1,
      },
    }
  );
  res.status(200);
};
