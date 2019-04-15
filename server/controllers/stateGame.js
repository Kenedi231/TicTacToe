const Game = require('../models/game');

const owner = "owner";
const opponent = "opponent";

function makeMessage() {
    return {"status": "error", code: 400, "message": "Game not found"}
}

const stateGame = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    if (gameToken !== "") {
        let accessToken = req.cookies.accessToken;
        let youTurn = false;
        let youViewer = false;
        let game;
        try {
            game = await Game.findOne({gameToken: gameToken});
        } catch (e) {
            next(makeMessage())
        }
        if (game !== null) {
            let youFirstPlayer = game.firstToken === accessToken;
            let youSecondPlayer = game.secondToken === accessToken;
            let firstPlayer = youFirstPlayer && game.step === owner;
            let secondPlayer = youSecondPlayer && game.step === opponent;
            youTurn = firstPlayer || secondPlayer;
            youViewer = !(youFirstPlayer || youSecondPlayer);
            let result = {
                "status": "ok",
                "code": 0,
                "youViewer": youViewer,
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
            next(makeMessage())
        }
    } else {
        next(makeMessage())
    }
};

module.exports = stateGame;