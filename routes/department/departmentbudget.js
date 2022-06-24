const Design = require("../../models/Design");
const { Sequelize, sequelize } = require("../../models/init");

module.exports = async (req, res) => {
  const DesignBudget = await Design.findAll({
    attributes: [
      "id",
      "department_id",
      [sequelize.fn("SUM", sequelize.col("budget")), "total_budget"],
    ],
    group: "department_id",
  }).then((DesignBudget) => {
    
    // 转换为 json 字符串
    //console.log("All designs:", JSON.stringify(designs, null, 4));
    res.json(DesignBudget);
  });
};
