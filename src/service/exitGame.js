function exitGame() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/games/exit', false);
    xhr.send();
}

export default exitGame;