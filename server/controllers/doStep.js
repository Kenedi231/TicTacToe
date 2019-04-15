const Game = require('../models/game');
const replaceAt = require('../utils/replaceAt');
const checkField = require('../utils/checkField');

const play = "playing";

const owner = "owner";
const opponent = "opponent";

const x = 'x';
const o = 'o';
const mark = '?';

const doStep = async function (req, res, next) {
    let gameToken = req.cookies.gameToken;
    let accessToken = req.cookies.accessToken;
    let game = await Game.findOne({ gameToken: gameToken });
    if (game.state === play) {
        let stepFirstPlayer = game.step === owner && accessToken === game.firstToken;
        let stepSecondPlayer = game.step === opponent && accessToken === game.secondToken;
        if (stepFirstPlayer || stepSecondPlayer) {
            let {row, col} = req.body;
            let state = game.state;
            let nextStep = game.step;
            let newField = game.field;
            let gameResult = game.gameResult;
            if (newField[row][col] === mark) {
                let symbol = game.step === owner ? x : o;
                nextStep = symbol === x ? opponent : owner;
                newField[row] = await replaceAt(newField[row], col, symbol);
                let info = await checkField(newField, game);
                state = info.state;
                gameResult = info.gameResult;
            }
            let newGame = await Game.updateOne({ gameToken: gameToken}, {
                step: nextStep,
                field: newField,
                state: state,
                gameResult: gameResult
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