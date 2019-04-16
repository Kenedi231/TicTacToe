const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const configWebpack = require('../webpack.config.dev');

const gameRouter = require('./routes/games');
const mainRouter = require('./routes/main');
const errorHandler = require('./middlewares/errorHandler');
const config = require('../config');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', gameRouter);
app.use('*', mainRouter);

http.listen(config.port, function () {
    console.log('Tic Tac Toe app listening on port http://localhost:' + config.port + '/\n');
});

app.use(errorHandler);