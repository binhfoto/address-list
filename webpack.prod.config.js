const path = require('path');
const DefinePlugin = require('webpack').DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {

    entry: path.resolve(__dirname, 'src/client/index.js'),

    output: {
        /* put 'bundle.js' to folder 'public' after transpiling, as same value as devServer.contentBase */
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },

    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new HtmlWebpackPlugin({
            /* input html file */
            template: 'public/index.html',
            /* output html file to public/index.html */
            filename: 'index.html'
        })
    ]
};

module.exports = config;