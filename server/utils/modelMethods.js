const Game = require('../models/game');

const gameMethods = {
    findOne: async function(gameToken) {
        return await Game.findOne({ gameToken });

    },
    updateOne: async function(gameToken, options) {
        return await Game.updateOne({ gameToken }, options)
    },
    deleteOne: async function(gameToken) {
        return await Game.deleteOne({ gameToken })
    },
    find: async function(coll) {
        return await Game.find({coll})
    }
};

module.exports = gameMethods;