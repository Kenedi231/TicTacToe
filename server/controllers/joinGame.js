const joinGame = async function (req, res, next) {
    let { gameToken, userName } = req.body;
    let result = {
        "status": "ok",
        code: 0,
        "accessToken": "5aec6c5d082f"
    };
    res.json(result);
};

module.exports = joinGame;