const makeToken = require('../utils/makeToken');
const gameMethods = require('../utils/modelMethods');
const constants = require('../constants');

const joinGame = async function (req, res, next) {
    let { gameToken, userName } = req.body;
    let accessToken = makeToken(12);
    let game = await gameMethods.findOne(gameToken);
    if (game.deleted) {
        next({"status": "error", "code": 403, "message": "Game is deleted!"})
    }
    let newGame;
    if (game.opponent === "") {
        let time = Date.now();
        newGame = await gameMethods.updateOne(gameToken, {
            opponent: userName,
            secondToken: accessToken,
            state: constants.play,
            lastUpdate: time,
            startGame: +(time)
        })
    } else {
        let viewers = game.viewers;
        viewers.push(accessToken);
        newGame = await gameMethods.updateOne(gameToken, {viewers})
    }
    let result = {
        "status": "ok",
        code: 0,
        accessToken
    };
    res.cookie("userName", userName);
    res.cookie("accessToken", accessToken);
    res.cookie("gameToken", gameToken);
    res.json(result);
};

module.exports = joinGame;