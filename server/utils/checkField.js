const lineCheck = require('./lineCheck');
const crossCheck = require('./crossCheck');
const constants = require('../constants');

function returnInfo(state, result) {
    return {
        state: state,
        gameResult: result
    }
}

async function checkField(field, game) {
    let res = true;
    let whoH = lineCheck(field);
    if (whoH === "") {
        whoH = lineCheck(field, true);
    }
    if (whoH === "") {
        whoH = crossCheck(field);
    }
    if (whoH === constants.x ) {
        return returnInfo(constants.done, constants.owner)
    } else if (whoH === constants.o) {
        return returnInfo(constants.done, constants.opponent)
    }
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === '?') {
                res = false;
                break
            }
        }
        if (!res) {
            break
        }
    }
    if (res) {
        return returnInfo(constants.done, constants.draw)
    }
    return returnInfo(game.state, game.gameResult)
}

module.exports = checkField;