const Budget = require("../../models/Budget");

module.exports = async (req, res) => {
  const Budgetlist = await Budget.findAll().then((BudgetDetail) => {
    // 转换为 json 字符串
    //console.log("All designs:", JSON.stringify(designs, null, 4));
    res.json(BudgetDetail);
  });
};
