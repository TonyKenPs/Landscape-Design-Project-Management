const { Sequelize, sequelize } = require("./init");

//创建模式 新建design表
const Design = sequelize.define("design", {
  name: {
    type: Sequelize.STRING, //类型
    allowNull: false,
  },
  designer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  department_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  budget: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  level: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Design.sync().then(() => {
  console.log("Design model sync success!");
});
module.exports = Design;
