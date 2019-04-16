const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constants = require('../constants');

const gameSchema = new Schema({
    gameToken: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String
    },
    firstToken: {
        type: String,
    },
    secondToken: {
        type: String,
        default: ""
    },
    opponent: {
        type: String,
        default: ""
    },
    size: {
        type: Number,
        default: 3
    },
    gameDuration: {
        type: Number,
        default: 0
    },
    gameResult: {
        type: String,
        default: "" // Owner Opponent Draw
    },
    field: {
        type: Array,
        default: [
            "???",
            "???",
            "???"
        ]
    },
    step: {
        type: String,
        default: constants.owner // Owner Opponent
    },
    viewers: {
        type: Array,
        default: []
    },
    state: {
        type: String,
        default: constants.ready // Ready Playing Done
    },
    coll: {
        type: String,
        default: constants.coll
    }
});

module.exports = mongoose.model('Game', gameSchema);