const express = require('express');
const path = require("path");

const router = express.Router();

router.get("/", function (req, res) {
    if (req.cookies.gameToken === undefined) {
        res.cookie("gameToken", "");
    }
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;