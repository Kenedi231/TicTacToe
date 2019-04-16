import getInitPOST from "./getInitPOST";

function doStep(row, col) {
    let body = JSON.stringify({
        row: row,
        col: col
    });
    return fetch('/api/games/do_step', getInitPOST(body)).then(response => response.json())
}

export default doStep;