const replaceAt = require('./replaceAt');
const checkField = require('./checkField');
const constants = require('../constants');

async function checkStep(accessToken, game, body) {
    let stepFirstPlayer = game.step === constants.owner && accessToken === game.firstToken;
    let stepSecondPlayer = game.step === constants.opponent && accessToken === game.secondToken;
    let { state, step, field, gameResult } = game.toObject();
    if (stepFirstPlayer || stepSecondPlayer) {
        let {row, col} = body;
        if (field[row][col] === constants.mark) {
            let symbol = game.step === constants.owner ? constants.x : constants.o;
            step = symbol === constants.x ? constants.opponent : constants.owner;
            field[row] = await replaceAt(field[row], col, symbol);
            let info = await checkField(field, game);
            state = info.state;
            gameResult = info.gameResult;
        }
        return {
            step,
            field,
            state,
            gameResult
        }
    }
    return {
        step,
        field,
        state,
        gameResult
    }
}

module.exports = checkStep;