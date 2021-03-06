const gameMethods = require('../utils/modelMethods');
const checkStep = require('../utils/checkStep');
const constants = require('../constants');

const doStep = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    let accessToken = req.cookies.accessToken;
    let game = await gameMethods.findOne(gameToken);
    if (game.deleted) {
        next({"status": "error", "code": 403, "message": "Game is deleted!"})
    }
    if (game.state !== constants.play) {
        let result = {
            "status": "warning",
            "code": 400
        };
        res.json(result);
    }
    const {step, field, state, gameResult} = await checkStep(accessToken, game, req.body);
    const { startGame } = game.toObject();
    let now = +(Date.now());
    let gameDuration = now - startGame;
    let newGame = await gameMethods.updateOne(gameToken, {
        step,
        field,
        state,
        gameResult,
        gameDuration,
        lastUpdate: Date.now()
    });
    let result = {
        "status": "ok",
        "code": 0
    };
    res.json(result);
};

module.exports = doStep;