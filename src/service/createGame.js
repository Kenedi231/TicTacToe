import getInitPOST from "./getInitPOST";

function createGame(nickname) {
    let nick = nickname || "Guest";
    let body = JSON.stringify({
        userName: nick,
        size: 3
    });
    return fetch('/games/new', getInitPOST(body)).then( response => {
        return response.json()
    })
}

export default createGame;