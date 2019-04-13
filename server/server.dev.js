const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use('/games', gameRouter);

http.listen(config.port, function () {
    console.log('Tic Tac Toe app listening on port http://localhost:' + config.port + '/\n');
});

app.use(errorHandler);