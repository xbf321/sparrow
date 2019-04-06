var baseConfig = require('./webpack.default.js'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");

baseConfig.output.filename = '[name]@[chunkhash].js';
baseConfig.output.publicPath = '/public/assets/';
baseConfig.plugins = baseConfig.plugins.concat([
    new MiniCssExtractPlugin({
        filename: '[name]@[hash].css',
    }),
]);

module.exports = baseConfig;