const path = require('path');
const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {

    entry: path.resolve(__dirname, 'src/client/index.js'),

    output: {
        /* put bundled js file to folder 'public' after transpiling, as same value as devServer.contentBase */
        path: path.resolve(__dirname, 'public'),
        /*
            main.js: bundle file for project source code
            vendor.js: bundle file for 3rd-lib/vendor source code
        */
        filename: "[name].[chunkhash].js"
        /*
        * main.50ff413ea6b74090d929.js
        * vendor.6d5d83247c075d13e153.js
        * */
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            /* input html file */
            template: 'src/client/template/index.html',
            /* output html file to public/index.html */
            filename: 'index.html'
        })
    ]
};

module.exports = config;