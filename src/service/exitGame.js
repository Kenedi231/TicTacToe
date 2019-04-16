import getInitPOST from './getInitPOST';

function exitGame() {
    return fetch('/api/games/exit', getInitPOST()).then(response => response.json())
}

export default exitGame;