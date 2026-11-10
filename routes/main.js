const express = require("express");
const { requireAdmin, requireAuth } = require("../middleware/auth");

const main = express.Router();
main.get("/", (req, res) => {
  res.send("main.ok");
});
main.post("/register", require("./user/register"));
main.post("/logincheck", require("./user/login"));
main.get("/getuser", requireAuth, require("./user/findUser"));

main.post("/designlist", requireAuth, require("./design/design"));
main.get("/designlist", requireAuth, require("./design/design"));
main.post("/adddesign", requireAuth, requireAdmin, require("./design/addDesign"));
main.post("/editdesign", requireAuth, requireAdmin, require("./design/editDesign"));
main.post("/deletedesign", requireAuth, requireAdmin, require("./design/deleteDesign"));
main.get("/designchartdata", requireAuth, require("./design/designcharts"));

main.post("/budget", requireAuth, requireAdmin, require("./department/budget"));
main.get("/departmentlist", requireAuth, require("./department/departmentlist"));
main.get("/getdepartmentbudget", requireAuth, require("./department/departmentbudget"));
main.post("/adddepartment", requireAuth, requireAdmin, require("./department/adddepartment"));
main.post("/editdepartment", requireAuth, requireAdmin, require("./department/editdepartment"));
main.post("/deletedepartment", requireAuth, requireAdmin, require("./department/deletedepartment"));
main.get("/budgetlist", requireAuth, require("./department/totalbudget"));

main.get("/getdoc", requireAuth, require("./document/documentlist"));

module.exports = main;
