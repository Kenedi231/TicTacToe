const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require("path");
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const configWebpack = require('../webpack.config.dev');
const gameRouter = require('./routes/games');
const errorHandler = require('./middlewares/errorHandler');
const config = require('../config');

const compiler = webpack(configWebpack);

app.use(webpackDevMiddleware(compiler, {
    publicPath: configWebpack.output.publicPath
}));

app.use(cookieParser());

mongoose.connect(config.url, function (err) {
    if (err) throw err;
    console.log("Mongo connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/games', gameRouter);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});


http.listen(config.port, function () {
    console.log('Tic Tac Toe app listening on port http://localhost:' + config.port + '/\n');
});

app.use(errorHandler);