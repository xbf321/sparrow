const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.default.js');

baseConfig.output.publicPath = 'http://localhost:7013/app/public/assets/';
baseConfig.output.filename = '[name]@dev.js';
baseConfig.plugins = baseConfig.plugins.concat([
    new ExtractTextPlugin({
        allChunks: false,
        filename: '[name]@dev.css',
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
