const Game = require('../models/game');
const replaceAt = require('../utils/replaceAt');
const checkField = require('../utils/checkField');

const doStep = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    let accessToken = req.cookies.accessToken;
    let game = await Game.findOne({ gameToken: gameToken });
    if (game.state === "playing") {
        if ((game.step === "owner" && accessToken === game.firstToken) || (game.step === "opponent" && accessToken === game.secondToken)) {
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
    } else {
        let result = {
            "status": "warning",
            code: 400
        };
        res.json(result);
    }
};

module.exports = doStep;