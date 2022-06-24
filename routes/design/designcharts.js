const Design = require("../../models/Design");

module.exports = async (req, res) => {
  const DesignCharts = await Design.findAll({
    attributes: ["name", ["budget", "value"]],
  }).then((DesignCharts) => {
    let designsum = JSON.parse(JSON.stringify(DesignCharts));
    res.json(DesignCharts);
  });
};
