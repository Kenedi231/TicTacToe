const horizontalCheck = require('./horizontalCheck');
const verticalCheck = require('./verticalCheck');
const crossCheck = require('./crossCheck');

const done = "done";


const x = 'x';
const o = 'o';
const owner = "owner";
const opponent = "opponent";
const draw = "draw";

function returnInfo(state, result) {
    return {
        state: state,
        gameResult: result
    }
}

async function checkField(field, game) {
    let res = true;
    let whoH = await horizontalCheck(field);
    if (whoH === "") {
        whoH = await verticalCheck(field);
    }
    if (whoH === "") {
        whoH = await crossCheck(field);
    }
    if (whoH === x ) {
        return returnInfo(done, owner)
    } else if (whoH === o) {
        return returnInfo(done, opponent)
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
        return returnInfo(done, draw)
    }
    return returnInfo(game.state, game.gameResult)
}

module.exports = checkField;