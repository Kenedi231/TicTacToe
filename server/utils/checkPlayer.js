const constants = require('../constants');

function checkPlayer(accessToken, game) {
    let youFirstPlayer = game.firstToken === accessToken;
    let youSecondPlayer = game.secondToken === accessToken;
    let firstPlayer = youFirstPlayer && game.step === constants.owner;
    let secondPlayer = youSecondPlayer && !firstPlayer;
    let youViewer = !(youFirstPlayer || youSecondPlayer);
    let youTurn = firstPlayer || secondPlayer;
    return { youViewer, youTurn};
}

module.exports = checkPlayer;