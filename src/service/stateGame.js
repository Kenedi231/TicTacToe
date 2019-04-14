function stateGame() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/games/state', false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();
    return JSON.parse(xhr.responseText);

}

export default stateGame;