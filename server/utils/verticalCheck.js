const mark = '?';

function verticalCheck(field) {
    let who = "";
    for (let i = 0; i < field.length; i++) {
        let prev = "";
        for (let j = 0; j < field.length; j++) {
            if (prev === "") {
                prev = field[j][i]
            } else if (prev === field[j][i] && prev !== mark) {
                prev = field[j][i];
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
    return who;
}

module.exports = verticalCheck;