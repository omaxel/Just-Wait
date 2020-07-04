const path = require("path");

module.exports = {
    mode: 'production',
    entry: path.resolve('./src/index.js'),
    devtool: 'source-map',
    output: {
        filename: 'just-wait.min.js',
        path: path.resolve('./dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: path.resolve("./src"),
                options: {
                    presets: [['@babel/preset-env']]
                }
            }
        ]
    }
};