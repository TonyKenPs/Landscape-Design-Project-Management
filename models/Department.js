const { Sequelize, sequelize } = require("./init");

//创建模式 新建department表
const Department = sequelize.define("departments", {
  department_id: {
    type: Sequelize.INTEGER, //类型
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  budget: {
    type: Sequelize.INTEGER,

    allowNull: false,
  },
});

Department.sync().then(() => {
  console.log("Department model sync success!");
});
module.exports = Department;
