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
        filename: 'main.js',
        library: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: "[local]"
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            }
        ]
    },
    watchOptions: {
        aggregateTimeout: 200
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};