const mark = '?';

function horizontalCheck(field) {
    let who = "";
    for (let i = 0; i < field.length; i++) {
        let prev = "";
        for (let j = 0; j < field[i].length; j++) {
            if (prev === "") {
                prev = field[i][j]
            } else if (prev === field[i][j] && prev !== mark) {
                prev = field[i][j];
            } else {
                prev = "";
                break;
            }
        }
        if (prev !== "") {
            who = prev;
            break
        }
    }
    return who
}

module.exports = horizontalCheck;