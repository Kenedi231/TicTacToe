const {CronJob} = require('cron');

const changeOldGamesJob = new CronJob({
    start: false,
    cronTime: "*/1 * * * *",
    onTick: null
});

module.exports = changeOldGamesJob;
module.exports = function () {

};