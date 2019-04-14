const Game = require('../models/game');
const replaceAt = require('../middlewares/replaceAt');
const checkField = require('../middlewares/checkField');

const doStep = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    let accessToken = req.cookies.accessToken;
    let game = await Game.findOne({ gameToken: gameToken });
    if (game.state === "playing") {
        if (accessToken === game.first || accessToken === game.second) {
            if ((game.step === "owner" && accessToken === game.first) || (game.step === "opponent" && accessToken === game.second)) {
                let {row, col} = req.body;
                let state = game.state;
                let nextStep = game.step;
                let newField = game.field;
                if (newField[row][col] === '?') {
                    let symbol = game.step === "owner" ? 'x' : 'o';
                    nextStep = symbol === 'x' ? "opponent":"owner";
                    newField[row] = await replaceAt(newField[row], col, symbol);
                    state = await checkField(newField) === true ? "done": game.state;
                }
                let newGame = await Game.updateOne({ gameToken: gameToken}, {
                    step: nextStep,
                    field: newField,
                    state: state,
                });
                let result = {
                    "status": "ok",
                    code: 0
                };
                res.json(result);
            }
        }
    } else {
        next({"status": "warning", "code": "400", "message": "You haven't step!"});
    }
};

module.exports = doStep;