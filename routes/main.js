const express = require("express");

const main = express.Router();
main.get("/", (req, res) => {
  res.send("main.ok");
});
main.post("/register", require("./user/register"));
main.post("/logincheck", require("./user/login"));
main.get("/getuser", require("./user/findUser"));

main.post("/designlist", require("./design/design"));
main.get("/designlist", require("./design/design"));
main.post("/adddesign", require("./design/addDesign"));
main.post("/editdesign", require("./design/editDesign"));
main.post("/deletedesign", require("./design/deleteDesign"));
main.get("/designchartdata", require("./design/designcharts"));

main.post("/budget", require("./department/budget"));
main.get("/departmentlist", require("./department/departmentlist"));
main.get("/getdepartmentbudget", require("./department/departmentbudget"));
main.post("/adddepartment", require("./department/adddepartment"));
main.post("/editdepartment", require("./department/editdepartment"));
main.post("/deletedepartment", require("./department/deletedepartment"));
main.get("/budgetlist", require("./department/totalbudget"));

main.get("/getdoc", require("./document/documentlist"));

module.exports = main;
