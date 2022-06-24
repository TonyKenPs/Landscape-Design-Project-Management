const express = require("express");

const search = express.Router();
search.get("/", (req, res) => {
  res.send("main.ok");
});
search.post("/search", require("../searching/searching"));


module.exports = search;
