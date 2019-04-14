
async function checkField(field) {
    let res = true;
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === '?') {
                res = false;
                break;
            }
        }
        if (!res) {
            break;
        }
    }
    return res;
}

module.exports = checkField;