const Document = require("../../models/Document");

module.exports = async (req, res) => {
  const Documentlist = await Document.findAll().then((Doclist) => {
    // 转换为 json 字符串
    //console.log("All designs:", JSON.stringify(designs, null, 4));
    res.json(Doclist);
  });
};
