const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './script.js'
    },
    output: {
        filename:'[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer:{
        port: 1234
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Friend-App',
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif|svg)$/,
                use: ['file-loader']
            }
        ]
    }
}