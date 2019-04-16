const gameMethods = require('../utils/modelMethods');
const checkExit = require('../utils/checkExit');
const constants = require('../constants');

const exitGame = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    let accessToken = req.cookies.accessToken;
    let game;
    try {
        game = await gameMethods.findOne(gameToken);
        if (!game) throw {}
    } catch (e) {
        next(e)
    }
    if (game.state === constants.ready) {
        await gameMethods.deleteOne(gameToken)
    } else if (game.state === constants.play) {
        const { winner, state, viewers } = checkExit(accessToken, game);
        await gameMethods.updateOne(gameToken, {
            gameResult: winner,
            state,
            viewers
        })
    }
    let result = {
        "status": "ok",
        "code": 0
    };
    res.cookie("accessToken", "");
    res.cookie("gameToken", "");
    res.json(result);
};

module.exports = exitGame;