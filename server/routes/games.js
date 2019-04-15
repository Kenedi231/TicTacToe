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

router.post("/new", asyncRoute(newGame));
router.post("/join", asyncRoute(joinGame));
router.post("/do_step", asyncRoute(doStep));
router.post("/exit", exitGame);
router.get("/state", asyncRoute(stateGame));
router.get("/list", listGames);

module.exports = router;