const Design = require("../../models/Design");

module.exports = async (req, res) => {
  const Designlist = await Design.findAll().then((designs) => {
    // 转换为 json 字符串
    //console.log("All designs:", JSON.stringify(designs, null, 4));
    res.json(designs);
  });
  //let designData = JSON.parse(JSON.stringify(Designlist));
  //res.json({ data: designData });
  //res
  // .status(201)
  // .send({ data: Designlist, meta: { msg: "ok", status: 201 } });
};
