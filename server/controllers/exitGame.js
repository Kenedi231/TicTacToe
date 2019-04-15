const Game = require('../models/game');

const ready = "ready";
const play = "playing";
const done = "done";

const owner = "owner";
const opponent = "opponent";

const exitGame = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    let accessToken = req.cookies.accessToken;
    let game;
    try {
        game = await Game.findOne({gameToken: gameToken});
    } catch (e) {
        next({
            "status": "error",
            "code": "401",
            "message": "Ops"
        })
    }
    if (game.state === ready) {
        await Game.deleteOne({gameToken: gameToken});
    } else if (game.state === play) {
        let winner = game.gameResult;
        let state = game.state;
        let viewers = game.viewers;
        if (accessToken === game.firstToken) {
            winner = opponent;
            state = done
        } else if (accessToken === game.secondToken) {
            winner = owner;
            state = done;
        } else {
            viewers.splice(viewers.indexOf(accessToken), 1);
        }
        await Game.updateOne({ gameToken: gameToken}, {
            gameResult: winner,
            state: state,
            viewers: viewers
        })
    }
    let result = {
        "status": "ok",
        code: 0
    };
    res.cookie("accessToken", "");
    res.cookie("gameToken", "");
    res.json(result);
};

module.exports = exitGame;