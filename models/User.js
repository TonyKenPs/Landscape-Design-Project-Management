const { Sequelize, sequelize } = require("./init");

//创建模式 新建users表
const User = sequelize.define("users", {
  username: {
    type: Sequelize.STRING, //类型
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,

    allowNull: false,
  },
  department: {
    type: Sequelize.INTEGER,

    allowNull: false,
  },
  phone: {
    type: Sequelize.INTEGER,

    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,

    allowNull: false,
  },
  identity: {
    type: Sequelize.STRING,

    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,

    allowNull: false,
  },
});

User.sync().then(() => {
  console.log("User model sync success!");
});
module.exports = User;
