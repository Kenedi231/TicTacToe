import getInitPOST from './getInitPOST';

function joinGame(nick, token) {
    let body = JSON.stringify({
        gameToken: token,
        userName: nick
    });
    return fetch('/games/join', getInitPOST(body)).then( response => {
        return response.json()
    })
}

export default joinGame;