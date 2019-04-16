const gameMethods = require('./modelMethods');
const Game = require('../models/game');
const constants = require('../constants');

const fiveMinutes = 300000;

async function deletedGame() {
    let coll = constants.coll;
    let games = await Game.find({coll});
    games.map( (game) => {
        let lastUpdate = +(game.lastUpdate);
        let now = Date.now();
        let result = now - lastUpdate;
        if (result >= fiveMinutes) {
            gameMethods.updateOne(game.gameToken, {
                deleted: true
            })
        }
    });
    console.log("cron change game visible");
}

module.exports = deletedGame;