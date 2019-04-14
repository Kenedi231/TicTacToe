
function joinGame(nick, token) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/games/join', false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    let body = JSON.stringify({
        gameToken: token,
        userName: nick
    });
    xhr.send(body);
    return JSON.parse(xhr.responseText);
}

export default joinGame;