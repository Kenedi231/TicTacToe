import getInitGET from './getInitGET';

function updateGames() {
    let request = new Request('/games/list', getInitGET());
    return fetch(request).then( response => {
        return response.json()
    })
}

export default updateGames;