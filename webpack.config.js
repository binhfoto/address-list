var path = require('path');
var config = {
    entry: path.resolve(__dirname, 'src/client/index.js'),
    output: {
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
                loader: "style-loader!css-loader"
            }
        ]
    }
};

module.exports = config;