const constants = require('../constants');

function lineCheck(field, isVertical = false) {
    let who = "";
    for (let i = 0; i < field.length; i++) {
        let prev = "";
        for (let j = 0; j < field.length; j++) {
            let sym = isVertical ? field[j][i] : field[i][j];
            if (prev === "") {
                prev = sym
            } else if (prev === sym && prev !== constants.mark) {
                prev = sym
            } else {
                prev = "";
                break
            }
        }
        if (prev !== "") {
            who = prev;
            break
        }
    }
    return who;
}

module.exports = lineCheck;