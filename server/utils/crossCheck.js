const mark = '?';

function crossCheck(field) {
    let prev = "";
    for (let  i = 0; i < field.length; i++) {
        if (prev === "") {
            prev = field[i][i];
        } else if (prev === field[i][i] && prev !== mark) {
            prev = field[i][i];
        } else {
            prev = "";
            break;
        }
    }
    if (prev !== "") {
        return prev;
    }
    for (let i = 0, j = field.length - 1; i < field.length, j >= 0; i++, j--) {
        prev = "";
        if (prev === "") {
            prev = field[i][j];
        } else if (prev === field[i][j] && prev !== mark) {
            prev = field[i][j];
        } else {
            prev = "";
            break;
        }
        if (prev !== "") {
            return prev;
        }
    }
    return "";
}

module.exports = crossCheck;