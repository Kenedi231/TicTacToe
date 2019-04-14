const Game = require('../models/game');

const stateGame = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    console.log(gameToken);
    if (gameToken !== "") {
        let game;
        try {
            game = await Game.findOne({gameToken: gameToken});
        } catch (e) {
            next({"status": "error", code: 400, "message": "Game not found"})
        }
        let result = {
            "status": "ok",
            code: 0,
            "youTurn": true,
            "owner": game.owner,
            "opponent": game.opponent,
            "gameDuration": game.gameDuration,
            "field": game.field,
            "winner": game.gameResult === "owner" ? game.owner : game.gameResult === "opponent" ? game.opponent : game.gameResult === "draw" ? "draw" : ""
        };
        res.json(result);
    } else {
        next({"status": "error", code: 400, "message": "Game not found"})
    }
};

module.exports = stateGame;