const newGame = async function (req, res, next) {
    let { userName, size } = req.body;
    let result = {
        "status": "ok",
        "code": 0,
        "accessToken": "768b762c8c28",
        "gameToken": "123abc"
    };
    res.json(result);
};

module.exports = newGame;