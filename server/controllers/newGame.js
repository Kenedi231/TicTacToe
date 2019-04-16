const makeToken = require('../utils/makeToken');
const Game = require('../models/game');

const newGame = async function (req, res, next) {
    let { userName, size } = req.body;
    let accessToken = makeToken(12);
    let gameToken = makeToken(6);
    let game;
    try {
        game = await Game.create({
            gameToken,
            owner: userName,
            firstToken: accessToken,
            size: +size,
        });
        if(!game) throw {}
    } catch (e) {
        next(e)
    }
    let result = {
        "status": "ok",
        "code": 0,
        accessToken,
        gameToken
    };

    res.cookie("userName", userName);
    res.cookie("accessToken", accessToken);
    res.cookie("gameToken", gameToken);
    res.json(result);
};

module.exports = newGame;