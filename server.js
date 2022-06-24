const express = require("express");
const app = express();
//导出接收 post 请求数据模块
const bodyParser = require("body-parser");
//const passport = require("passport");
const jwt = require("jsonwebtoken");

//user.js
const router = require("./routes/api/users");
const main = require("./routes/main");
const search = require("./routes/api/search");

//链接数据库模型
require("./models/init");
require("./models/User");
require("./models/Design");
require("./models/Department");
require("./models/Budget");
require("./models/Document");
require("./models/News");

//MySQL DB Config 数据库连接地址
//const db = require("./config/keys").mysqlURI;

//user body-parser
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//passport初始化
//app.use(passport.initialize());
//require("./config/passport")(passport)

//测试主页
app.get("/", (req, res) => {
  res.send("Success");
});

//使用router匹配地址/api/users
app.use("/api/users", router);
app.use("/api/login", (req, res, next) => {
  if (req.url == "/logincheck" || req.url == "/register") {
    next();
    return;
  }
  //获取token
  const token = String(req.headers.authorization);
  //解析token数据
  const username = jwt.decode(token, "tonyken");
  if (token == "undefined" || username == null) {
    res.status(400).send({
      data: null,
      meta: {
        msg: "token error",
        status: 400,
      },
    });
  }
  next();
});
app.use("/api/login", main);
app.use("/api/design", main);
app.use("/api/department", main);
app.use("/api/user", main);
app.use("/api/search", search);
app.use("/api/document", main);

const port = process.env.PORT || 34586; //环境运行端口设置34586

app.listen(port, () => {
  console.log("server running on port %d", port); //打印当前服务器运行端口
});

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  else next();
});
