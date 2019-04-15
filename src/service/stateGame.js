import getInitGET from './getInitGET';

function stateGame() {
    let request = new Request('/games/state', getInitGET());
    return fetch(request).then(response => {
        return response.json();
    })
}

export default stateGame;