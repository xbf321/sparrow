const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require('./webpack.default.js');

baseConfig.output.publicPath = 'http://localhost:7013/app/public/assets/';
baseConfig.output.filename = '[name].js';
baseConfig.plugins = baseConfig.plugins.concat([
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
]);
baseConfig.devServer = {
    host: '0.0.0.0',
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: false,
    disableHostCheck: true,
    hot: true,
};
module.exports = baseConfig;
