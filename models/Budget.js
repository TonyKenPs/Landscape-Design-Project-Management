const { Sequelize, sequelize } = require("./init");

//创建模式 新建budget表
const Budget = sequelize.define("budget", {
  total_budget: {
    type: Sequelize.INTEGER, //类型
    allowNull: false,
  },
  remaining_budget: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

Budget.sync().then(() => {
  console.log("Budget model sync success!");
});
module.exports = Budget;
