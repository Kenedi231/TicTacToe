
function replaceAt(str, index, at) {
    let newStr = str;
    let arr = newStr.split('');
    arr[index] = at;
    newStr = arr.join('');
    return newStr;
}

module.exports = replaceAt;