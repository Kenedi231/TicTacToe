import getInitGET from './getInitGET';

function updateGames() {
    let request = new Request('/api/games/list', getInitGET());
    return fetch(request).then(response => response.json())
}

export default updateGames;