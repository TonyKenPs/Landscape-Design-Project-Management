const Department = require("../../models/Department");

module.exports = async (req, res) => {
  const DepartmentCharts = await Department.findAll({
    attributes: ["name", ["budget", "value"]],
  }).then((DepartmentCharts) => {
    res.json(DepartmentCharts);
  });
};
