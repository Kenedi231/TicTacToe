const express = require('express');

const newGame = require('../controllers/newGame');
const joinGame = require('../controllers/joinGame');
const doStep = require('../controllers/doStep');
const stateGame = require('../controllers/stateGame');
const listGames = require('../controllers/listGames');
const exitGame = require('../controllers/exitGame');

const router = express.Router();

const asyncRoute = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/games/new", asyncRoute(newGame));
router.post("/games/join", asyncRoute(joinGame));
router.post("/games/do_step", asyncRoute(doStep));
router.post("/games/exit", asyncRoute(exitGame));
router.get("/games/state", asyncRoute(stateGame));
router.get("/games/list", listGames);

module.exports = router;