const stateGame = async function (req, res, next) {
    let gameToken = req.body;
    let result = {
        "status": "ok",
        code: 0,
        "youTurn": true,
        "gameDuration": 2342,
        "field": [
            "X?0",
            "?X0",
            "???"
        ],
        "winner": "Chunk Norris"
    };
    res.json(result);
};

module.exports = stateGame;