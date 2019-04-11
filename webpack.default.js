const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rootPath = path.resolve(__dirname, 'app/public/assets');

module.exports = {
    entry: {
        admin: './src/index.js',
        login: './src/pages/login/index.js',
    },
    output: {
        // 必须是绝对路径
        path: path.resolve(rootPath),
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "moment": "moment",
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ManifestPlugin({
            writeToFileEmit: true,
        }),
    ],
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils'),
        },
    },
};
