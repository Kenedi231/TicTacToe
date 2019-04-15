
async function replaceAt(str, index, at) {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        if (i !== index) {
            newStr += str[i];
        } else {
            newStr += at;
        }
    }
    return newStr;
}

module.exports = replaceAt;