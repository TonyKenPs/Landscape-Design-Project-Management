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
        data: {
            id: req.auth?.id,
            username: req.auth?.username,
            identity: req.auth?.identity
        },
        meta: { msg: "success", status: 200 }
    });
})

module.exports = router;