const gameMethods = require('../utils/modelMethods');
const constants = require('../constants');

const listGames = async function (req, res, next) {
    let gamesBD = await gameMethods.find(constants.coll);
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