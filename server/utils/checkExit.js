const constants = require('../constants');

function checkExit(accessToken, game) {
    let winner = game.gameResult;
    let state = game.state;
    let viewers = game.viewers;
    if (accessToken === game.firstToken) {
        winner = constants.opponent;
        state = constants.done
    } else if (accessToken === game.secondToken) {
        winner = constants.owner;
        state = constants.done;
    } else {
        viewers.splice(viewers.indexOf(accessToken), 1);
    }
    return {winner, state, viewers}
}

module.exports = checkExit;