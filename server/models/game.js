const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    gameToken: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String
    },
    first: {
        type: String,
    },
    second: {
        type: String
    },
    opponent: {
        type: String
    },
    size: {
        type: Number,
        default: 3
    },
    gameDuration: {
        type: Number
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
        type: String // Owner Opponent
    },
    viewers: {
        type: Array,
        default: []
    },
    state: {
        type: String,
        default: "ready" // Ready Playing Done
    },
    coll: {
        type: String,
        default: "games"
    }
});

module.exports = mongoose.model('Game', gameSchema);