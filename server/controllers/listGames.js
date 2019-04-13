const listGames = async function (req, res, next) {
    let result = {
        "status": "ok",
        "code": 0,
        games: [
            {
                "gameToken": "123abc",
                "owner": "Chunk Norris",
                "opponent": "",
                "size": 3,
                "gameDuration": 12323,
                "gameResult": "",
                "state": "ready"
            }
        ]
    };
    res.json(result);
};

module.exports = listGames;