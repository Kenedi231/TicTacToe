const makeToken = require('./makeToken');
const Game = require('../models/game');

const joinGame = async function (req, res, next) {
    let { gameToken, userName } = req.body;
    let accessToken = makeToken(12);
    let game = await Game.findOne({ gameToken: gameToken });
    let newGame;
    if (game.opponent === "") {
        newGame = await Game.updateOne({ gameToken: gameToken}, {
            opponent: userName,
            second: accessToken,
            state: "playing"
        })
    } else {
        let viewers = game.viewers;
        viewers.push(accessToken);
        newGame = await Game.updateOne({ gameToken: gameToken}, {
            viewers: viewers
        })
    }
    let result = {
        "status": "ok",
        code: 0,
        "accessToken": accessToken
    };

    res.cookie("userName", userName);
    res.cookie("accessToken", accessToken);
    res.cookie("gameToken", gameToken);
    res.json(result);
};

module.exports = joinGame;