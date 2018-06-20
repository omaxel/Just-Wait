const base = require('./base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');

const developmentConfig = {
    devServer: {
        stats: 'errors-only',
    },
    devtool: 'eval', 
    entry: [
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/dev-server', 
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = merge(base, developmentConfig);