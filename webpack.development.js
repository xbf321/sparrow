const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require('./webpack.default.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const port = process.env.FEPORT;
baseConfig.mode = 'development';
baseConfig.output.publicPath = `http://localhost:${port}/app/public/assets/`;
baseConfig.output.filename = '[name].js';
baseConfig.plugins = baseConfig.plugins.concat([
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
]);
baseConfig.devServer = {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: false,
    disableHostCheck: true,
    hot: true,
    port,
};
module.exports = baseConfig;
