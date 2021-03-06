var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',

        proxy: {
            '/staff': 'http://localhost:9090',
            '/client': 'http://localhost:9090',
            '/appointment': 'http://localhost:9090',
            '/user': 'http://localhost:9090',
            '/invoice': 'http://localhost:9090',
            '/alerts': 'http://localhost:9090',
            '/rota': 'http://localhost:9090'
        }
    }
});
