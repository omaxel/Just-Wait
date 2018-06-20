const base = require('./base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');

const productionConfig = {
    devtool: 'source-map', 
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compressor: {
                warnings: false
            }
        })
    ]
};

module.exports = merge(base, productionConfig);