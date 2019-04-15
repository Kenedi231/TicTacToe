import getInitPOST from './getInitPOST';

function exitGame() {
    return fetch('/games/exit', getInitPOST()).then( response => {
        return response.json()
    })
}

export default exitGame;