const Game = require('../models/game');

const listGames = async function (req, res, next) {
    let gamesBD = await Game.find({'coll': "games"});
    let games = gamesBD.map((game) => {
        const {
            gameToken,
            owner,
            opponent,
            size,
            gameDuration,
            gameResult,
            state
        } = game.toObject();
        return {gameToken, owner, opponent, size, gameDuration,
            gameResult, state }
    });
    let result = {
        "status": "ok",
        "code": 0,
        games: games
    };
    res.json(result);
};

module.exports = listGames;