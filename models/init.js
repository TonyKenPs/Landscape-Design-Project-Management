const Sequelize = require("sequelize");
const env = require("../config/env");

const sequelize = new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
  host: "127.0.0.1", //数据库所在服务器
  dialect: "mysql", //数据库类型
  port: "3306", //数据库远端端口
  pool: {
    max: 10,
    min: 1,
    acquire: 60000,
    idle: 30000,
  },
  host: env.dbHost,
  port: env.dbPort,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB connect error, reason:" + err);
  });

module.exports = {
  Sequelize,
  sequelize,
};
