// @login
const express = require("express");
const router = express.Router();


//router 路径为 api/users/test
//res msg
//@access public
router.get("/test", (req, res) => {
    res.json({
        msg: "logined"
    })
})

router.get("/current", (req, res) => {
    res.json({
        msg: "success"
    });
})

module.exports = router;