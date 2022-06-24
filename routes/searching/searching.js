const Design = require("../../models/Design");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { keyword } = req.body;
  let words = keyword.toString();
  console.log(keyword);
  const Designlist = await Design.findAll({
    where: {
      name: { [Op.substring]: [keyword] },
    },
  }).then((designs) => {
    res.json(designs);
  });
};
