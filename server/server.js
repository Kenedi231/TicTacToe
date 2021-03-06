const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const configWebpack = require('../webpack.config.dev');

const gameRouter = require('./routes/games');
const mainRouter = require('./routes/main');
const config = require('../config');

const errorHandler = require('./middlewares/errorHandler');
const { changeOldGamesJob, deletedOldGamesJob } = require('./cron/index');

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(configWebpack);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: configWebpack.output.publicPath
    }));
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

mongoose.connect(config.url, function (err) {
    if (err) throw err;
    console.log("Mongo connected");
});
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../public")));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', gameRouter);
app.use('*', mainRouter);
changeOldGamesJob.start();
deletedOldGamesJob.start();

http.listen(config.port, function () {
    console.log('Tic Tac Toe app listening on port http://localhost:' + config.port + '/\n');
});

app.use(errorHandler);