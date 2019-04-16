const {CronJob} = require('cron');
const deletedGame = require('../utils/deleteList');
const deleteOldGame = require('../utils/deleteOldGame');

const changeOldGamesJob = new CronJob({
    start: false,
    cronTime: "*/1 * * * *",
    onTick: deletedGame
});

const deletedOldGamesJob = new CronJob({
    start: false,
    cronTime: '0 0 0 * * *',
    onTick: deleteOldGame
});

module.exports = { changeOldGamesJob, deletedOldGamesJob };