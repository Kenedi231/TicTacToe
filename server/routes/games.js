const express = require('express');

const newGame = require('../controllers/newGame');
const joinGame = require('../controllers/joinGame');
const doStep = require('../controllers/doStep');
const stateGame = require('../controllers/stateGame');
const listGames = require('../controllers/listGames');

const router = express.Router();

router.post("/new", newGame);
router.post("/join", joinGame);
router.post("/do_step", doStep);
router.get("/state", stateGame);
router.get("/list", listGames);

module.exports = router;