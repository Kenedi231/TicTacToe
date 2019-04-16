const Game = require('../models/game');
const gameMethods = require('./modelMethods');

function deleteOldGame() {
    let games = Game.find({deleted: true});
    games.map( (game) => {
        gameMethods.deleteOne(game.gameToken);
    });
    console.log("cron delete game!");
}

module.exports = deleteOldGame;