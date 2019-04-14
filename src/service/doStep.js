
function doStep(row, col) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/games/do_step', false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    let body = JSON.stringify({
        row: row,
        col: col
    });
    xhr.send(body);
    return JSON.parse(xhr.responseText);
}

export default doStep;