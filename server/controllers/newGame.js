const makeToken = require('./makeToken');
const Game = require('../models/game');

const newGame = async function (req, res, next) {
    let { userName, size } = req.body;
    let accessToken = await makeToken(12);
    let gameToken = await makeToken(6);
    let game;
    try {
        game = await Game.create({
            gameToken: gameToken,
            owner: userName,
            first: accessToken,
            opponent: "",
            second: "",
            size: +size,
            gameDuration: 0,
            gameResult: ""
        })
    } catch (e) {
        next({ status: "error", code: 400, message: "Could not create game"})
    }
    let result = {
        "status": "ok",
        "code": 0,
        "accessToken": accessToken,
        "gameToken": gameToken
    };

    res.cookie("userName", userName);
    res.cookie("accessToken", accessToken);
    res.cookie("gameToken", gameToken);
    res.json(result);
};

module.exports = newGame;