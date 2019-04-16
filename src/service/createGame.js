import getInitPOST from "./getInitPOST";

function createGame(nickname) {
    let nick = nickname || "Guest";
    let body = JSON.stringify({
        userName: nick,
        size: 3
    });
    return fetch('/api/games/new', getInitPOST(body)).then(response => response.json())
}

export default createGame;