const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        index: path.join(__dirname, '/src/index.jsx'),
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: '[name].js',
        library: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$]/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};