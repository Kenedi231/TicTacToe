const doStep = async function (req, res, next) {
    let { row, col } = req.body;
    let result = {
        "status": "ok",
        code: 0
    };
    res.json(result);
};

module.exports = doStep;