import getInitPOST from './getInitPOST';

function joinGame(nick, token) {
    let body = JSON.stringify({
        gameToken: token,
        userName: nick
    });
    return fetch('/api/games/join', getInitPOST(body)).then(response => response.json())
}

export default joinGame;