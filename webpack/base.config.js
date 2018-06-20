const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: [
        path.resolve('./src/index.js')
    ],
    output: {
        filename: 'just-wait.min.js',
        path: path.resolve('./dist'),
    },
    module: {
        loaders: [
            {
                loader: ['babel'],
                test: /\.js$/,

                include: [
                    path.resolve("./src"),
                ],

                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    }
};