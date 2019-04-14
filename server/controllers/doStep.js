const Game = require('../models/game');

const doStep = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    let accessToken = req.cookies.accessToken;
    let game = await Game.findOne({ gameToken: gameToken });
    let { row, col } = req.body;
    let result = {
        "status": "ok",
        code: 0
    };
    res.json(result);
};

module.exports = doStep;