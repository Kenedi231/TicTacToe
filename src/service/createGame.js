function createGame(nickname) {
    let nick = nickname || "Guest";
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/games/new', false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    let body = JSON.stringify({
        userName: nick,
        size: 3
    });
    xhr.send(body);
    return JSON.parse(xhr.responseText);
}

export default createGame;