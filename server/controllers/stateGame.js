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
    } catch (e) {
        next(e)
    }
    const {youViewer, youTurn} = checkPlayer(accessToken, game);
    const { step, owner, opponent, gameDuration, field, gameResult} = game.toObject();
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
        "winner": gameResult
    };
    res.json(result);
};

module.exports = stateGame;