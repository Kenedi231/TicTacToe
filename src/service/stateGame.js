import getInitGET from './getInitGET';

function stateGame() {
    let request = new Request('/api/games/state', getInitGET());
    return fetch(request).then(response => response.json())
}

export default stateGame;