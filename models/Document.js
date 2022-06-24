const { Sequelize, sequelize } = require("./init");

//创建模式 新建budget表
const Document = sequelize.define("document", {
  name: {
    type: Sequelize.STRING, //类型
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

Document.sync().then(() => {
  console.log("Document model sync success!");
});
module.exports = Document;
