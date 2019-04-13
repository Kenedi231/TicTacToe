function updateGames() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/games/list', false);
    xhr.send();
    let res = JSON.parse(xhr.responseText);
    return res.games;
}

export default updateGames;