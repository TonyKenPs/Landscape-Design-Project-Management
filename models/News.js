const { Sequelize, sequelize } = require("./init");

//创建模式 新建budget表
const News = sequelize.define("news", {
  tital: {
    type: Sequelize.STRING, //类型
    allowNull: false,
  },
  contain: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

News.sync().then(() => {
  console.log("News model sync success!");
});
module.exports = News;
