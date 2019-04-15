import getInitPOST from './getInitPOST';

function exitGame() {
    let request = new Request('/games/exit', getInitPOST());
    return fetch(request).then(response => {
        return response.json();
    })
}

export default exitGame;