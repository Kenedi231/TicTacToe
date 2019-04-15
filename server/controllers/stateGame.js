const Game = require('../models/game');

const stateGame = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    if (gameToken !== "") {
        let accessToken = req.cookies.accessToken;
        let youTurn = false;
        let game;
        try {
            game = await Game.findOne({gameToken: gameToken});
        } catch (e) {
            next({"status": "error", code: 400, "message": "Game not found"})
        }
        if (game !== null) {
            if (game.first === accessToken && game.step === "owner") {
                youTurn = true;
            } else if (game.second === accessToken && game.step === "opponent") {
                youTurn = true;
            } else {
                youTurn = false;
            }
            let result = {
                "status": "ok",
                code: 0,
                "step": game.step,
                "youTurn": youTurn,
                "owner": game.owner,
                "opponent": game.opponent,
                "gameDuration": game.gameDuration,
                "field": game.field,
                "winner": game.gameResult
            };
            res.json(result);
        } else {
            next({"status": "error", code: 400, "message": "Game not found"})
        }
    } else {
        next({"status": "error", code: 400, "message": "Game not found"})
    }
};

module.exports = stateGame;