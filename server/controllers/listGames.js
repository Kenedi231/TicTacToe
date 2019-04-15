const Game = require('../models/game');

const listGames = async function (req, res, next) {
    let Games = await Game.find({'coll': "games"});
    let games = [];
    for (let i = 0; i < Games.length; i++) {
        games[i] = {};
        games[i].gameToken = Games[i].gameToken;
        games[i].owner = Games[i].owner;
        games[i].opponent = Games[i].opponent;
        games[i].size = Games[i].size;
        games[i].gameDuration = Games[i].gameDuration;
        games[i].gameResult = Games[i].gameResult;
        games[i].state = Games[i].state
    }
    let result = {
        "status": "ok",
        "code": 0,
        games: games
    };
    res.json(result);
};

module.exports = listGames;