const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require("path");
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const configWebpack = require('./webpack.config.dev');

const compiler = webpack(configWebpack);

const port = 3000;

app.use(webpackDevMiddleware(compiler, {
    publicPath: configWebpack.output.publicPath
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

http.listen(port, function () {
    console.log('Tic Tac Toe app listening on port http://localhost:' + port + '/\n');
});