const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rootPath = path.resolve(__dirname, 'app/public/assets');

module.exports = {
    entry: {
        admin: './src/index.js',
    },
    output: {
        // 必须是绝对路径
        path: path.resolve(rootPath),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    }, {
                        loader: 'sass-loader',
                    }],
                }),
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
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
            __CLIENT__: JSON.stringify(true),
            __SERVER__: JSON.stringify(false),
        }),
    ],
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils'),
        },
    },
};
