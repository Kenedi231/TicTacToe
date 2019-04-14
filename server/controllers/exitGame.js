const exitGame = async function (req, res, next) {
    let result = {
        "status": "ok",
        code: 0
    };
    res.cookie("accessToken", "");
    res.cookie("gameToken", "");
    res.json(result);
};

module.exports = exitGame;