const constants = require("../constants");

const Game = require('../models/game');
const checkPlayer = require('../utils/checkPlayer');

function makeMessage() {
    return {"status": "error", code: 400, "message": "Game not found"}
}

const stateGame = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    if (!gameToken) {
        return next(makeMessage());
    }
    let accessToken = req.cookies.accessToken;
    let game;
    try {
        game = await Game.findOne({ gameToken });
        if(!game) throw {};
        if(game.deleted) {
            next(makeMessage())
        }
    } catch (e) {
        next(makeMessage())
    }
    const {youViewer, youTurn} = checkPlayer(accessToken, game);
    let { step, owner, opponent, field, gameDuration, gameResult, state, startGame} = game.toObject();
    if (state === constants.play) {
        gameDuration = +(Date.now()) - startGame;
    }
    const result = {
        "status": "ok",
        "code": 0,
        youTurn,
        youViewer,
        step,
        owner,
        opponent,
        gameDuration,
        field,
        "winner": gameResult,
        state
    };
    res.json(result);
};

module.exports = stateGame;